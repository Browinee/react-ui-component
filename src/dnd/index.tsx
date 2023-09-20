import { useRef } from "react";
import "./index.css";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Box() {
  const ref = useRef(null);
  const [, drag] = useDrag({
    type: "box",
    item: {
      color: "blue",
    },
  });

  drag(ref);
  return <div ref={ref} className="box"></div>;
}

function Container() {
  const ref = useRef(null);

  const [, drop] = useDrop(() => {
    return {
      accept: "box",
      drop(item: any) {
        console.log(item);
      },
    };
  });
  drop(ref);

  return <div ref={ref} className="container"></div>;
}

function App() {
  return (
    <div>
      <Container></Container>
      <Box></Box>
    </div>
  );
}

export default App;
