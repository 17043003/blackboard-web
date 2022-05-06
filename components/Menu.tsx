import Image from "next/image";

export type FigureKind = "circle" | "square" | "line" | "curve";

type MenuProps = {
  setSelect: (value: FigureKind) => void;
};

type ButtonClickHandler = {
  (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, kind: FigureKind): void;
};

const Menu = ({ setSelect }: MenuProps): JSX.Element => {
  const handleMenuClick: ButtonClickHandler = (e, kind) => {
    setSelect(kind);
  };
  const items: FigureKind[] = ["circle", "square", "line", "curve"];
  const itemElements = items.map((item, index) => {
    return (
      <button
        key={index}
        className={"outline max-h-9 mx-1 hover:bg-yellow-100"}
        onClick={(e) => handleMenuClick(e, item)}
      >
        <Image src={`/${item}.svg`} width={36} height={36} />
      </button>
    );
  });

  return <div className={"ml-2"}>{itemElements}</div>;
};

export default Menu;
