
import React, { useState } from 'react'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import styles from "../PostAdditionalCard.module.css"


const PostInfoItem = ({ item }) => {
    const [expand, setExpand] = useState(false)
    return (
        <div >
            <div className={styles.add_info_item} >
                <div className={styles.add_info_main_view} onClick={() => setExpand(!expand)}>

                    <div className={styles.add_info_title}>
                        {item?.title}
                    </div>
                    {
                        expand ? <IoMdArrowDropup className={styles.info_drop_down_icon} /> : <IoMdArrowDropdown className={styles.info_drop_down_icon} />
                    }

                </div>
                <div className={`${styles.add_info_item_details_box} ${expand ? styles.expandInfoItem : ""}`}>
                    <p className={styles.details_text}>

                        {item?.details}
                    </p>

                </div>
            </div>
        </div>
    )
}

export default PostInfoItem