import React, { useEffect, useState } from 'react'
import styles from "./ChatMembers.module.css"

import { useSelector } from "react-redux"

// import { } from "../../utils/apis/user/userApi"
import { chatOfUserApi } from "../../utils/apis/chat/chatApi"
import { useLocation, useParams } from 'react-router-dom'
import UserItem from '../../components/Chat/UsersItem/UserItem'
import ChatUser from '../../components/Chat/ChatUser/ChatUser'
import NoChatsYet from '../../components/Chat/NoChatsYet/NoChatsYet'
const ChatMembers = () => {
    const { userData } = useSelector((state) => state.userReducer);
    const { refresh, searchInput, searchResult } = useSelector((state) => state.otherReducer);
    const [myChats, setMyChats] = useState(null);

    const { userId, chatId } = useParams();
    const isProfile = useLocation().pathname.split("/")[2]



    // fetch all chats of the user 
    useEffect(() => {
        if (!userData?._id) return
        fetchUserChats()
    }, [userData?._id, refresh])



    const fetchUserChats = async () => {
        try {
            const res = await chatOfUserApi(userData?._id)
            setMyChats(res.data.message)
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className={`${styles.chat_members} ${userId || chatId || (isProfile === "profile") ? styles.mini : ""}`}>
            <div className={styles.chat_member_list}>
                {
                    !myChats ? <p>loading</p> : searchInput?.length > 0 ? searchResult?.map(user => <UserItem user={user} key={user?._id} />) : myChats.length > 0 ? myChats.map(chat => <ChatUser chat={chat} key={chat?._id} />) : <NoChatsYet />
                }
            </div>

        </div >
    )
}

export default ChatMembers