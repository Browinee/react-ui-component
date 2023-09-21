import React, { useEffect, useRef, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import App from ".";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default {
  title: "Example/react-dnd",
  component: App,
} as ComponentMeta<any>;

const Template: ComponentStory<any> = (args) => (
  <DndProvider backend={HTML5Backend}>
    <App {...args}></App>
  </DndProvider>
);

export const Reorder = Template.bind({});
Reorder.args = {};
