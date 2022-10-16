import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Tag from "./index";

describe("Tag", () => {
  test("renders Tag", () => {
    render(<Tag>click me</Tag>);
    const linkElement = screen.getByText(/click me/i);
    expect(linkElement).toBeInTheDocument();
  });
});
