import moment from "moment"
import styles from "./ContentComment.module.css"


const ContentComment = ({ data }) => {
    return (
        <div className={styles.content_comment}>
            <div className={styles.comment_header}>

                <div className={styles.header_profile_details}>
                    <img src={data?.user?.profileImg} alt="commentUserIMg" />

                    <p className={styles.comment_username}>{data?.user?.username}</p>


                </div>

                <div className={styles.comment_time}>
                    {moment(data?.updatedAt).format('LL')}
                </div>

            </div>
            <div className={styles.commment_text}>

                {data?.text}

            </div>
        </div>
    )
}

export default ContentComment