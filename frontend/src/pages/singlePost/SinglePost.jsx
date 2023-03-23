import Navbar from "../../components/Navbar/Navbar"
import ReplyContainer from "../../components/replyQuotesContainer/ReplyContainer"
import styles from "./singlePost.module.css"

import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { getPostById } from "../../utils/apis/post/postApi"
import { useState } from "react"
import { getReplyByPost } from "../../utils/apis/reply/replyApi"
import { useSelector } from "react-redux"
import PostCard from "../../components/postCard/PostCard"
import SinglePostSkeleton from "../../components/skeleton/singlePostSkeleton/SinglePostSkeleton"
import { PostImgSlider } from "../../components/itemSlider/postImgSlider/PostImgSlider"
import ContentComment from "../../components/content/Comments/ContentComment"
import CreateComment from "../../components/content/Comments/CreateComment/CreateComment"
import PostAdditionalCard from "../../components/post/PostAdditionalCard.jsx/PostAdditionalCard"


const SinglePost = () => {

    const thePostId = useParams().id
    const { refresh } = useSelector((state) => state.otherReducer)
    const [postData, setPostData] = useState({})
    const [theReplies, setTheReplies] = useState([])
    const navigate = useNavigate()
    const isFromProfile = useLocation().state?.from;

    useEffect(() => {
        let fromTop = window.scrollY
        if (fromTop > 0) {
            window.scrollTo(0, 0)
        }
    }, [])

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

    if (!postData?.title) {
        return <>
            <Navbar />
            <SinglePostSkeleton />
        </>
    }
    console.log(postData)
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

                            <PostImgSlider
                                items={postData?.postImg}
                            />
                        </div>
                    </div>
                    <div className={styles.mini_post_card}>
                        <div className={styles.postDetailsHeader}>
                            <div className={styles.postDetailsBack} onClick={() => navigate(-1)} >BACK</div>
                            <div className={styles.detailsBox}>
                                <div className={styles.detailsWrapper}>

                                    <div className={styles.postDetailsHeaderItem}>

                                        <span className={styles.postDetailsKey}>View Location :</span> <span className={styles.postDetailsValue}> {postData?.setLocation ? "Enabled" : "Disabled"} </span>
                                    </div>
                                    {
                                        postData?.setLocation && <div className={styles.postDetailsHeaderItem}>
                                            <span className={styles.postDetailsValue}>{postData?.location?.state ? postData?.location?.state : "____"} , {postData?.location?.city ? postData?.location?.city : "____"}</span>
                                        </div>
                                    }
                                    <div className={styles.postDetailsHeaderItem}>

                                        <span className={styles.postDetailsKey}>Average Rating :</span> <span className={styles.postDetailsValue}>{Math.trunc(postData?.owner?.avgRating)}/10</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <PostCard postData={postData} setTheReplies={setTheReplies} />
                    </div>
                    <ReplyContainer postData={postData} isFromProfile={isFromProfile} postId={postData?._id} replies={theReplies} />
                    {/* <Comme  */}
                    <div className={styles.commentWrapper}>
                        {
                            postData?.comments?.length > 0 ? postData?.comments?.map(comment => (
                                <ContentComment data={comment} />
                            )) : <div>NO COMMENTS YET</div>
                        }

                    </div>
                    <CreateComment postId={postData?._id} />
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
                                        <span className={styles.postDetailsValue}>{postData?.location?.state ? postData?.location?.state : "____"} , {postData?.location?.city ? postData?.location?.city : "____"}</span>
                                    </div>
                                }
                                <div className={styles.postDetailsHeaderItem}>

                                    <span className={styles.postDetailsKey}>Average Rating :</span> <span className={styles.postDetailsValue}>{Math.trunc(postData?.owner?.avgRating)}/10</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <PostCard postData={postData} setTheReplies={setTheReplies} />
                    <PostAdditionalCard item={postData?.additionalInformation} />

                </div>


            </div>
        </>
    )
}

export default SinglePost