import styles from "./Message_starter_ui.module.css"
const Message_Starter_ui = () => {
    return (
        <div className={styles.Message_starter_ui}>
            <div className={styles.starter_content}>
                <img src="/images/start_msg.png" alt="startmessageImg" />
                <p>Say Hi ✋ to start a conversation !! </p>
            </div>
        </div>
    )
}

export default Message_Starter_ui