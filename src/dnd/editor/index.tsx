import { Fragment, useRef, useState } from "react";
import "./index.css";
import { INITIAL_LAYOUT } from "./constant";
import Ccc from "./Ccc";
import Aaa from "./Aaa";
import Bbb from "./Bbb";
import { useDrag } from "react-dnd";
import DropZone from "./DropZone";

const registeredComponent: Record<string, any> = {
  aaa: Aaa,
  bbb: Bbb,
  ccc: Ccc,
};

interface LayoutItem {
  type: string;
  id: string;
  children?: LayoutItem[];
  component?: {
    type: string;
  };
}

interface ComponentProps {
  data: LayoutItem;
}
function Component(compProps: ComponentProps) {
  const { component } = compProps.data;
  const Comp = registeredComponent[component!.type];
  const [, drag] = useDrag({
    type: "component",
    item: compProps,
  });
  return (
    <div ref={drag} className="component">
      <Comp></Comp>
    </div>
  );
}

interface ColumnProps {
  data: LayoutItem;
}

function Column(columnProps: ColumnProps) {
  const { children } = columnProps.data;
  const [, drag] = useDrag({
    type: "column",
    item: columnProps,
  });

  return (
    <div ref={drag} className="column">
      {children?.map((item) => {
        return (
          <Fragment key={`comp_id_${item.id}`}>
            <DropZone className="drop-zone-horizontal"></DropZone>
            <Component data={item}></Component>
          </Fragment>
        );
      })}
      <DropZone className="drop-zone-horizontal"></DropZone>
    </div>
  );
}

interface RowProps {
  data: LayoutItem;
}
function Row(rowProps: RowProps) {
  const { children } = rowProps.data;
  return (
    <div className="row">
      {children?.map((item) => {
        return (
          <Fragment key={`col_id_${item.id}`}>
            <DropZone className="drop-zone-horizontal"></DropZone>
            <Column key={`col_id_${item.id}`} data={item}></Column>
          </Fragment>
        );
      })}
      <DropZone className="drop-zone-horizontal"></DropZone>
    </div>
  );
}

interface BarItemProps {
  type: string;
}
function BarItem(props: BarItemProps) {
  const Comp = registeredComponent[props.type];
  const [, drag] = useDrag({
    type: "barItem",
    item: props,
  });
  const ref = useRef(null);
  return (
    <div ref={drag} className="bar-item">
      <Comp></Comp>
    </div>
  );
}

function App() {
  const [layout, setLayout] = useState<LayoutItem[]>(INITIAL_LAYOUT);

  return (
    <div className="">
      {layout.map((item) => {
        return (
          <Fragment key={`row_id_${item.id}`}>
            <DropZone className="drop-zone-horizontal"></DropZone>
            <Row data={item}></Row>
          </Fragment>
        );
      })}
      <DropZone className="drop-zone-horizontal"></DropZone>
      <div className="bottomBar">
        <BarItem type="aaa"></BarItem>
        <BarItem type="bbb"></BarItem>
        <BarItem type="ccc"></BarItem>
      </div>
    </div>
  );
}
export default App;
