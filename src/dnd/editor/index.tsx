import { Fragment, useCallback, useRef, useState } from "react";
import "./index.css";
import { COLUMN, COMPONENT, INITIAL_LAYOUT } from "./constant";
import Ccc from "./Ccc";
import Aaa from "./Aaa";
import Bbb from "./Bbb";
import { useDrag } from "react-dnd";
import DropZone from "./DropZone";
import React from "react";

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
            <DropZone
              path={`${currentPath}-${index}`}
              className="drop-zone-horizontal"
            ></DropZone>
            <Component
              data={item}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              compIndex={index}
            ></Component>
          </Fragment>
        );
      })}
      <DropZone
        path={`${currentPath}-${children?.length}`}
        className="drop-zone-horizontal"
      ></DropZone>
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
              className="drop-zone-vertical"
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
      <DropZone
        path={`${currentPath}-${children?.length}`}
        className="drop-zone-vertical"
      ></DropZone>
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

type ContextType = { swapPosition: Function };
export const LayoutContext = React.createContext<ContextType>({
  swapPosition: () => {},
});

function App() {
  const [layout, setLayout] = useState<LayoutItem[]>(INITIAL_LAYOUT);

  const swapPosition = useCallback((item: any, path: string) => {
    console.log(item, path);
    // NOTE: here just provide some usecase:
    // case 1: 1-0-0 to 0-1-1
    // layout[1].children[0].children.splice(0, 1);
    // layout[0].children[1].children.splice(1, 0, item.data);
    // setLayout([...layout]);

    // case 2: 0-0-1 到 0-1
    // layout[0].children[0].children.splice(1, 1);
    // layout[0].children.splice(1, 0, {
    //   type: COLUMN,
    //   children: [item.data],
    // });
    // setLayout([...layout]);

    // case 3: bottomBar to 1-0-2
    layout[1].children[0].children.splice(2, 0, {
      type: COMPONENT,
      component: {
        type: item.type,
      },
    });
    setLayout([...layout]);
  }, []);
  return (
    <LayoutContext.Provider value={{ swapPosition }}>
      <div className="">
        {layout.map((item, index) => {
          return (
            <Fragment key={`row_id_${item.id}`}>
              <DropZone
                path={`${index}`}
                className="drop-zone-horizontal"
              ></DropZone>
              <Row data={item} rowIndex={index}></Row>
            </Fragment>
          );
        })}
        <DropZone
          className="drop-zone-horizontal"
          path={`${layout.length}`}
        ></DropZone>
        <div className="bottomBar">
          <BarItem type="aaa"></BarItem>
          <BarItem type="bbb"></BarItem>
          <BarItem type="ccc"></BarItem>
        </div>
      </div>
    </LayoutContext.Provider>
  );
}
export default App;
