import React from "react";
import { render, screen } from "@testing-library/react";
import Button from ".";

test("simple button", () => {
  render(<Button>click me</Button>);
  const linkElement = screen.getByText(/click me/i);
  expect(linkElement).toBeInTheDocument();
});
