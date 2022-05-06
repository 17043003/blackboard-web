import Figure from "../figure/Figure";
import Circle from "../figure/Circle";
import Line from "../figure/Line";
import { FigureKind } from "../../components/Menu";

export const figureFactory = (kind: FigureKind): Figure => {
  switch (kind) {
    case "circle":
      return new Circle();
    case "line":
      return new Line();
    default:
      return new Line();
  }
};
