import Navbar from "../../components/Navbar/Navbar"
import ReplyContainer from "../../components/replyQuotesContainer/ReplyContainer"
import styles from "./singlePost.module.css"

import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { getPostById } from "../../utils/apis/post/postApi"
import { useState } from "react"
import { getReplyByPost } from "../../utils/apis/reply/replyApi"
import { useSelector } from "react-redux"
import ItemSlider from "../../components/itemSlider/ItemSlider"
import PostCard from "../../components/postCard/PostCard"


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
                            <ItemSlider type={"postImg"} items={postData?.postImg} />



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
                                        <span className={styles.postDetailsValue}>{postData?.location?.state ? postData?.location?.state : "____"} , {postData?.location?.city ? postData?.location?.city : "____"}</span>
                                    </div>
                                }
                                <div className={styles.postDetailsHeaderItem}>

                                    <span className={styles.postDetailsKey}>Average Rating :</span> <span className={styles.postDetailsValue}>{postData?.owner?.avgRating}/10</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <PostCard postData={postData} setTheReplies={setTheReplies} />

                </div>

            </div>
        </>
    )
}

export default SinglePost