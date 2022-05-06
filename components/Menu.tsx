import Image from "next/image";

const Menu = (): JSX.Element => {
  const images = ["/circle.svg", "/square.svg", "/line.svg", "/curve.svg"];
  const imageElements = images.map((path, index) => {
    return (
      <button
        key={index}
        className={"outline max-h-9 mx-1 hover:bg-yellow-100"}
      >
        <Image src={path} width={36} height={36} />
      </button>
    );
  });

  return <div className={"ml-2"}>{imageElements}</div>;
};

export default Menu;
