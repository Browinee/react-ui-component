import React from "react";

export type DirectionType = "ltr" | "rtl" | undefined;

export type SizeType = "small" | "middle" | "large" | undefined;

export interface ConfigConsumerProps {
  getPrefixCls: (suffixCls?: string) => string;
  direction?: DirectionType;
  space?: {
    size?: SizeType | number;
  };
}

export const defaultGetPrefixCls = (suffixCls?: string) => {
  return suffixCls ? `ant-${suffixCls}` : "ant";
};

export const ConfigContext = React.createContext<ConfigConsumerProps>({
  getPrefixCls: defaultGetPrefixCls,
});

export const SpaceContext = React.createContext({
  latestIndex: 0,
  horizontalSize: 0,
  verticalSize: 0,
  supportFlexGap: false,
});
