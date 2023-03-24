import styles from "./TodoList.module.css"
import moment from "moment"
import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { addNoteItem, deleteNoteItemApi, getNote, updateNote } from "../../utils/apis/note/NoteApi"

export const TodoList = () => {

    const { userData } = useSelector(state => state.userReducer)
    const [todoListData, setTodoListData] = useState(null);
    const [updateTodoData, setUpdateTodoData] = useState({
        title: "",
    })
    const [editMode, setEditMode] = useState(false)
    const titleRef = useRef()
    const [inputTodo, setInputTodo] = useState("")
    useEffect(() => {

        console.log(userData?._id)
        if (!userData?._id) return;
        fetchTodos()
    }, [userData?._id])


    useEffect(() => {
        if (editMode) {
            titleRef.current.focus()
        }
    }, [editMode])

    const fetchTodos = async () => {
        try {
            const res = await getNote(userData?._id)
            if (res.status === 200) {
                setTodoListData(res.data.message)
                setInputTodo("")

            } else {
                throw Error(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateTodos = async () => {
        try {
            const res = await addNoteItem(userData?._id, inputTodo)

            console.log(res.status, res.data.message)
            if (res.status === 200) {
                fetchTodos()
            }
        } catch (error) {
            console.log(error)

        }
    }

    const handleDeleteNoteItem = async (noteText) => {
        if (!noteText) return;
        try {
            const res = await deleteNoteItemApi(userData?._id, noteText)
            if (res.status === 200) {
                fetchTodos()
            } else {
                throw Error(res.data.message);
            }
        } catch (error) {
            console.log(error)
        }



    }


    const handleKeyDown = (e) => {

        if (e.key === "Enter" && inputTodo.length > 3) {
            updateTodos()
        } else {
            console.log("title must be of atleast 3 characters")
        }





    }

    const handleOpenEditMode = () => setEditMode(true)
    const handleCloseEditMode = async () => {
        let titleText = titleRef.current.innerText
        if (titleText?.length <= 3) {
            console.log("title characer should be more than 3")
            return;
        }
        setEditMode(false);
        try {
            const res = await updateNote(userData?._id, titleText)
            if (res.status === 200) {
                updateTodos()
            } else {
                throw Error(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className={styles.todo_list_container}>
            <button className={`${styles.edit_btn} `} onClick={editMode ? handleCloseEditMode : handleOpenEditMode}>
                <img src="/icons/add_white.png" alt="addIcon" />
                {
                    editMode ? <p>SAVE</p> : <p>EDIT</p>
                }
            </button>
            <div className={styles.todo_content}>

                <div className={styles.todo_header}>

                    <h4 className={`${styles.today_text} ${editMode ? styles.focus_title : ""}`} contentEditable={editMode} ref={titleRef}>      {todoListData?.title ? todoListData.title : moment(Date.now()).format("LL")}</h4>
                    <h2 className={styles.things_todo_text}>THINGS TO DO        </h2>

                </div>
                <div className={styles.todo_body}>
                    <input onKeyDown={handleKeyDown} type="text" value={inputTodo} placeholder="type here press enter to add note " onChange={(e) => setInputTodo(e.target.value)} />
                    <ul className={styles.todo_list}>
                        {
                            todoListData ? todoListData?.note.map(item => (
                                <li key={item?._id}>
                                    {
                                        item
                                    }
                                    {
                                        editMode ? <AiOutlineClose onClick={() => handleDeleteNoteItem(item)} className={styles.remove_note_icon} /> : ""

                                    }
                                </li>
                            )) : <p>loading</p>
                        }

                    </ul>
                </div>
            </div>

        </div>
    )
}
