import React, { useRef } from 'react'

import styles2 from "./BlogModalLayouts.module.css"
const BlogModalLayouts = ({ handleSubmit, data, handleChange, handleDocChange, onClose }) => {

    const thumbnailInputRef = useRef()

    return (
        <div className={styles2.create_content_box}>

            <div className={styles2.create_blog_content_wrapper}>
                <div className={styles2.create_blog_content_left}>

                    <div className={styles2.create_content_header}>
                        <div className={styles2.create_content_header_left}>
                            <h2>VRUMIES Blogs</h2>


                        </div>
                        <div className={styles2.create_content_header_right}>
                            Vrumies Content
                        </div>

                    </div>
                    <h2 className={styles2.create_forum_text}>
                        Create Blogs


                    </h2>
                    <div className={styles2.create_content_input_box}>

                        <input type="text" placeholder="title" value={data?.title} onChange={(e) => handleChange("title", e.target.value)} />

                        <textarea cols="30" rows="5" placeholder="Description for forum" value={data?.description} onChange={(e) => handleChange("description", e.target.value)} ></textarea>

                    </div>

                </div>
                <div className={styles2.create_blog_content_right}>
                    <input type="file" name="" id="" style={{ display: "none" }} onChange={(e) => handleDocChange("thumbnail_image", e.target.files[0])} ref={thumbnailInputRef} />

                    <div className={styles2.thumbnail_upload_box} onClick={() => thumbnailInputRef.current.click()}>
                        {
                            data?.thumbnail_image && <img className={styles2.thumbnail_previewImg} src={URL.createObjectURL(data?.thumbnail_image)} alt="thumbnail Img" />
                        }
                        <img src="/icons/gallary.png" alt="playIcon" />
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

export default BlogModalLayouts