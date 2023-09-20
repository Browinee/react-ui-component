import React, { useEffect, useRef, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import App from "./index";
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

export const Basic = Template.bind({});
// LastMonth.args = {
//   value: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
//   onChange: (date: Date) => console.log(date.toLocaleDateString()),
// };

// export const Basic = () => {

//   return (
//     <div>
//       {/* <Calendar value={new Date('2023-3-1')} onChange={(date: Date) => {
//         alert(date.toLocaleDateString());
//     }}></Calendar> */}
//       <Datepicker
//         ref={datepickerRef}
//         value={new Date("2024-8-15")}
//       ></Datepicker>
//     </div>
//   );
// };
