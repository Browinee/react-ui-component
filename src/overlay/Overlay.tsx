import React, { ReactNode, CSSProperties, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.scss";

export interface overlayProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  hasMask?: boolean;
  visible?: boolean;
  onVisibleChange?: Function;
}

const Overlay = (props: overlayProps) => {
  const {
    className,
    children,
    hasMask,
    style,
    visible: propVisible,
    onVisibleChange,
    ...others
  } = props;
  const [visible, setVisible] = useState(propVisible || false);
  const content = ReactDOM.createPortal(children, document.body);

  useEffect(() => {
    if (propVisible !== undefined) {
      setVisible(propVisible);
    }
  }, [propVisible]);
  const handleMouseDown = () => {
    onVisibleChange?.(false);
  };
  useEffect(() => {
    if (visible) {
      window.addEventListener("mousedown", handleMouseDown);
    }
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [visible]);

  if (!visible) {
    return null;
  }
  return (
    <div>
      {hasMask ? <div /> : null}
      {content}
    </div>
  );
};

export default Overlay;
