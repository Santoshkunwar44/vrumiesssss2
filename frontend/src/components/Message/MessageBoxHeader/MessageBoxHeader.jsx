import React from 'react'
import styles from "./MessageBoxHeader.module.css"
import { IoIosArrowRoundBack } from "react-icons/io"
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"

const MessageBoxHeader = () => {
    const navigate = useNavigate()
    const { activeUser } = useSelector((state) => state.socketReducer)

    

    return (
        <div className={styles.message_box_header}   >
            <IoIosArrowRoundBack className={styles.arrow_back_icon} onClick={() => navigate("/chat")} />
            <div className={styles.message_box_user_details}>
                <div className={styles.message_box_userImg_wrapper}>
                    <img className={styles.message_box_user_img} src={activeUser?.profileImg} alt="profileImg" />
                </div>
                <h4 className={styles.message_username}>{activeUser?.username}</h4>


            </div>
        </div>
    )
}

export default MessageBoxHeader