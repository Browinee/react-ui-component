import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "./";

export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: any) => (
  <Button {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  type: "primary",
  children: "Button",
};

export const Normal = Template.bind({});
Normal.args = {
  type: "normal",
  children: "Button",
};
