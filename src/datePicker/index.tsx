import React, { useCallback, useImperativeHandle, useState } from "react";
import "./index.css";

interface DatepickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
}
export interface DatepickerRef {
  getDate: () => Date;
  setDate: (date: Date) => void;
}
const InternalDatepicker: React.ForwardRefRenderFunction<
  DatepickerRef,
  DatepickerProps
> = (props, ref) => {
  const { value = new Date(), onChange } = props;

  const [date, setDate] = useState(value);

  useImperativeHandle(ref, () => {
    return {
      getDate() {
        return date;
      },
      setDate(date: Date) {
        setDate(date);
      },
    };
  });

  const prevMonthHander = useCallback(() => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  }, [setDate, date]);

  const nextMonthHandler = useCallback(() => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  }, [setDate, date]);

  const daysOfMonth = useCallback((year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  }, []);
  // 星期幾
  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    console.log("e", e.currentTarget);
    const value = e.currentTarget.value;
    onChange && onChange(new Date(date.getFullYear(), date.getMonth(), value));
  };
  const renderDates = () => {
    const days = [];
    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());
    // firstDay 6：星期六 前面會有日～五個empty
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>);
    }
    for (let i = 1; i <= daysCount; i++) {
      // const clickHandler = onChange?.bind(
      //   null,
      //   new Date(date.getFullYear(), date.getMonth(), i)
      // );
      if (i === date.getDate()) {
        days.push(
          <div key={i} className="day selected" onClick={clickHandler}>
            {i}
          </div>
        );
      } else {
        days.push(
          <div key={i} className="day" onClick={clickHandler}>
            {i}
          </div>
        );
      }
    }
    return days;
  };
  return (
    <div className="calendar">
      <div className="header">
        <button onClick={prevMonthHander}>&lt;</button>
        <div>
          {date.getFullYear()} 年 {date.getMonth() + 1} 月
        </div>
        <button onClick={nextMonthHandler}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day" onClick={() => {}}>
          六
        </div>
        {renderDates()}
      </div>
    </div>
  );
};

const Datepicker = React.forwardRef(InternalDatepicker);
export default Datepicker;
