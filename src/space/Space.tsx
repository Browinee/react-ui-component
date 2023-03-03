import classNames from "classnames";
import * as React from "react";
import { ConfigContext, SizeType, SpaceContext } from "./config-provider";
import Item from "./Item";
import toArray from "./toArray";
import "./index.scss";
import useFlexGapSupport from "./hook/useFlexGapSupport";

export interface Option {
  keepEmpty?: boolean;
}

export type SpaceSize = SizeType | number;

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  size?: SpaceSize | [SpaceSize, SpaceSize];
  direction?: "horizontal" | "vertical";
  align?: "start" | "end" | "center" | "baseline";
  split?: React.ReactNode;
  wrap?: boolean;
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};

function getNumberSize(size: SpaceSize) {
  return typeof size === "string" ? spaceSize[size] : size || 0;
}

const Space: React.FC<SpaceProps> = (props) => {
  const {
    getPrefixCls,
    space,
    direction: directionConfig,
  } = React.useContext(ConfigContext);

  const {
    size = space?.size || "small",
    align,
    className,
    children,
    direction = "horizontal",
    split,
    style,
    wrap = false,
    ...otherProps
  } = props;

  const [horizontalSize, verticalSize] = React.useMemo(
    () =>
      (
        (Array.isArray(size) ? size : [size, size]) as [SpaceSize, SpaceSize]
      ).map((item) => getNumberSize(item)),
    [size]
  );
  const childNodes = toArray(children, { keepEmpty: true });

  const mergedAlign =
    align === undefined && direction === "horizontal" ? "center" : align;

  // NOTE: handle class
  const prefixCls = getPrefixCls("space");
  const cn = classNames(
    prefixCls,
    `${prefixCls}-${direction}`,
    {
      [`${prefixCls}-rtl`]: directionConfig === "rtl",
      [`${prefixCls}-align-${mergedAlign}`]: mergedAlign,
    },
    className
  );

  const itemClassName = `${prefixCls}-item`;

  const marginDirection =
    directionConfig === "rtl" ? "marginLeft" : "marginRight";

  // Calculate latest one
  let latestIndex = 0;
  const nodes = childNodes.map((child: any, i) => {
    if (child !== null && child !== undefined) {
      latestIndex = i;
    }

    const key = (child && child.key) || `${itemClassName}-${i}`;

    return (
      <Item
        className={itemClassName}
        key={key}
        direction={direction}
        index={i}
        marginDirection={marginDirection}
        split={split}
        wrap={wrap}
      >
        {child}
      </Item>
    );
  });

  const supportFlexGap = useFlexGapSupport();
  const spaceContext = React.useMemo(
    () => ({ horizontalSize, verticalSize, latestIndex, supportFlexGap }),
    [horizontalSize, verticalSize, latestIndex, supportFlexGap]
  );
  // NOTE: check if browser supports row-gap and column-gap,
  // if not, use margin bottom instead
  const gapStyle = React.useMemo(() => {
    const style: React.CSSProperties = {};
    if (wrap) {
      style.flexWrap = "wrap";

      if (!supportFlexGap) {
        style.marginBottom = -verticalSize;
      }
    }

    if (supportFlexGap) {
      style.columnGap = horizontalSize;
      style.rowGap = verticalSize;
    }
    return style;
  }, [supportFlexGap, verticalSize, horizontalSize, wrap]);

  if (childNodes.length === 0) {
    return null;
  }

  return (
    <div
      className={cn}
      style={{
        ...gapStyle,
        ...style,
      }}
      {...otherProps}
    >
      <SpaceContext.Provider value={spaceContext}>
        {nodes}
      </SpaceContext.Provider>
    </div>
  );
};

export default Space;
