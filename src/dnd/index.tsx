import { useEffect, useRef, useState } from "react";
import "./index.css";
import { useDrag, useDrop, DndProvider, useDragLayer } from "react-dnd";
import { HTML5Backend, getEmptyImage } from "react-dnd-html5-backend";
interface ItemType {
  color: string;
}
interface BoxProps {
  color: string;
}

function Box(props: BoxProps) {
  const ref = useRef(null);
  const [dragProps, drag, dragPreview] = useDrag({
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

  useEffect(() => {
    drag(ref);
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, []);

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
  useEffect(() => {
    drop(ref);
  }, []);

  return (
    <div ref={ref} className="container">
      {boxes.map((item) => {
        return <Box key={item.color} color={item.color}></Box>;
      })}
    </div>
  );
}
const DragLayer = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging) {
    return null;
  }
  return (
    <div
      className="drag-layer"
      style={{
        left: currentOffset?.x,
        top: currentOffset?.y,
      }}
    >
      {item.color} Drag!
    </div>
  );
};

function App() {
  return (
    <div>
      <Container></Container>
      <Box color="blue"></Box>
      <Box color="red"></Box>
      <Box color="green"></Box>
      <DragLayer />
    </div>
  );
}

export default App;
