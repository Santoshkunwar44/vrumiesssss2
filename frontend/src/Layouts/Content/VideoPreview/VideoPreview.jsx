import { memo } from 'react'
import styles2 from "../ModalLayouts/BlogModalLayouts/BlogModalLayouts.module.css"
const VideoPreview = memo(({ videoUrl }) => {
    console.log("updatingg....", videoUrl)
    return (
        <video className={styles2.thumbnail_previewImg} alt="video " >

            <source src={URL.createObjectURL(videoUrl)} />

        </video>
    )
})

export default VideoPreview