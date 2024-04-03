import React, { useRef } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MessageProvider, MessageRef } from ".";
import { useMessage } from "./useMessage";
import { ConfigProvider } from "./ConfigProvider";

export default {
  title: "Example/Message",
  component: MessageProvider,
} as ComponentMeta<typeof MessageProvider>;

function Test() {
  const message = useMessage();

  return (
    <button
      onClick={() => {
        message.add({
          content: "ref test",
        });
      }}
    >
      成功
    </button>
  );
}
export const MessageList = () => {
  return (
    <div style={{ padding: "50px" }}>
      <ConfigProvider>
        <div>
          <Test />
        </div>
      </ConfigProvider>
    </div>
  );
};
