import Figure from "./Figure";

class Line implements Figure {
  kind = "line";
  x1 = 0;
  y1 = 0;
  x2 = 0;
  y2 = 0;
  width: number = 1;
  height: number = 1;
  lineWidth = 1;
  lineDash = false;
  color = "#000000";
  rotate = 0;
  fill = false;

  Draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
  }
}

export default Line;
