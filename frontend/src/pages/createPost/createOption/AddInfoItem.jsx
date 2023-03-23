import React, { useState } from "react"
import styles from "./AddInfoItem.module.css"
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"

const AddInfoItem = React.memo(({ item, index, onChangeItem, handleDelete }) => {


    const [expand, setExpand] = useState(false)
    console.log(item.title, item.details)

    return (
        <div className={styles.add_info_item}>
            <div className={styles.add_info_main_view} >

                <textarea cols="7" rows="10" placeholder="Type information title here..." className={styles.add_info_title} value={item.title} onChange={(e) => onChangeItem(item.id, "title", e.target.value)}>

                </textarea>
                {
                    expand ? <IoMdArrowDropup className={styles.info_drop_down_icon} onClick={() => setExpand(false)} /> : <IoMdArrowDropdown className={styles.info_drop_down_icon} onClick={() => setExpand(true)} />
                }

            </div>
            <div className={`${styles.add_info_item_details_box} ${expand ? styles.expandInfoItem : ""}`}>

                <textarea type="text" placeholder="Type information details here..." className={styles.add_info_details} value={item.details} onChange={(e) => onChangeItem(item.id, "details", e.target.value)}  ></textarea>
                <div className={styles.add_info_item_button}>
                    <button className={styles.info_delete_button} onClick={() => handleDelete(item.id)}>Delete</button>
                    <button className={styles.info_save_button} onClick={() => setExpand(false)}> Save</button>
                </div>
            </div>
        </div>
    )
})

export default AddInfoItem