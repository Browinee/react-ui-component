import { useDrop } from "react-dnd";
import "./Dropzone.css";
import { useContext } from "react";
import { LayoutContext } from ".";
interface DropZoneProps {
  className: string;
  path: string;
}
function DropZone(props: DropZoneProps) {
  const { swapPosition } = useContext(LayoutContext);
  const [{ overing }, drop] = useDrop({
    accept: ["column", "row", "component", "barItem"],
    drop(item: any) {
      console.log("drop zone: item, prop.path", item.path, props.path);
      swapPosition(item, props.path);
    },
    collect(monitor) {
      return {
        overing: monitor.isOver(),
      };
    },
  });
  return (
    <div
      ref={drop}
      className={`drop-zone ${props.className} ${overing ? "focus" : ""}`}
    ></div>
  );
}

export default DropZone;
