import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "./space.stories.scss";
import Space from "./index";

export default {
  title: "Example/Space",
  component: Space,
} as ComponentMeta<typeof Space>;

const Template: ComponentStory<typeof Space> = (args) => <Space {...args} />;

// export const Primary = Template.bind({});
// // Primary.args = {
// //   children: "Space",
// // };

export const Horizontal = () => {
  return (
    <>
      <Space
        direction="horizontal"
        align="start"
        style={{ height: "200px" }}
        split={<div className="box" style={{ background: "grey" }}></div>}
        wrap={true}
      >
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </Space>
    </>
  );
};

export const Vertical = () => {
  return (
    <Space
      direction="vertical"
      align="start"
      style={{ height: "500px" }}
      split={<div className="box" style={{ background: "red" }}></div>}
      wrap={true}
    >
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
    </Space>
  );
};
