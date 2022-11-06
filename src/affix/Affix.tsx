import classNames from "classnames";
import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import "./index.scss";

export interface affixProps extends React.HTMLAttributes<HTMLDivElement> {
  offsetTop?: number;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

const Affix = (props: affixProps) => {
  const { className, children, style, offsetTop = 0, ...others } = props;
  const [wraperStyle, setWrapperStyle] = useState({});
  const [affixed, setAffixed] = useState(false);

  const wraperRef = useRef<HTMLDivElement | null>(null);
  const fixedRef = useRef<HTMLDivElement | null>(null);

  function updatePosition() {
    const { top, width, height } = wraperRef.current!.getBoundingClientRect();
    if (top <= offsetTop && !affixed) {
      setWrapperStyle({
        height,
        width,
      });
      setAffixed(true);
    } else if (top > offsetTop) {
      setAffixed(false);
      fixedRef.current!.setAttribute("style", "");
    }
  }

  useEffect(() => {
    const wraperNode = wraperRef.current;
    if (!wraperNode) {
      return;
    }

    window.addEventListener("scroll", updatePosition, false);
    return () => {
      window.removeEventListener("scroll", updatePosition, false);
    };
  }, []);

  const cls = classNames({
    "ant-affix": affixed,
    [className as string]: !!className,
  });
  return (
    <div ref={wraperRef}>
      {affixed ? <div style={wraperStyle!} /> : null}
      <div
        style={
          affixed
            ? {
                top: offsetTop,
                ...wraperStyle,
              }
            : undefined
        }
        ref={fixedRef}
        className={cls}
      >
        {children}
      </div>
    </div>
  );
};

export default Affix;
