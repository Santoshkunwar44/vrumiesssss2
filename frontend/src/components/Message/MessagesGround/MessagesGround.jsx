import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import MessageText from "../MessageText/MessageText"
import Message_Starter_ui from "../StarterUi/Message_Starter_ui"
import styles from "./MessagesGround.module.css"
const MessagesGround = () => {
    const { chatMessage: messages } = useSelector((state) => state.socketReducer)
    const scrollRef = useRef()




    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])



    // :) refresh state  as a dependency 

    return (
        <div className={styles.messages_ground}>
            {
                !messages ? <div> loading ...</div> : messages?.length === 0 ? <Message_Starter_ui /> : messages.map(message => <div key={message?._id} ref={scrollRef}>
                    <MessageText message={message} key={message?._id} />
                </div>)
            }
        </div>
    )
}

export default MessagesGround