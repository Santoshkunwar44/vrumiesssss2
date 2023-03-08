import React from 'react'
import styles from "../../../../components/modal/ContentCreateModal/ContentCreateModal.module.css"
const ForumModalLayouts = ({ data, handleChange, handleSubmit, onClose }) => {

    return (
        <div className={styles.create_content_box}>

            <div className={styles.create_content_header}>
                <div className={styles.create_content_header_left}>
                    <h2>VRUMIES Forums</h2>


                </div>
                <div className={styles.create_content_header_right}>
                    Vrumies Content
                </div>

            </div>
            <h2 className={styles.create_forum_text}>
                Create Forum


            </h2>
            <div className={styles.create_content_input_box}>

                <input type="text" placeholder="title" value={data?.title} onChange={(e) => handleChange("title", e.target.value)} />
                <textarea cols="30" rows="5" placeholder="Description for forum" value={data?.description} onChange={(e) => handleChange("description", e.target.value)}></textarea>

            </div>
            <div className={styles.create_content_bottom_box}>

                <input type="text" placeholder="Type your website link here" value={data?.website_url} onChange={(e) => handleChange("website_url", e.target.value)} />
                <div className={styles.button_container}>

                    <button onClick={onClose}>
                        <img src="" alt="" />
                        <p>BACK</p>

                    </button>
                    <button onClick={() => handleSubmit(null)}>
                        CREATE
                    </button>

                </div>
            </div>

        </div>
    )
}

export default ForumModalLayouts