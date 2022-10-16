import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from ".";
describe("Button", () => {
  test("renders normal Button", () => {
    const { container } = render(<Button>click me</Button>);

    expect(container.querySelector(".ant-btn-normal")).toBeInTheDocument();
  });

  test("renders primary Button", () => {
    const { container } = render(<Button type="primary">click me</Button>);

    expect(container.querySelector(".ant-btn-primary")).toBeInTheDocument();
  });

  test("renders small Button", () => {
    const { container } = render(<Button size="small">click me</Button>);

    expect(container.querySelector(".ant-btn-small")).toBeInTheDocument();
  });
  test("should support click", () => {
    const onClick = jest.fn();
    render(
      <Button type="primary" onClick={onClick}>
        click me
      </Button>
    );

    const button = screen.getByRole(/button/i);
    fireEvent.click(button);

    expect(onClick).toBeCalled();
  });
  test("should support blur", () => {
    const onBlur = jest.fn();
    render(
      <Button type="primary" onBlur={onBlur}>
        click me
      </Button>
    );

    const button = screen.getByText(/click me/i);
    fireEvent.click(button);
    fireEvent.blur(button);

    expect(onBlur).toBeCalled();
  });
});
