import Image from "next/image";
import { FigureParamsProps } from "../pages/room/[id]";
import { useState } from "react";

export type FigureKind = "circle" | "square" | "line" | "curve";

type MenuProps = {
  setSelect: (value: FigureKind) => void;
  figureProps: FigureParamsProps;
};

type ButtonClickHandler = {
  (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, kind: FigureKind): void;
};

const Menu = ({ setSelect, figureProps }: MenuProps): JSX.Element => {
  const [selectedKind, setSelectedKind] = useState<FigureKind>("circle");
  const handleMenuClick: ButtonClickHandler = (e, kind) => {
    setSelect(kind);
    setSelectedKind(kind);
  };
  const items: FigureKind[] = ["circle", "square", "line", "curve"];
  const itemElements = items.map((item, index) => {
    return (
      <button
        key={index}
        className={`outline max-h-9 mx-1 hover:bg-yellow-100 ${
          selectedKind == item ? "bg-red-500 hover:bg-red-600" : ""
        }`}
        onClick={(e) => handleMenuClick(e, item)}
      >
        <Image src={`/${item}.svg`} width={36} height={36} />
      </button>
    );
  });

  const handleFillChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    figureProps.setParams({ ...figureProps.params, fill: e.target.checked });
  };

  const handleLineWidthChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    figureProps.setParams({
      ...figureProps.params,
      lineWidth: e.target.valueAsNumber,
    });
  };

  const handleLineDashChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    figureProps.setParams({
      ...figureProps.params,
      lineDash: e.target.checked,
    });
  };

  const handleColorChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    figureProps.setParams({ ...figureProps.params, color: e.target.value });
  };

  const handleRotateChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    figureProps.setParams({
      ...figureProps.params,
      rotate: e.target.valueAsNumber,
    });
  };

  const menuItems = () => {
    return (
      <div className="grid grid-flow-row">
        <div>
          <label htmlFor="menu_fill" className="mr-1">
            塗りつぶし
          </label>
          <input
            id="menu_fill"
            type="checkbox"
            checked={figureProps.params.fill}
            onChange={handleFillChange}
          />
        </div>
        <div>
          <label htmlFor="menu_linewidth" className="mr-1">
            幅
          </label>
          <input
            id="menu_linewidth"
            type="number"
            value={figureProps.params.lineWidth}
            onChange={handleLineWidthChange}
          />
        </div>
        <div>
          <label htmlFor="menu_linedash" className="mr-1">
            波線
          </label>
          <input
            id="menu_linedash"
            type="checkbox"
            checked={figureProps.params.lineDash}
            onChange={handleLineDashChange}
          />
        </div>
        <div>
          <label htmlFor="menu_color" className="mr-1">
            色
          </label>
          <input
            id="menu_color"
            type="color"
            value={figureProps.params.color}
            onChange={handleColorChange}
          />
        </div>
        <div>
          <label htmlFor="menu_rotate" className="mr-1">
            回転
          </label>
          <input
            id="menu_rotate"
            type="number"
            value={figureProps.params.rotate}
            onChange={handleRotateChange}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={"ml-2"}>{itemElements}</div>
      <div className="ml-2 mt-2">{menuItems()}</div>
    </>
  );
};

export default Menu;
