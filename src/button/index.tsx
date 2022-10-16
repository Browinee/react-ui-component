import classNames from "classnames";
import React, { ReactNode } from "react";

interface ButtonProps {
  className?: string;
  children?: ReactNode;
  type?: "normal" | "primary";
}
export default function Button({
  children,
  className,
  type = "normal",
}: ButtonProps) {
  const cls = classNames({
    [className || ""]: className,
    "ant-btn": true,
    [`ant-button-${type}`]: type,
  });
  return <button className={cls}>{children}</button>;
}
