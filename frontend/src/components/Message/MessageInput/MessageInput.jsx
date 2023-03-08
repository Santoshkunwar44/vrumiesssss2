import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { addNewChatMessage } from '../../../redux/actions/socketAction'
import ImageUploader from '../ImageMessage/ImageUploader'
import styles from "./MessageInput.module.css"
const MessageInput = () => {
    const { activeChat, activeUser, socketRef } = useSelector((state) => state.socketReducer)
    const { userData } = useSelector((state) => state.userReducer)
    const [inputRef, setInputRef] = useState("")
    const dispatch = useDispatch()
    const fileRef = useRef()
    const [imagesArr, setImagesArr] = useState(null)
    const [startUploadImage, setStartUploadImage] = useState(false);
    const [isSent, setIsSent] = useState(false)



    const startMessage = () => {
        setIsSent(true)
        if (imagesArr?.length > 0) {
            setStartUploadImage(true)
        } else {
            handleAddNewMessage()
        }
    }

    const handleAddNewMessage = (images) => {
        const messageInput = inputRef;
        let messageData = {
            content: messageInput,
            senderId: userData?._id,
            chatId: activeChat?._id,
        }
        if (images) {
            messageData.images = images;
            messageData.isImage = true
        }
        console.log("inside the lst func ", messageData)
        if (!activeChat?._id) {
            delete messageData.chatId;
            messageData.users = [userData?._id, activeUser?._id]
        }
        if (!messageInput) return
        dispatch(addNewChatMessage(messageData, handleAddMessageAfterAction, activeChat?._id))
    }

    const handleAddMessageAfterAction = (newMessage) => {
        socketRef.emit("start_message", { ...newMessage, receiver_id: activeUser?._id, sender_id: userData?._id })
        setInputRef('')
        setIsSent(false)
    }

    const handleImageChanges = (e) => {
        setImagesArr(Array.from(e.target.files))
    }


    return (
        <>

            {
                startUploadImage && <ImageUploader imagesArr={imagesArr} cb={handleAddNewMessage} setStartUploadImage={setStartUploadImage} setImagesArr={setImagesArr} />
            }
            <div className={styles.messages_input_box}>
                {
                    imagesArr?.length > 0 && <div className={styles.imagePreviewBox}>

                        <img draggable="false" width={"55px"} src={URL.createObjectURL(imagesArr[0])} alt="" />

                    </div>
                }
                <div className={styles.messages_major_content}>
                    <div onClick={() => fileRef.current.click()} className={styles.gallary_box}>
                        {
                            !isSent ?
                                <img className={styles.gallary_icon} width={"30px"} src="/icons/photo.png" alt="gallaryIcon" /> : <img className={styles.sendingGIF} src="https://img.icons8.com/fluency/48/000000/loading-sign.png" alt='sendingLoader' />

                        }
                    </div>
                    <input
                        type="file"
                        style={{ display: "none" }}
                        ref={fileRef}
                        onChange={handleImageChanges}
                    />
                    <input value={isSent ? "Loading" : inputRef} onChange={(e) => setInputRef(e.target.value)} type="text" placeholder='say something...' />
                </div>
                <div onClick={startMessage} className={`${styles.messages_send_box} ${inputRef?.length < 1 && styles.disableBtn}`}>
                    <img width={"30px"} src="/icons/sent.png" alt="sentIcon" />
                </div>
            </div>
        </>
    )
}

export default MessageInput

