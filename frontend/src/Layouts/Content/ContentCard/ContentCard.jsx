import { useNavigate } from "react-router-dom"
import ReactToContent from "../../../components/content/ReactToContent/ReactToContent"
import styles from "./ContentCard.module.css"

const ContentCard = ({ content }) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/content?${content.contentType}=${content?._id}`)} className={styles.content_card}>

            <div className={styles.postBlurBg}>
                <div className={styles.postBlur1}>
                </div>
                <div className={styles.postBlur2}>

                </div>
            </div>
            <div className={styles.postTitle}>
                {content?.title?.substring(0, 20)}

            </div>
            {
                content?.contentType === "forum" ? <div className={styles?.desc}>
                    {content?.description?.substring(0, 100)}
                </div> : <div className={styles.postImgWrapper}>

                    <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={content?.thumbnail_image} alt={content?.title} />


                </div>
            }

            <div className={styles.postOwnerDetails}>
                <div className={styles.postOnwerInfo}>
                    <img src={content?.owner?.profileImg} alt="postOnwerImg" />
                    <p> {content?.owner?.username} </p>


                </div>
                {/* <div className={styles.tokenInfo}>
                    <p className={styles.tokenCount}>{content?.VBTused}</p>
                    <img width={"20px"} src="/token.png" alt="tokenImg" />
                </div> */}

            </div>
            <div>
                <ReactToContent data={content} contentType={content?.contentType} mini={true} />
            </div>
        </div>

    )
}

export default ContentCard