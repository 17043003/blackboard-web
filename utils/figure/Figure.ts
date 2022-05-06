interface Figure {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  fill: boolean;
  lineWidth: number;
  lineDash: boolean;
  color: string;
  rotate: number;

  Draw(context: CanvasRenderingContext2D): void;
}

export default Figure;
