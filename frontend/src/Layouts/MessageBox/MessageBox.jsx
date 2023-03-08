import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MessageBoxHeader from '../../components/Message/MessageBoxHeader/MessageBoxHeader'
import MessageInput from '../../components/Message/MessageInput/MessageInput'
import MessagesGround from '../../components/Message/MessagesGround/MessagesGround'
// import { getChatByBothUsers, getChatById } from '../../utils/api/chatApi'
import { getChatByBothUser, getChatById } from "../../utils/apis/chat/chatApi"
import { useDispatch, useSelector } from "react-redux"
import styles from "./MessageBox.module.css"
import { setActiveChat, setChatMessages } from "../../redux/actions/socketAction"
import { getUserByIdApi } from "../../utils/apis/user/userApi"

const MessageBox = () => {

    const params = useParams()


    return (
        <div className={styles.message_box}>
            {
                params.chatId ? <ChatMessageBox /> : <UserMessageBox />
            }
        </div>
    )
}
export default MessageBox



const ChatMessageBox = () => {


    const { chatId } = useParams();
    const { userData } = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!chatId || !userData?._id) return
        fetchChatById()
    }, [chatId, userData])


    const fetchChatById = async () => {
        try {
            const res = await getChatById(chatId)
            const chat = res.data?.message
            dispatch(setActiveChat(chat, userData?._id));
            dispatch(setChatMessages(chat?._id))
        } catch (error) {
            console.log(error)
        }
    }


    return <>
        <MessageBoxHeader />
        <MessagesGround />
        <MessageInput />

    </>
}



const UserMessageBox = () => {

    const { userId } = useParams()
    const { userData } = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

    })

    useEffect(() => {
        if (!userData?._id || !userId) return;
        if (userData?._id === userId) {
            navigate("/chat")
        }
        fetchChatByBothUsers()
    }, [userData, userId])


    const fetchChatByBothUsers = async () => {

        try {
            const res = await getChatByBothUser(userData?._id, userId)
            if (res.data?.message) {
                let chat = res.data?.message
                dispatch(setActiveChat(chat, userData?._id));
                dispatch(setChatMessages(chat?._id))
            } else {
                fetchActiveChatUser()
            }
        } catch (error) {
            console.log(error)
        }

    }


    const fetchActiveChatUser = async () => {
        try {
            const res = await getUserByIdApi(userId)
            dispatch({ type: "SET_ACTIVE_USER", data: res.data?.message })
            dispatch({ type: "SET_ACTIVE_CHAT", data: null })
            dispatch({ type: "SET_CHAT_MESSAGE", data: [] })
        } catch (error) {
            console.log(error)
        }
    }



    return <>
        <MessageBoxHeader />
        <MessagesGround />
        <MessageInput />
    </>
}