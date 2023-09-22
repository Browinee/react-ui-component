import { ComponentMeta, ComponentStory } from "@storybook/react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import App from ".";

export default {
  title: "Example/react-dnd",
  component: App,
} as ComponentMeta<any>;

const Template: ComponentStory<any> = (args) => (
  <DndProvider backend={HTML5Backend}>
    <App {...args}></App>
  </DndProvider>
);

export const Editor = Template.bind({});
Editor.args = {};
