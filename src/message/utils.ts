import { MessageProps, Position } from ".";
import type { MessageList } from "./useStore";

let count = 1;
export function getId(messageProps: MessageProps) {
  // NOTE:用messageProps的id 或是 用遞增的count當作id
  // 但換成uuid並且檢查重複可能比較好
  if (messageProps.id) {
    return messageProps.id;
  }
  count += 1;

  return count;
}

export function getMessagePosition(messageList: MessageList, id: number) {
  for (const [position, list] of Object.entries(messageList)) {
    if (list.find((item) => item.id === id)) {
      return position as Position;
    }
  }
}

export function findMessage(messageList: MessageList, id: number) {
  const position = getMessagePosition(messageList, id);
  const index = position
    ? messageList[position].findIndex((message) => message.id === id)
    : -1;

  return {
    position,
    index,
  };
}
