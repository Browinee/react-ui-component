export interface CardItem {
  id: number;
  content: string;
}

export interface CardProps {
  data: CardItem;
  index: number;
  swapIndex: (index: number, index2: number) => void;
}

export interface DragData {
  id: number;
  index: number;
}
