import Figure from "../figure/Figure";
import Circle from "../figure/Circle";
import Line from "../figure/Line";
import { FigureKind } from "../../components/Menu";
import Square from "./Square";

export const figureFactory = (kind: FigureKind): Figure => {
  switch (kind) {
    case "circle":
      return new Circle();
    case "line":
      return new Line();
    case "square":
      return new Square();
    default:
      return new Line();
  }
};
