import { render, screen } from "@testing-library/react";
import Room from "../../pages/room/[id]";
import "@testing-library/jest-dom";

describe("Room", () => {
  it("renders a heading", () => {
    render(<Room />);

    const heading = screen.getByRole("heading", {
      name: /Room/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
