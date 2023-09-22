import { useDrop } from "react-dnd";
import "./Dropzone.css";
interface DropZoneProps {
  className: string;
}
function DropZone(props: DropZoneProps) {
  const [{ overing }, drop] = useDrop({
    accept: ["column", "row", "component", "barItem"],
    drop(item) {
      console.log(item);
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
