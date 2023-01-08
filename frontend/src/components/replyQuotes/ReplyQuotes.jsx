import styles from "./replyquotes.module.css"

const ReplyQuotes = ({ reply }) => {
    return (
        <div className={styles.replyQuotes}>
            <div className={styles.qoutesUserInfo}>
                <img src={reply?.user?.profileImg} alt="userImg" />
                <div className={styles.quotesUsername}>
                    {
                        reply?.user?.username
                    }
                </div>

            </div>
            <div className={styles.qoutesContent}>
                <div className={styles.quotesTitle}>
                    <h2> {reply?.title} </h2>


                </div>
                <div className={styles.qoutesDesc}>
                    {
                        reply?.desc
                    }
                </div>
                <div className={styles.qoutesAssets}>
                    <div className={styles.tokenBox}>
                        <p className={styles.qoutesTokenCount}> {reply?.vbtUsed}</p>
                        <img src="/token.png" alt="tokenImg" />

                    </div>
                    <div>
                        ${reply?.price}
                    </div>

                </div>
            </div>



        </div>
    )
}

export default ReplyQuotes