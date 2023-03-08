
import { Outlet, useParams } from "react-router-dom"
import styles from "./Chat.module.css"
import { io } from "socket.io-client"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setActiveUsers, setSocketRef } from "../../redux/actions/socketAction"
import ChatMembers from "../../Layouts/ChatMembers/ChatMembers"
import Navbar from "../../components/Navbar/Navbar"
import MessageCard from "../../components/Message/MessageCard/MessageCard"

const Chat = () => {

    const socketRef = useRef()
    const { userData } = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()
    const params = useParams()


    useEffect(() => {
        socketRef.current = io("https://lets-chat-rt5f.onrender.com")
        dispatch(setSocketRef(socketRef.current))

        return () => {
            socketRef.current.emit("leave", userData?._id)
        }
    }, [])


    useEffect(() => {
        if (!userData?._id) return
        socketRef.current.emit("join", userData?._id)
        socketRef.current.on("get_online_users", (onlineUsers) => {
            dispatch(setActiveUsers(onlineUsers))
        })
    }, [userData])

    useEffect(() => {
        socketRef.current.on("get_message", (message) => {
            let data = { ...message }
            delete data.sender_id;
            delete data.receiver_id;
            dispatch({ type: "ADD_NEW_CHAT_MESSAGE", data: message })
            dispatch({ type: "START_REFRESH" })

        })
    }, [])



    return (
        <>
            <Navbar />
            <div className={styles.chat_page}>
                <ChatMembers />
                <Outlet />
                {
                    (params?.userId || params?.chatId) && <MessageCard />
                }
            </div>
        </>
    )
}

export default Chat