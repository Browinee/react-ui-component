import classNames from "classnames";
import React, { ReactNode } from "react";

interface ButtonProps {
  className?: string;
  children?: ReactNode;
  type?: "normal" | "primary" | "dashed" | "link" | "text";
  style?: React.CSSProperties;
}
export default function Button({
  children,
  className,
  type = "normal",
  style,
}: ButtonProps) {
  const cls = classNames({
    [className as string]: !!className,
    "ant-btn": true,
    [`ant-button-${type}`]: type,
  });
  return (
    <button style={style} className={cls}>
      {children}
    </button>
  );
}
