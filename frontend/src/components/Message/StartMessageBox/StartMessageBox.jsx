import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./StartMessageBox.module.css"


const StartMessageBox = () => {

    const { searchInputRef } = useSelector((state) => state.otherReducer)
    const dispatch = useDispatch()

    const handleInputFocus = () => {
        searchInputRef.focus()
        dispatch({ type: "SET_INPUT_OUTLINE", data: true })

    }
    return (
        <div className={styles.start_message_box} >
            <div className={styles.start_message_content}>
                <img className={styles.start_chat_img} src="/images/start_chat.png" alt="startChatImg" />
                <p className={styles.initial_text}>Start chatting with sellers & buyers</p>
                {/* <button className={styles.search_friend_btn} onClick={handleInputFocus}>Search Friends</button> */}
            </div>
        </div>
    )
}

export default StartMessageBox