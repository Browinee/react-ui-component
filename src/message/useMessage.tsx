import { useContext } from "react";
import { ConfigContext } from "./ConfigProvider";
import { MessageRef } from ".";

export function useMessage(): MessageRef {
  const { messageRef } = useContext(ConfigContext);
  if (!messageRef) {
    throw new Error(
      "Please remember to wrap your components with <ConfigProvider />"
    );
  }
  return messageRef.current!;
}
