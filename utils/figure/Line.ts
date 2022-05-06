import Figure from "./Figure";

class Line implements Figure {
  x = 0;
  y = 0;
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
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.width, this.y + this.height);
      ctx.stroke();
  }
}

export default Line;
