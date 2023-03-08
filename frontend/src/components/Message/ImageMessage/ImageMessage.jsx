import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { isLoggedInUser } from '../../../utils/helper'
import styles from "./ImageMessage.module.css"
const ImageMessage = ({ message }) => {
    const { userData } = useSelector((state) => state.userReducer);
    const [isLoading, setIsLoading] = useState(true)


    const handleImageLoaded = () => {
        setIsLoading(false)
    }

    return (
        <div className={`${styles.ImageMessage}  ${isLoggedInUser(message?.senderId?._id, userData?._id) ? styles.own : ""} `}>
            {
                isLoading ? <div className={styles.loading_imageUi}>
                    <img src="/icons/loading.png" alt="loadingImg" />
                </div> : ""
            }
            {
                <img onLoad={handleImageLoaded} draggable={'false'} className={styles.messageImg} width={"200px"} style={{ display: isLoading ? "none" : "block" }} src={message?.images[0]} alt="punk" />
            }

        </div>
    )
}

export default ImageMessage