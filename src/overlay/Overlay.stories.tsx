import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Overlay from "./index";

export default {
  title: "Example/Overlay",
  component: Overlay,
} as ComponentMeta<typeof Overlay>;

const Template: ComponentStory<typeof Overlay> = (args) => (
  <Overlay {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: (
    <div style={{ border: "1px solid", width: "300px", height: "300px" }}>
      Content
    </div>
  ),
};

export const Basic = () => {
  return (
    <>
      <Overlay visible onVisibleChange={console.log}>
        <div style={{ border: "1px solid", width: "300px", height: "300px" }}>
          Basic Overlay
        </div>
      </Overlay>
    </>
  );
};

export const Controlled = () => {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <Overlay visible={visible} onVisibleChange={(v) => setVisible(v)}>
        <div style={{ border: "1px solid", width: "300px", height: "300px" }}>
          Controlled Overlay
        </div>
      </Overlay>
    </>
  );
};
