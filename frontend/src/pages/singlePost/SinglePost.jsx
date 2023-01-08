import Navbar from "../../components/Navbar/Navbar"
import ReplyContainer from "../../components/replyQuotesContainer/ReplyContainer"
import styles from "./singlePost.module.css"

import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { getPostById } from "../../utils/apis/post/postApi"
import { useState } from "react"
import ReplyQuoteModal from "../../components/modal/replyqoute/ReplyQuote"
import { getReplyByPost } from "../../utils/apis/reply/replyApi"
import OrderNowModal from "../../components/modal/orderModal/OrderModal"
import { useSelector } from "react-redux"


const SinglePost = () => {

    const thePostId = useParams().id
    const { refresh } = useSelector((state) => state.otherReducer)
    const [postData, setPostData] = useState({})
    const [theReplies, setTheReplies] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!thePostId) return
        fetchPost(thePostId)
        fetchReplies()

    }, [thePostId, refresh])



    const fetchReplies = async () => {


        try {

            const { data } = await getReplyByPost(thePostId)
            setTheReplies(data.message)
        } catch (error) {
            console.log(error)
        }
    }


    const fetchPost = async () => {
        try {
            const { data } = await getPostById(thePostId)
            setPostData(data.message)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Navbar />
            <div className={styles.singlePost}>
                <div className={styles.leftContent}>
                    <div className={styles.leftContent_header}>

                        <div className={styles.postHeader}>
                            <h3 className={styles.postTitle}> {postData?.title} </h3>


                        </div>
                        <div className={styles.imageSlider}>
                            {
                                postData?.postImg?.map((img, index) => (


                                    <img key={index} src={img} alt="iphoneImg" />

                                ))
                            }


                        </div>
                    </div>
                    <ReplyContainer replies={theReplies} />
                </div>

                <div className={styles.rightContent}>
                    <div className={styles.postDetailsHeader}>
                        <div className={styles.postDetailsBack} onClick={() => navigate(-1)} >BACK</div>
                        <div className={styles.detailsBox}>
                            <div className={styles.detailsWrapper}>

                                <div className={styles.postDetailsHeaderItem}>

                                    <span className={styles.postDetailsKey}>View Location :</span> <span className={styles.postDetailsValue}> {postData?.setLocation ? "Enabled" : "Disabled"} </span>
                                </div>
                                {

                                    postData?.setLocation && <div className={styles.postDetailsHeaderItem}>

                                        <span className={styles.postDetailsValue}>spanHouston,Texas</span>
                                    </div>
                                }
                                <div className={styles.postDetailsHeaderItem}>

                                    <span className={styles.postDetailsKey}>Average Rating :</span> <span className={styles.postDetailsValue}>8/10</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={styles.postInfoCard}>
                        <div className={styles.card_content}>
                            <div className={styles.postCardHeader}>

                                <div className={styles.userProfileBox}>
                                    <img style={{ width: "70px", height: "70px", borderRadius: "50%", objectFit: "cover" }} src={postData?.owner?.profileImg} alt="userImg" />
                                    <span> {postData?.owner?.username} </span>
                                </div>
                                {
                                    postData?.VBTused <= 0 ? <button className={styles.orderButton}>

                                        Free Post

                                    </button> : postData?.orderNowBtn ? <OrderNowModal postData={postData}>


                                        <button className={styles.orderButton}>
                                            Order Now ${postData?.price}

                                        </button>
                                    </OrderNowModal>

                                        : <button className={styles.orderButton}>
                                            Paid Post

                                        </button>
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
                                    <ReplyQuoteModal handleSetReply={(newItem) => setTheReplies((prev) => [...prev, newItem])} postId={thePostId}>

                                        <button className={styles.replyQuoteBtn}>
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


                </div>

            </div>
        </>
    )
}

export default SinglePost