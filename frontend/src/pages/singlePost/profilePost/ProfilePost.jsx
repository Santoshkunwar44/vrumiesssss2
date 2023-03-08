import styles from "./ProfilePost.module.css"
import { useParams, useLocation, useOutletContext } from "react-router-dom"
import { format } from "timeago.js"
import { useEffect, useState } from "react"
import ItemSlider from "../../../components/itemSlider/ItemSlider"
import { getReplyByPost } from "../../../utils/apis/reply/replyApi.js"
import NotFound from "../../../components/notFound/NotFound"
import { PostImgSlider } from "../../../components/itemSlider/postImgSlider/PostImgSlider"
import SharePost from "../../../components/popOvers/sharePostPopOver/SharePost"
import MetaDecorator from "../../../components/MetaDecorator/MetaDecorator"
const ProfilePost = () => {


    const { postId } = useParams()
    const { width } = useOutletContext();
    const [replyQuotes, setReplyQuotes] = useState(null)
    const { state: { postData } } = useLocation()


    useEffect(() => {

        if (postData?._id) {
            fetchReplyQuoteList()
        }

    }, [postData])

    const fetchReplyQuoteList = async () => {


        try {
            const { data } = await getReplyByPost(postData?._id)
            setReplyQuotes(data.message)
        } catch (error) {
            console.log(error)
        }



    }
    return (
        <>
            <MetaDecorator image={postData?.postImg[0]} title={postData?.title} description={postData?.desc} />
            <div className={styles.profilePost}>
                <div className={styles.profilePostTop}>
                    <div className={styles.postHeader}>
                        <div className={styles.postHeaderLeft}>

                            <h2 className={styles.postTitle}>{postData?.title}</h2>
                            <div className={styles.postLeftInnerBox}>
                                <img className={styles.postProfileImg} src={postData?.owner?.profileImg} alt="userImg" />
                                <div className={styles.postTimAgoDiv}>
                                    <div className={styles.postUsernameAndCatBox}>

                                        <p>{postData?.owner?.username}</p>
                                        <div className={styles.postCategoryInfo}>

                                            <p>Category : <span>{postData?.category}</span> </p>
                                            <p> - Subsection : <span>{postData?.subCategory}</span> </p>
                                            <p> - Type : <span>{postData?.type}</span> </p>
                                        </div>
                                    </div>
                                    <p className={styles.createdAt}>
                                        {format(postData?.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.postHeaderRight}>
                            <div className={styles.rightDetailsBox}>
                                <p className={styles.rightDetailsItem}>Average rating : <span>{postData?.owner?.avgRating}/10</span></p>
                                <p className={styles.rightDetailsItem}>View Location : <span>{postData?.onlineOnly ? "Disabled" : "Enabled"} </span></p>
                                <p className={styles.rightDetailsItem}>{postData?.location?.city} , {postData?.location?.state}</p>
                                <div className={styles.postOrderBox}>
                                    <div className={styles.postVBtBox}>

                                        <p>{postData?.VBTused}</p>
                                        <img src="/token.png" alt="tokenImg" />


                                    </div>
                                    <button className={styles.orderBtn}>Order Now  $320</button>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className={styles.PostImageSlider}>
                        <PostImgSlider
                            items={postData?.postImg}
                            postImgwidth={width - 25}
                        />

                    </div>
                    <div className={styles.postHeaderBottom}>
                        <div className={styles.share_comment_btn_box}>
                            <SharePost url={window.location.href} title={postData?.title}>
                                <button> <img src="/share.png" alt="share" /> share</button>
                            </SharePost>
                            <button>comments</button>
                        </div>
                        <div className={styles.postDescription}>
                            {
                                postData?.desc
                            }

                        </div>
                    </div>
                </div>

                <div className={styles.replyQuotesContainer}>

                    <div className={styles.replyHeader}>
                        <div className={styles.replyHeaderLeft}>
                            <h2 className={styles.replyHeaderText}>Reply Quotes</h2>
                            <img src="/bottomBorder.png" alt="borderbottom" />
                        </div>
                        <div className={styles.moreVBTbox}>
                            <div>
                                <p className={styles.moreVBTInfoText}>Add More VBT's <span className={styles.balanceText}>(Balance:50 VBT)</span></p>
                            </div>
                            <div className={styles.vbtDetailsBox}>
                                <div className={styles.vbtQuantityBox}>
                                    4
                                </div>
                                <p>VBT</p>
                                <div className={styles.vbtActionBtn}>

                                    <img src="/images/create/minimize.png" alt="minimizeIcon" />
                                    <img src="/images/create/maximize.png" alt="maximizeIcon" />

                                </div>
                            </div>
                            <button className={styles.VBTupdateBtn}>
                                Submit
                            </button>
                        </div>

                    </div>


                    <div className={styles.replyQuotesSliderBox}>
                        {
                            replyQuotes === null ? "" : replyQuotes?.length === 0 ? <NotFound text={"No Reply Quotes "} /> : <ItemSlider items={replyQuotes} type={"reply"} sliderWidth={width} />
                        }

                    </div>

                </div>

            </div>
        </>
    )
}

export default ProfilePost