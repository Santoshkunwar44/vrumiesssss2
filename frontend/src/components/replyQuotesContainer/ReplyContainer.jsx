import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setToastifyInfo, startRefresh } from "../../redux/actions/otherAction"
import { addMoreVBTtoPost } from "../../utils/apis/post/postApi"
import NotFound from "../notFound/NotFound"
import ReplyQuotes from "../replyQuotes/ReplyQuotes"
import styles from "./replyContainer.module.css"
const ReplyContainer = ({ replies, postId, isFromProfile, postData }) => {


    const [editVBTQuanitity, setEditVBTQuantity] = useState(0)
    const { userData } = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()

    const handleVBTQuanitityChange = (method) => {

        if (method === "add") {
            if (userData.tokenAvailabe <= editVBTQuanitity) {
                return dispatch(setToastifyInfo({
                    type: "error",
                    text: "No enought VBT"
                }))
            };
            setEditVBTQuantity((prev) => prev + 1)
        } else {
            if (editVBTQuanitity <= 0) return
            setEditVBTQuantity((prev) => prev - 1)
        }
    }


    const handleOnSubmit = async () => {

        if (editVBTQuanitity <= 0) {
            return dispatch(setToastifyInfo({
                type: "error",
                text: "VBT added cannot be 0"
            }))

        }

        try {
            await addMoreVBTtoPost(postId, {
                vbt: editVBTQuanitity,
                userId: userData?._id
            })
            dispatch(startRefresh())

            dispatch(setToastifyInfo({
                type: "success",
                text: "VBT Added successfully"
            }))
            setEditVBTQuantity(0)

        } catch (error) {
            dispatch(setToastifyInfo({
                type: "error",
                text: "Failed to add VBT"
            }))
            console.log("error while updating the post ", error)
        }

    }
    console.log(isFromProfile)
    return (
        <>
            <div className={styles.replyContainer}>
                <div className={styles.replyHeader}>
                    <div className={styles.replyHeaderLeft}>
                        <h2>Reply Quotes</h2>
                        <img src="/bottomBorder.png" alt="borderBtm" />
                    </div>
                    {
                        (isFromProfile && userData?._id === postData?.owner?._id) && <div className={styles.replyHeaderRight}>
                            <div className={styles.editText}>
                                Add more VBT's? (Balance : 40 VBT)
                            </div>
                            <div className={styles.editVBTBox}>
                                <div className={styles.VBTcountBox}>
                                    {editVBTQuanitity}
                                </div>
                                <div>
                                    VBT
                                </div>
                                <div className={styles.VBTBtns}>
                                    <img onClick={() => handleVBTQuanitityChange("add")} src="/images/create/maximize.png" alt="add" />
                                    <img onClick={() => handleVBTQuanitityChange("less")} src="/images/create/minimize.png" alt="less" />
                                </div>
                                <button onClick={handleOnSubmit} className={styles.submitBtn}>Submit</button>
                            </div>
                        </div>
                    }


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