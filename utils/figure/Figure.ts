interface Figure {
  width: number;
  height: number;
  x: number;
  y: number;
  fill: boolean;
  lineWidth: number;
  lineDash: boolean;
  color: string;
  rotate: number;

  Draw(context: CanvasRenderingContext2D): void;
}

export default Figure;
