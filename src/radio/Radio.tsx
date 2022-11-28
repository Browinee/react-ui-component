import React, { ReactNode, CSSProperties, useRef, useState } from "react";
import classNames from "classnames";

import "./index.scss";

export interface radioProps extends React.HTMLAttributes<HTMLInputElement> {
  value?: string;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
}

const Radio = (props: radioProps) => {
  const { className, disabled, onChange, children, style, value, ...others } =
    props;
  const inputEl = useRef(null);
  const [checked, setChecked] = useState(false);
  React.useEffect(() => {
    if (props.checked !== undefined) {
      setChecked(props.checked);
    }
  }, [props.checked]);

  const cls = classNames({
    "ant-radio": true,
    "ant-radio-checked": checked,
    "ant-radio-disabled": disabled,
  });

  const wrapperCls = classNames({
    "ant-radio-wrapper": true,
    "ant-radio-wrapper-disabled": disabled,
  });

  const handleClick = (e: any) => {
    if (disabled) {
      return;
    }

    setChecked(!checked);

    if (typeof onChange === "function") {
      e.target = inputEl.current;
      onChange(e);
    }
  };
  return (
    <span className={wrapperCls} onClick={handleClick}>
      <span className={cls}>
        <input
          type="radio"
          className="ant-radio-input"
          value={value}
          ref={inputEl}
        />
        <span className="ant-radio-inner"></span>
      </span>
      <span>{props.children}</span>
    </span>
  );
};

export default Radio;
