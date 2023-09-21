import { useCallback, useEffect, useRef, useState } from "react";
import "./index.css";
import { CardList } from "./constant";
import { CardItem, CardProps, DragData } from "./type";
import { useDrag, useDrop } from "react-dnd";

function Card(props: CardProps) {
  const { data, index, swapIndex } = props;
  const ref = useRef(null);
  const [{ dragging }, drag] = useDrag({
    type: "card",
    item: {
      id: data.id,
      index,
    },
    collect(monitor) {
      return {
        dragging: monitor.isDragging(),
      };
    },
  });

  const [, drop] = useDrop({
    accept: "card",
    hover(item: DragData) {
      swapIndex(item.index, index);
      item.index = index;
      // console.log({ from: item, to: data });
    },
  });

  useEffect(() => {
    drag(ref);
    drop(ref);
  }, []);

  return (
    <div ref={ref} className={dragging ? "card dragging" : "card"}>
      {data.content}
    </div>
  );
}
function App() {
  const [cardList, setCardList] = useState<CardItem[]>(CardList);
  const swapIndex = useCallback((index1: number, index2: number) => {
    const tmp = cardList[index1];
    cardList[index1] = cardList[index2];
    cardList[index2] = tmp;
    setCardList([...cardList]);
  }, []);

  return (
    <div>
      {cardList.map((item: CardItem, index: number) => (
        <Card
          data={item}
          key={"card_" + item.id}
          index={index}
          swapIndex={swapIndex}
        />
      ))}
    </div>
  );
}

export default App;
