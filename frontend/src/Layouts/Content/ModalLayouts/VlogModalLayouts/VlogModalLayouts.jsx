import React, { useRef } from 'react'
import VideoPreview from '../../VideoPreview/VideoPreview'
import styles2 from "../BlogModalLayouts/BlogModalLayouts.module.css"
const VlogModalLayouts =    ({ data, handleChange, handleDocChange, onClose, handleSubmit }) => {


    const thumbnailPhotoRef = useRef()
    const videoRef = useRef()

    return (
        <div className={styles2.create_content_box}>

            <div className={styles2.create_blog_content_wrapper}>
                <div className={styles2.create_blog_content_left}>

                    <div className={styles2.create_content_header}>
                        <div className={styles2.create_content_header_left}>
                            <h2>VRUMIES Vlog</h2>


                        </div>
                        <div className={styles2.create_content_header_right}>
                            Vrumies Content
                        </div>

                    </div>
                    <h2 className={styles2.create_forum_text}>
                        Create Vlog


                    </h2>
                    <div className={styles2.create_content_input_box}>

                        <input type="text" placeholder="title" value={data?.title} onChange={(e) => handleChange("title", e.target.value)} />
                        <textarea cols="30" rows="5" placeholder="Description for forum" value={data?.description} onChange={(e) => handleChange("description", e.target.value)}></textarea>

                    </div>

                </div>
                <div className={styles2.create_blog_content_right}>
                    <input type="file" style={{ display: "none" }} name="" id="" ref={thumbnailPhotoRef} onChange={(e) => handleDocChange("thumbnail_image", e.target.files[0])} />
                    <input type="file" style={{ display: "none" }} name="" id="" ref={videoRef} onChange={(e) => handleDocChange("video_url", e.target.files[0])} />
                    <div className={styles2.thumbnail_upload_box} onClick={() => thumbnailPhotoRef.current.click()}>
                        {
                            data?.thumbnail_image && <img className={styles2.thumbnail_previewImg} src={URL.createObjectURL(data?.thumbnail_image)} alt="thumbnail Img" />
                        }
                        <img src="/icons/gallary.png" alt="playIcon" />
                    </div>
                    <div className={styles2.video_upload_box} onClick={() => videoRef.current.click()}>
                        {
                            data?.video_url && <VideoPreview videoUrl={data?.video_url} />
                        }
                        <img src="/icons/play.png" alt="playIcon" />

                    </div>

                </div>
            </div>
            <div className={styles2.create_content_bottom_box}>

                <input type="text" placeholder="Type your website link here" value={data?.website_url} onChange={(e) => handleChange("website_url", e.target.value)} />
                <div className={styles2.button_container}>

                    <button onClick={onClose}>
                        <img src="" alt="" />
                        <p>BACK</p>

                    </button>
                    <button onClick={handleSubmit}>
                        CREATE
                    </button>

                </div>
            </div>

        </div>
    )
}

export default VlogModalLayouts