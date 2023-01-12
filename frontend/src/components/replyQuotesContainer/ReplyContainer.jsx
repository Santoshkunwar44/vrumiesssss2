import NotFound from "../notFound/NotFound"
import ReplyQuotes from "../replyQuotes/ReplyQuotes"
import styles from "./replyContainer.module.css"
const ReplyContainer = ({ replies }) => {
    return (
        <>

            <div className={styles.replyContainer}>
                <div className={styles.replyHeader}>

                    <h2>Reply Quotes</h2>
                    <img src="/bottomBorder.png" alt="borderBtm" />

                </div>
                <div className={styles.replyQuotesWrapper}>
                    {
                        replies?.length <= 0 ? <NotFound img={"/images/profile/noreply.png"} text={"No replies to the post !!"} /> :
                            replies?.map((reply) => (

                                <ReplyQuotes reply={reply} key={reply?._id} />
                            ))
                    }

                </div>
            </div>
        </>
    )
}

export default ReplyContainer