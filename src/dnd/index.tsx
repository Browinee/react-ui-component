import { useRef, useState } from "react";
import "./index.css";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
interface ItemType {
  color: string;
}
interface BoxProps {
  color: string;
}

function Box(props: BoxProps) {
  const ref = useRef(null);
  const [dragProps, drag] = useDrag({
    type: "box",
    item: {
      color: props.color,
    },
    collect(monitor) {
      return {
        dragging: monitor.isDragging(),
      };
    },
  });

  drag(ref);
  return (
    <div
      ref={ref}
      className={dragProps.dragging ? "box dragging" : "box"}
      style={{ background: props.color || "blue" }}
    ></div>
  );
}

function Container() {
  const [boxes, setBoxes] = useState<ItemType[]>([]);

  const ref = useRef(null);

  const [, drop] = useDrop(() => {
    return {
      accept: "box",
      drop(item: any) {
        setBoxes((boxes) => [...boxes, item]);
      },
    };
  });
  drop(ref);

  return (
    <div ref={ref} className="container">
      {boxes.map((item) => {
        return <Box key={item.color} color={item.color}></Box>;
      })}
    </div>
  );
}

function App() {
  return (
    <div>
      <Container></Container>
      <Box color="blue"></Box>
      <Box color="red"></Box>
      <Box color="green"></Box>
    </div>
  );
}

export default App;
