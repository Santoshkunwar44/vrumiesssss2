import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getMyOrderPostIds } from "../../utils/apis/transactions/transactionsApi"
import DelModal from "../modal/delModal/DelModal"
import OrderNowModal from "../modal/orderModal/OrderModal"
import ReplyQuoteModal from "../modal/replyqoute/ReplyQuote"
import styles from "./postCard.module.css"



const PostCard = ({ postData, setTheReplies }) => {


    const { userData } = useSelector((state) => state.userReducer)
    const [hadAlreadyOrdered, setHadAlreadyOrdered] = useState(false)


    useEffect(() => {
        if (userData && postData) {
            fetchMyOrderPostIds()
        }
    }, [userData, postData])


    const fetchMyOrderPostIds = async () => {

        try {
            const { data: { message } } = await getMyOrderPostIds(userData?._id)
            let order = message.find((postItem) => postItem.post === postData?._id)
            console.log(order)
            if (order) {
                setHadAlreadyOrdered(order._id)
            } else {
                setHadAlreadyOrdered(false)
            }



        } catch (error) {
            console.log(error)

        }
    }
    return (
        <div className={styles.postInfoCard}>
            {
                postData?.owner?._id === userData?._id &&
                <DelModal itemId={postData?._id} type="post">

                    <button className={styles.deletePostBtn}>
                        <img src="/items/trash.png" alt="trashImg" />    Delete post
                    </button>
                </DelModal>
            }
            <div className={styles.card_content}>
                <div className={styles.postCardHeader}>

                    <div className={styles.userProfileBox}>
                        <img style={{ width: "70px", height: "70px", borderRadius: "50%", objectFit: "cover" }} src={postData?.owner?.profileImg} alt="userImg" />
                        <span> {postData?.owner?.username} </span>
                    </div>

                    {
                        hadAlreadyOrdered && <Link state={{ from: "orderPost", transactionId: hadAlreadyOrdered }} style={{ display: "inline", alignSelf: "end" }} to={`/profile/${userData?._id}`}>
                            <button className={`${styles.orderButton}`}>
                                View your order

                            </button>
                        </Link>
                    }
                    {
                        !hadAlreadyOrdered ? postData?.VBTused <= 0 ? <button className={`${styles.orderButton}  ${postData?.owner?._id === userData?._id ? styles.fadeBtn : ""}`}>

                            Free Post

                        </button> : postData?.orderNowBtn ? <OrderNowModal postData={postData}>


                            <button className={styles.orderButton}>
                                Order Now ${postData?.price}

                            </button>
                        </OrderNowModal>

                            : <button className={`${styles.orderButton}  ${postData?.owner?._id === userData?._id ? styles.fadeBtn : ""}`}>
                                Paid Post

                            </button> : ""
                    }




                </div>
                <div className={styles.cartTitle}>
                    <div className={styles.cardTitleWrapper}>

                        {postData?.title}
                    </div>

                </div>
                <div className={styles.cardInfoBox}>
                    <div className={styles.cardContentTop}>

                        <div className={styles.infoLeft}>

                            <div className={styles.infoLeftItem}>
                                <span>Category :</span>
                                <span>{postData?.category}</span>

                            </div>
                            <div className={styles.infoLeftItem}>
                                <span>Subsection :</span>
                                <span>{postData?.subCategory}</span>

                            </div>
                            <div className={styles.infoLeftItem}>
                                <span>Type :</span>
                                <span>{postData?.type}</span>

                            </div>

                        </div>
                        <div className={styles.infoRight}>
                            <div>
                                5 minute
                            </div>
                            <div className={styles.infoRightVBTInfo}>
                                <div className={styles.VBTquantity}>
                                    {postData?.VBTused}
                                </div>
                                <img src="/token.png" alt="tokenImg" />
                            </div>

                        </div>
                    </div>
                    <div className={styles.cardContentBottom}>
                        <div className={`${styles.infoLeft} ${styles.websiteInfo}`} >
                            <div className={styles.websiteText}>
                                Website
                            </div>
                            <div className={styles.websiteUrl}>
                                {
                                    postData?.websiteLink ? postData?.websiteLink : "No website available"
                                }
                            </div>
                        </div>
                        <div className={styles.infoRight}>
                            <div className={styles.priceWrapper}>
                                <span className={styles.priceText}>Price : </span><span>${postData?.price}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.replyQuoteBox}>
                        <ReplyQuoteModal postData={postData} handleSetReply={(newItem) => setTheReplies((prev) => [...prev, newItem])} postId={postData?._id}>
                            <button className={`${styles.replyQuoteBtn}  ${postData?.owner?._id === userData?._id ? styles.fadeReplyBtn : ""}`}>
                                <span> Reply with Quote </span>
                                <div className={styles.replyBtnVBTtext}>
                                    <span>4 VBT</span>
                                    <img src="/token.png" alt="tokenImg" />
                                </div>

                            </button>
                        </ReplyQuoteModal>
                    </div>
                </div>
            </div>
            <div className={styles.postDescription}>
                {
                    postData?.desc
                }

            </div>

        </div>
    )
}

export default PostCard