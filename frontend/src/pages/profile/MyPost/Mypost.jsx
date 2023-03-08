import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ItemSlider from "../../../components/itemSlider/ItemSlider"
import { removeLoadingData, setLoadingData } from "../../../redux/actions/otherAction"
import { getPostByUserId } from "../../../utils/apis/post/postApi"
import { getReplyQuoteByUserId } from "../../../utils/apis/reply/replyApi"
import styles from "./mypost.module.css"

const Mypost = ({ itemWidth }) => {


    const { userData } = useSelector(state => state.userReducer)
    const { loading } = useSelector(state => state.otherReducer)
    const [myReplyQuotesList, setReplyQuotesList] = useState(null)
    const [myPostRequestList, setPostRequestList] = useState(null)
    const [myAdvertisePostList, setMyAdvertisePostList] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setLoadingData({
            path: "profilePost",
            isLoading: true
        }))
    }, [])
    useEffect(() => {
        fetchMyPostRequest()
        fetchReplyQuotesList()
    }, [userData])




    async function fetchReplyQuotesList() {
        try {
            const { data } = await getReplyQuoteByUserId(userData?._id)
            setReplyQuotesList(data.message)
            dispatch(removeLoadingData())
        } catch (error) {
            console.log(error)
            dispatch(removeLoadingData())
        }
    }

    async function fetchMyPostRequest() {


        try {
            const { data: { message: { postRequest, postAdvertise } } } = await getPostByUserId(userData?._id)
            setPostRequestList(postRequest)
            setMyAdvertisePostList(postAdvertise)


        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className={styles.mypost}>

            <div className={styles.myPostItem}>

                <div className={styles.postHeaderTopic}>
                    <h2>My  Post Advertisements</h2>
                    <div className={styles.postheaderHrLine}>
                    </div>
                </div>
                <div className={styles.postItemWrapper}>
                    <ItemSlider sliderWidth={itemWidth} isLoading={loading?.isLoading && loading.path === "profilePost"} type={"post"} items={myAdvertisePostList} />
                </div>
            </div>
            <div className={styles.myPostItem}>

                <div className={styles.postHeaderTopic}>
                    <h2>My Post Request</h2>
                    <div className={styles.postheaderHrLine}>
                    </div>
                </div>
                <div className={styles.postItemWrapper}>
                    <ItemSlider sliderWidth={itemWidth} isLoading={loading?.isLoading && loading.path === "profilePost"} type={"post"} items={myPostRequestList} />
                </div>
            </div>
            <div className={styles.myPostItem}>
                <div className={styles.postHeaderTopic}>
                    <h2>My Price Quotes</h2>
                    <div className={styles.postheaderHrLine}>
                    </div>
                </div>
                <div className={styles.postItemWrapper}>
                    <ItemSlider sliderWidth={itemWidth} isLoading={loading?.isLoading && loading.path === "profilePost"} type="reply" items={myReplyQuotesList} />
                </div>

            </div>


        </div>
    )
}

export default Mypost