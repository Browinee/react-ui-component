import { MessageProps, Position } from ".";
import { useState } from "react";
import { findMessage, getId, getMessagePosition } from "./utils";

export type MessageList = {
  top: MessageProps[];
  bottom: MessageProps[];
};
const initialState = {
  top: [],
  bottom: [],
};
function useStore(defaultPosition: Position) {
  const [messageList, setMessageList] = useState<MessageList>({
    ...initialState,
  });
  return {
    messageList,
    add: (messageProps: MessageProps) => {
      const id = getId(messageProps);
      setMessageList((preState) => {
        if (messageProps?.id) {
          const position = getMessagePosition(preState, messageProps.id);
          if (position) return preState;
        }

        const position = messageProps.position || defaultPosition;
        const isTop = position.includes("top");
        const messages = isTop
          ? [{ ...messageProps, id }, ...(preState[position] ?? [])]
          : [...(preState[position] ?? []), { ...messageProps, id }];

        return {
          ...preState,
          [position]: messages,
        };
      });
      return id;
    },

    update: (id: number, messageProps: MessageProps) => {
      if (!id) return;

      setMessageList((preState) => {
        const nextState = { ...preState };
        const { position, index } = findMessage(nextState, id);

        if (position && index !== -1) {
          nextState[position][index] = {
            ...nextSate[position][index],
            ...messageProps,
          };
        }

        return nextState;
      });
    },
    remove: (id: number) => {
      setMessageList((prev) => {
        const position = getMessagePosition(prev, id);
        if (!position) return prev;
        return {
          ...prev,
          [position]: prev[position].filter((notice) => notice.id !== id),
        };
      });
    },

    clearAll: () => {
      setMessageList({ ...initialState });
    },
  };
}

export default useStore;
