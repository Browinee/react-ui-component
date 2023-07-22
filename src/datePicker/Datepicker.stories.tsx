import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Datepicker from "./index";

export default {
  title: "Example/Datepicker",
  component: Datepicker,
} as ComponentMeta<typeof Datepicker>;

const Template: ComponentStory<typeof Datepicker> = (args) => <Datepicker />;

export const Primary = Template.bind({});
// Primary.args = {
//   children: (
//     <div style={{ border: "1px solid", width: "300px", height: "300px" }}>
//       Content
//     </div>
//   ),
// };
