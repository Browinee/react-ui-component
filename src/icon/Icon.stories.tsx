import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Icon } from ".";
import { IconAdd } from "./icons/IconAdd";
import { IconEmail } from "./icons/IconEmail";

export default {
  title: "Example/Icon",
  component: Icon,
} as ComponentMeta<typeof Icon>;

export const IconList = () => {
  return (
    <div style={{ padding: "50px" }}>
      <IconAdd size="40px"></IconAdd>
      <IconEmail size="40px" spin></IconEmail>
      <IconEmail style={{ color: "blue", fontSize: "50px" }}></IconEmail>
    </div>
  );
};
