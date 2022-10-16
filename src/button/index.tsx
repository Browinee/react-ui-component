import classNames from "classnames";
import React, { ReactNode } from "react";
import "./index.scss";
interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  size?: "small" | "medium" | "large";
  type?: "normal" | "primary" | "dashed" | "link" | "text";
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
}
export default function Button({
  children,
  className,
  type = "normal",
  style,
  onClick,
  onBlur,
  size = "medium",
  ...rest
}: ButtonProps) {
  const cls = classNames({
    [className as string]: !!className,
    "ant-btn": true,
    [`ant-btn-${type}`]: type,
    [`ant-btn-${size}`]: size,
  });
  return (
    <button
      {...rest}
      style={style}
      className={cls}
      onClick={onClick}
      onBlur={onBlur}
    >
      {children}
    </button>
  );
}
