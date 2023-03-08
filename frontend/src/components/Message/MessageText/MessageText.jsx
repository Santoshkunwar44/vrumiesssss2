import React from 'react'
import { isLoggedInUser } from '../../../utils/helper'
import { useSelector } from "react-redux"
import styles from "./MessageText.module.css"
import moment from "moment"

import ImageMessage from '../ImageMessage/ImageMessage';
const MessageText = ({ message }) => {
    const { userData } = useSelector((state) => state.userReducer)

    if (message?.isImage) {
        return <>
            <ImageMessage message={message} />
            <div className={`${styles.message_text} ${isLoggedInUser(message?.senderId?._id, userData?._id) ? styles.own : ""} `}>
                <div className={styles.message_content}>
                    {message?.content}
                </div>
                <div className={styles.message_time}>
                    {moment(message.updatedAt).format("LT")}
                </div>
            </div>
        </>
    }
    return (
        <div className={`${styles.message_text} ${isLoggedInUser(message?.senderId?._id, userData?._id) ? styles.own : ""} `}>
            <div className={styles.message_content}>
                {message?.content}
            </div>
            <div className={styles.message_time}>
                {moment(message.updatedAt).format("LT")}
            </div>
        </div>
    )
}

export default MessageText