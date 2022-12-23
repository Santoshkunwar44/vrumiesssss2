import styles from "./post.module.css"
const Post = () => {
    return (
        <div className={styles.post}>
            <div className={styles.postBlurBg}>
                <div className={styles.postBlur1}>

                </div>
                <div className={styles.postBlur2}>

                </div>

            </div>
            <div className={styles.postTitle}>
                THE AUTOMATIC AUTO

            </div>
            <div className={styles.postImgWrapper}>

                <img src="/images/car/first.png" alt="carImg" />

            </div>
            <div className={styles.postOwnerDetails}>
                <div className={styles.postOnwerInfo}>
                    <img src="/loggedUser.png" alt="postOnwerImg" />
                    <p>Gryan Duminson</p>


                </div>
                <div className={styles.tokenInfo}>
                    <p className={styles.tokenCount}>13</p>
                    <img src="/token.png" alt="tokenImg" />
                </div>

            </div>
        </div>
    )
}

export default Post