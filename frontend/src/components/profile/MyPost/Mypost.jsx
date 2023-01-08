import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { getPostByUserId } from "../../../utils/apis/post/postApi"
import { getReplyQuoteByUserId } from "../../../utils/apis/reply/replyApi"
import ItemSlider from "../../itemSlider/ItemSlider"
import styles from "./mypost.module.css"

const Mypost = () => {


    const { userData } = useSelector(state => state.userReducer)
    const [myPostRequestList, setPostRequestList] = useState([])
    const [myReplyQuotesList, setReplyQuotesList] = useState([])

    useEffect(() => {
        fetchMyPostRequest()
        fetchReplyQuotesList()
    }, [userData])




    async function fetchReplyQuotesList() {
        try {
            const { data } = await getReplyQuoteByUserId(userData?._id)
            setReplyQuotesList(data.message)
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchMyPostRequest() {


        try {
            const { data } = await getPostByUserId(userData?._id)
            setPostRequestList(data.message)
        } catch (error) {

        }

    }


    return (
        <div className={styles.mypost}>

            <div className={styles.myPostItem}>

                <div className={styles.postHeaderTopic}>
                    <h2>My Post Request</h2>
                    <div className={styles.postheaderHrLine}>
                    </div>
                </div>
                <div className={styles.postItemWrapper}>
                    <ItemSlider items={myPostRequestList} />
                </div>
            </div>
            <div className={styles.myPostItem}>

                <div className={styles.postHeaderTopic}>
                    <h2>My Price Quotes</h2>
                    <div className={styles.postheaderHrLine}>
                    </div>
                </div>
                <div className={styles.postItemWrapper}>
                    <ItemSlider type="reply" items={myReplyQuotesList} />
                </div>

            </div>


        </div>
    )
}

export default Mypost