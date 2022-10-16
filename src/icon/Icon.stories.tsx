import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Icon from "./index";

export default {
  title: "Example/Icon",
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: "fixed",
};
export const Copy = () => {
  return <Icon type="copy" />;
};
