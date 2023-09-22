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
  rowIndex: number;
  columnIndex: number;
  compIndex: number;
}
function Component(compProps: ComponentProps) {
  const {
    data: { component },
    rowIndex,
    columnIndex,
    compIndex,
  } = compProps;
  const Comp = registeredComponent[component!.type];
  const currentPath = `${rowIndex}-${columnIndex}-${compIndex}`;

  const [, drag] = useDrag({
    type: "component",
    item: {
      type: "component",
      path: currentPath,
      data: compProps.data,
    },
  });
  return (
    <div ref={drag} className="component">
      <Comp></Comp>
    </div>
  );
}

interface ColumnProps {
  data: LayoutItem;
  rowIndex: number;
  columnIndex: number;
}

function Column(columnProps: ColumnProps) {
  const {
    data: { children },
    rowIndex,
    columnIndex,
  } = columnProps;
  const currentPath = `${rowIndex}-${columnIndex}`;
  const [, drag] = useDrag({
    type: "column",
    item: {
      type: "column",
      path: currentPath,
      data: columnProps.data,
    },
  });
  return (
    <div ref={drag} className="column">
      {children?.map((item, index) => {
        return (
          <Fragment key={`comp_id_${item.id}`}>
            <DropZone className="drop-zone-horizontal"></DropZone>
            <Component
              data={item}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              compIndex={index}
            ></Component>
          </Fragment>
        );
      })}
      <DropZone className="drop-zone-horizontal"></DropZone>
    </div>
  );
}

interface RowProps {
  data: LayoutItem;
  rowIndex: number;
}
function Row(rowProps: RowProps) {
  const {
    data: { children },
    rowIndex,
  } = rowProps;
  const currentPath = rowIndex + "";
  const [, drap] = useDrag({
    type: "row",
    item: {
      path: currentPath,
      type: "row",
      data: rowProps.data,
    },
  });
  return (
    <div className="row">
      {children?.map((item, index) => {
        return (
          <Fragment key={`col_id_${item.id}`}>
            <DropZone
              path={`${currentPath}-${index}`}
              className="drop-zone-horizontal"
            ></DropZone>
            <Column
              key={`col_id_${item.id}`}
              data={item}
              rowIndex={rowIndex}
              columnIndex={index}
            ></Column>
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
      {layout.map((item, index) => {
        return (
          <Fragment key={`row_id_${item.id}`}>
            <DropZone path={index} className="drop-zone-horizontal"></DropZone>
            <Row data={item} rowIndex={index}></Row>
          </Fragment>
        );
      })}
      <DropZone
        className="drop-zone-horizontal"
        path={layout.length}
      ></DropZone>
      <div className="bottomBar">
        <BarItem type="aaa"></BarItem>
        <BarItem type="bbb"></BarItem>
        <BarItem type="ccc"></BarItem>
      </div>
    </div>
  );
}
export default App;
