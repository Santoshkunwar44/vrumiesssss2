import { useState } from "react";
import Calendar from "react-calendar"
import { TodoList } from "../../components/TodoList/TodoList";
import "./CalenderLayout.css"
export const CalenderLayout = () => {
    const [value, onChange] = useState(new Date());

    return (
        <div className={"calender_container"}>

            <Calendar tileClassName={"itemBox"} className={"calenderBox"} onChange={onChange} value={value} />
            <TodoList />
        </div>
    )
}
