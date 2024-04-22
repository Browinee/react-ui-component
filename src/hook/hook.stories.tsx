import React, { useRef } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import useSize from "./useSize";
import useHover from "./useHover";

const Noop = () => {};
export default {
  title: "Example/Hooks",
  component: Noop,
} as ComponentMeta<typeof Noop>;

export const Size = () => {
  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);

  return (
    <div ref={ref}>
      <p>Change window size</p>
      <p>width: {size?.width}</p>
      <p>height: {size?.height}</p>
    </div>
  );
};

export const Hover = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isHovering = useHover(ref);

  return <div ref={ref}>{isHovering ? "hover" : "leaveHover"}</div>;
};
