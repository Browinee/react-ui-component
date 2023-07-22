import React, { useEffect, useRef, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Datepicker, { DatepickerRef } from "./index";

export default {
  title: "Example/Datepicker",
  component: Datepicker,
} as ComponentMeta<typeof Datepicker>;

const Template: ComponentStory<typeof Datepicker> = (args) => (
  <Datepicker {...args} />
);

export const LastMonth = Template.bind({});
LastMonth.args = {
  value: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
  onChange: (date: Date) => console.log(date.toLocaleDateString()),
};

export const Basic = () => {
  const datepickerRef = useRef<DatepickerRef>(null);

  useEffect(() => {
    console.log(datepickerRef.current?.getDate().toLocaleDateString());

    setTimeout(() => {
      datepickerRef.current?.setDate(new Date(2024, 3, 1));
    }, 3000);
  }, []);

  return (
    <div>
      {/* <Calendar value={new Date('2023-3-1')} onChange={(date: Date) => {
        alert(date.toLocaleDateString());
    }}></Calendar> */}
      <Datepicker
        ref={datepickerRef}
        value={new Date("2024-8-15")}
      ></Datepicker>
    </div>
  );
};
