import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Moment from "moment"
import { Link } from 'react-router-dom'
import useGetNextuser from '../../../hooks/useGetNextuser'
import styles from "./ChatUser.module.css"
const ChatUser = ({ chat }) => {

    const { onlineUsers, activeChat } = useSelector((state) => state.socketReducer)
    const { nextUser } = useGetNextuser(chat?.users)
    const [selectedChat, setSelectedChat] = useState(false)
    const [isOnline, setIsOnline] = useState(false)


    useEffect(() => {
        setSelectedChat(chat?._id === activeChat?._id)
    }, [activeChat, chat])


    useEffect(() => {
        const theUser = onlineUsers?.find(user => user?.userId === nextUser?._id)
        if (theUser) {
            setIsOnline(true)
        } else {
            setIsOnline(false)
        }
    }, [onlineUsers, nextUser])




    return (
        <Link className={styles.link_item} to={`${chat?._id}`}>
            <div className={`${styles.chat_user} ${selectedChat && styles.selectedChat}`}>
                <div className={styles.profile_image_wrapper}>
                    <img className={styles.chat_user_profile_image} src={nextUser?.profileImg} alt="profileImg" />
                    <div className={` ${styles.online_dot} ${isOnline ? styles.isOnline : ""}`}>

                    </div>
                </div>
                <div className={styles.chat_user_details}>
                    <h4 className={styles.chat_username}>  {nextUser?.username}</h4>
                    <span className={styles.chat_message}>{chat?.latestMessage?.content}  </span>

                </div>
                <div className={styles.chat_user_right}>
                    <span className={styles.chat_time}>{Moment(chat?.updatedAt).format('LT')}</span>

                </div>
            </div>
        </Link>
    )
}

export default ChatUser