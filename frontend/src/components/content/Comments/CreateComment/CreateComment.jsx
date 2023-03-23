import styles from "./CreateComment.module.css"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import { useState } from "react"
import { addContentCommentApi } from "../../../../utils/apis/content/contentApi"
import { setToastifyInfo, startRefresh } from "../../../../redux/actions/otherAction"
import { addCommentToPost } from "../../../../utils/apis/post/postApi"
const CreateComment = ({ contentId, postId }) => {
    const { userData } = useSelector((state) => state.userReducer)
    const [commentInput, setCommentInput] = useState("");
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    console.log(postId)
    const handleSubmit = async () => {

        setLoading(true)
        let res;
        try {
            if (contentId) {

                res = await addContentCommentApi(contentId, {

                    text: commentInput,
                    userId: userData?._id
                })
            } else {
                res = await addCommentToPost(postId, {

                    text: commentInput,
                    userId: userData?._id
                })
            }
            if (res.status === 200) {

                setLoading(false)
                setCommentInput("")
                dispatch(setToastifyInfo({
                    text: "Your comment has been added",
                    type: "success"
                }))
                dispatch(startRefresh())
            } else {

                dispatch(setToastifyInfo({
                    text: res.data?.message,
                    type: "error"
                }))
            }
            console.log(res)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }





    }


    return (
        <div className={styles.create_comment}>
            <div className={styles.comment_header}>

                <div className={styles.header_profile_details}>
                    <img src={userData?.profileImg} alt="commentUserIMg" />

                    <p className={styles.comment_username}>{userData?.username}</p>


                </div>

                <div className={styles.comment_time}>
                    {moment(Date.now()).format('LL')}
                </div>

            </div>
            <div className={styles.create_comment_input}>

                <textarea value={commentInput} onChange={(e) => setCommentInput(e.target.value
                )} id="" cols="30" rows="4" placeholder="write your comment here or edit previos comment"></textarea>
                <button className={commentInput?.length > 0 ? styles.readyBtn : ""} onClick={handleSubmit}>{loading ? "SUBMITING" : "COMMENT"}</button>

            </div>
        </div>
    )
}

export default CreateComment