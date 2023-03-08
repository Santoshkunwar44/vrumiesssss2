import { Link } from "react-router-dom"
import styles from "./post.module.css"
const Post = ({ post, slider }) => {
    return (
        <Link to={slider ? `post/${post?._id}` : `/post/${post?._id}`} state={{ from: slider ? "profile" : null, postData: post }}><div className={`${styles.post} ${slider ? styles.sliderPost : ""}`}>
            <div className={styles.postBlurBg}>
                <div className={styles.postBlur1}>
                </div>
                <div className={styles.postBlur2}>

                </div>
            </div>
            <div className={styles.postTitle}>
                {post?.title?.substring(0, 20)}

            </div>
            <div className={styles.postImgWrapper}>

                <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={post?.postImg[0]} alt="carImg" />

            </div>
            <div className={styles.postOwnerDetails}>
                <div className={styles.postOnwerInfo}>
                    <img src={post?.owner?.profileImg} alt="postOnwerImg" />
                    <p> {post?.owner?.username} </p>


                </div>
                <div className={styles.tokenInfo}>
                    <p className={styles.tokenCount}>{post?.VBTused}</p>
                    <img src="/token.png" alt="tokenImg" />
                </div>

            </div>
        </div>
        </Link >
    )
}

export default Post