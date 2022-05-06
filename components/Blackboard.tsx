import React, { useState, useEffect, useRef } from "react";
import { FigureKind } from "../components/Menu";
import Figure from "../utils/figure/Figure";
import Line from "../utils/figure/Line";
import { figureFactory } from "../utils/figure/FigureFactory"

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
};

const Blackboard = ({ figureKind }: BlackboardProps): JSX.Element => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  const [size, setSize] = useState(100);
  const [coordinate, setCoordinate] = useState<MouseOperateCoordinate>({
    start: { x: -1, y: -1 },
    end: { x: -1, y: -1 },
  });

  useEffect(() => {
    if (canvas.current == null) return;
    console.log("get context.");
    setContext(canvas.current.getContext("2d"));
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
  };

  const handleMouseUp: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    const { clientX, clientY } = getCoordinateOnCanvas(e.clientX, e.clientY);
    setCoordinate({ ...coordinate, end: { x: clientX, y: clientY } });

    const sizes = calculateSize({
      ...coordinate,
      end: { x: clientX, y: clientY },
    });
    
    const figure = figureFactory(figureKind);
    figure.x1 = coordinate.start.x;
    figure.y1 = coordinate.start.y;
    figure.x2 = clientX;
    figure.y2 = clientY;
    if (context) {
      figure.Draw(context);
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
    <div className="h-full m-1">
      <canvas
        width="400"
        height="400"
        ref={canvas}
        className="outline"
        onTouchStart={handleTouchStart}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      ></canvas>
      {figureKind}
    </div>
  );
};

export default Blackboard;
