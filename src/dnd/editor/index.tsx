import { useState } from "react";
import "./index.css";
import { INITIAL_LAYOUT } from "./constant";

function Aaa() {
  return <button>aaa</button>;
}
function Bbb() {
  return (
    <img
      alt="Doraemon"
      width="50"
      height="50"
      src="https://img0.baidu.com/it/u=3610760552,2286123102&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
    />
  );
}

function Ccc() {
  return <input type="range"></input>;
}

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

  return (
    <div className="component">
      <Comp></Comp>
    </div>
  );
}

interface ColumnProps {
  data: LayoutItem;
}

function Column(columnProps: ColumnProps) {
  const { children } = columnProps.data;

  return (
    <div className="column">
      {children?.map((item) => {
        return <Component key={`comp_id_${item.id}`} data={item}></Component>;
      })}
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
        return <Column key={`col_id_${item.id}`} data={item}></Column>;
      })}
    </div>
  );
}

interface BarItemProps {
  type: string;
}
function BarItem(props: BarItemProps) {
  const Comp = registeredComponent[props.type];

  return (
    <div className="bar-item">
      <Comp></Comp>
    </div>
  );
}

function App() {
  const [layout, setLayout] = useState<LayoutItem[]>(INITIAL_LAYOUT);

  return (
    <div className="">
      {layout.map((item) => {
        return <Row key={`row_id_${item.id}`} data={item}></Row>;
      })}
      <div className="bottomBar">
        <BarItem type="aaa"></BarItem>
        <BarItem type="bbb"></BarItem>
        <BarItem type="ccc"></BarItem>
      </div>
    </div>
  );
}
export default App;
