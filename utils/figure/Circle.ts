import Figure from "./Figure";

class Circle implements Figure {
  kind = "circle";
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
    ctx.lineWidth = this.lineWidth;
    if (this.lineDash) {
      ctx.setLineDash([5, 15]);
    } else {
      ctx.setLineDash([]);
    }
    ctx.strokeStyle = this.color;
    ctx.ellipse(
      this.x1 + (this.x2 - this.x1) / 2,
      this.y1 + (this.y2 - this.y1) / 2,
      Math.abs((this.x2 - this.x1) / 2),
      Math.abs((this.y2 - this.y1) / 2),
      0,
      0,
      2 * Math.PI
    );
    if (this.fill) {
      ctx.fillStyle = this.color;
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }
}

export default Circle;
