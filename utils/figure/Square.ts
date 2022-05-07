import Figure from "./Figure";

class Square implements Figure {
  kind = "square";
  x1 = 0;
  y1 = 0;
  x2 = 0;
  y2 = 0;
  lineWidth = 1;
  lineDash = false;
  color = "#000000";
  rotate = 0;
  fill = false;

  Draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.lineJoin = "miter";
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.color;
    ctx.strokeRect(this.x1, this.y1, this.x2 - this.x1, this.y2 - this.y1);
    ctx.stroke();
  }
}

export default Square;
