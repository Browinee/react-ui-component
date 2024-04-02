import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MessageProvider } from ".";

export default {
  title: "Example/Message",
  component: MessageProvider,
} as ComponentMeta<typeof MessageProvider>;

export const MessageList = () => {
  return (
    <div style={{ padding: "50px" }}>
      <MessageProvider></MessageProvider>
    </div>
  );
};
