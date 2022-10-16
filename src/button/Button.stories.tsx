import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "./index";

export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: "primary",
  children: "Button",
};

const style = {
  marginLeft: 8,
};

export const Basic = () => {
  return (
    <>
      <Button type="primary">Primary Button</Button>
      <Button style={style}>Default Button</Button>
      <Button type="dashed" style={style}>
        Dashed Button
      </Button>
      <br />
      <Button type="text">Text Button</Button>
      <Button type="link" style={style}>
        Link Button
      </Button>
    </>
  );
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Button",
};

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
