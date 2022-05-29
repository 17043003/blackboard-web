import React, { useState, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { FigureKind } from "../components/Menu";
import { figureFactory } from "../utils/figure/FigureFactory";
import Figure from "../utils/figure/Figure";
import { FigureParamsProps } from "../pages/room/[id]";

type Coordinate = {
  x: number;
  y: number;
};

type Size = Coordinate;

type MouseOperateCoordinate = {
  start: Coordinate;
  end: Coordinate;
};

type BlackboardProps = {
  figureKind: FigureKind;
  socketUrl: string;
  figureProps: FigureParamsProps;
};

const Blackboard = ({
  figureKind,
  socketUrl,
  figureProps,
}: BlackboardProps): JSX.Element => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [surfaceContext, setSurfaceContext] =
    useState<CanvasRenderingContext2D | null>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const surfaceCanvas = useRef<HTMLCanvasElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [size, setSize] = useState(100);
  const [coordinate, setCoordinate] = useState<MouseOperateCoordinate>({
    start: { x: -1, y: -1 },
    end: { x: -1, y: -1 },
  });

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(socketUrl, {
    share: true,
    onMessage: (ev) => {
      try {
        const jsonObject = JSON.parse(ev.data);
        if (jsonObject?.figure != null) {
          const initFigure = figureFactory(
            jsonObject.figure.kind as FigureKind
          );
          if (initFigure == null) return;
          const figure: Figure = Object.assign(initFigure, jsonObject.figure);
          if (context) {
            figure.Draw(context);
          }
        }
      } catch (e) {
        console.log(`${e}`);
      }
    },
  });

  useEffect(() => {
    if (canvas.current == null || surfaceCanvas.current == null) return;
    console.log("get context.");
    setContext(canvas.current.getContext("2d"));
    setSurfaceContext(surfaceCanvas.current.getContext("2d"));
  }, []);

  const handleTouchStart: React.TouchEventHandler<HTMLCanvasElement> = (e) => {
    const { clientX, clientY } = getCoordinateOnCanvas(
      e.changedTouches[0].clientX,
      e.changedTouches[0].clientY
    );

    context?.fillRect(clientX, clientY, size, size);
  };

  const handleMouseDown: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    const { clientX, clientY } = getCoordinateOnCanvas(e.clientX, e.clientY);
    setCoordinate({ ...coordinate, start: { x: clientX, y: clientY } });
    setIsDragging(true);
  };

  const handleMouseUp: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    setIsDragging(false);
    const { clientX, clientY } = getCoordinateOnCanvas(e.clientX, e.clientY);
    setCoordinate({ ...coordinate, end: { x: clientX, y: clientY } });

    const figure = figureFactory(figureKind);
    if (figure == null) return;

    // set menu params.
    // figure.color = figureProps.params.color;
    Object.assign(figure, figureProps.params)

    figure.x1 = coordinate.start.x;
    figure.y1 = coordinate.start.y;
    figure.x2 = clientX;
    figure.y2 = clientY;
    if (context) {
      figure.Draw(context);
      //   sendJsonMessage(figure);
      sendMessage(`{"figure":${JSON.stringify(figure)}}`);
    }
  };

  // Draw temporary figure on surface canvas while dragging.
  const handleMouseMove: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    if (!isDragging) return;
    surfaceContext?.clearRect(0, 0, 400, 400);

    const { clientX, clientY } = getCoordinateOnCanvas(e.clientX, e.clientY);
    const figure = figureFactory(figureKind);
    if (figure == null) return;

    // set menu params.
    // figure.color = figureProps.params.color;
    Object.assign(figure, figureProps.params)

    figure.x1 = coordinate.start.x;
    figure.y1 = coordinate.start.y;
    figure.x2 = clientX;
    figure.y2 = clientY;
    if (surfaceContext) {
      figure.Draw(surfaceContext);
    }
  };

  // Convert click coordinate on canvas.
  const getCoordinateOnCanvas: (
    x: number,
    y: number
  ) => { clientX: number; clientY: number } = (x, y) => {
    const canvasRect = canvas.current?.getClientRects();
    if (canvasRect == null) return { clientX: -1, clientY: -1 };

    const clientX = x - canvasRect[0]?.left;
    const clientY = y - canvasRect[0]?.top;
    return { clientX, clientY };
  };

  const calculateSize: (coordinates: MouseOperateCoordinate) => Size = (
    coordinates
  ) => {
    const x = coordinates.end.x - coordinates.start.x;
    const y = coordinates.end.y - coordinates.start.y;
    return { x, y };
  };

  return (
    <div className="h-full m-1 relative">
      <canvas
        width="400"
        height="400"
        ref={canvas}
        className="outline absolute"
      ></canvas>
      <canvas
        width="400"
        height="400"
        ref={surfaceCanvas}
        className="outline absolute opacity-10"
        onTouchStart={handleTouchStart}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
    </div>
  );
};

export default Blackboard;
