import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Affix from "./index";
import Button from "../button";
export default {
  title: "Example/Affix",
  component: Affix,
} as ComponentMeta<typeof Affix>;

const Template: ComponentStory<typeof Affix> = (args) => <Affix {...args} />;

export const Basic = () => {
  return (
    <>
      <Affix offsetTop={10}>
        <Button type="primary">Affix go</Button>
      </Affix>
      <Button type="primary">Other button</Button>
    </>
  );
};
