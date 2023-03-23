import styles from "./TodoList.module.css"
import moment from "moment"

export const TodoList = () => {
    return (
        <div className={styles.todo_list_container}>
            <button className={styles.edit_btn}>
                <img src="/icons/add_white.png" alt="addIcon" />
                <p>EDIT </p>
            </button>
            <div className={styles.todo_content}>

                <div className={styles.todo_header}>

                    <h4 className={styles.today_text}>      {moment(Date.now()).format("LL")}</h4>
                    <h2 className={styles.things_todo_text}>THINGS TO DO        </h2>

                </div>
                <div className={styles.todo_body}>
                    <input type="text" name="" id="" placeholder="type here to add notes " />
                    <ul className={styles.todo_list}>
                        <li>Make Typescript Project</li>
                        <li>Start Learning DSA </li>
                        <li>Give 5 hours for Vrumies project </li>
                        <li>Chill out with friends but optional </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}
