import React, { useRef } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Popover from "./Popover";

export default {
  title: "Example/Popover",
  component: Popover,
} as ComponentMeta<typeof Popover>;

export const Basic = () => {
  const popoverContent = (
    <div>
      Content
      <button
        onClick={() => {
          alert(1);
        }}
      >
        Button
      </button>
    </div>
  );
  return (
    <Popover
      content={popoverContent}
      placement="bottom"
      trigger="click"
      style={{ margin: "200px" }}
    >
      <button>Click me</button>
    </Popover>
  );
};
