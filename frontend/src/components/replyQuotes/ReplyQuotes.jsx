import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setToastifyInfo, startRefresh } from "../../redux/actions/otherAction"
import { addMoreVBTTApi } from "../../utils/apis/reply/replyApi"
import DelModal from "../modal/delModal/DelModal"
import styles from "./replyquotes.module.css"

const ReplyQuotes = ({ reply }) => {


    const { userData } = useSelector((state) => state.userReducer)
    const [showEdit, setShowEdit] = useState(false)
    const [replyChangesData, setReplyChangesData] = useState({
        VBTused: 0
    })
    const dispatch = useDispatch()



    const handleChangeVBTused = (type) => {
        if (type === "add") {
            if (userData?.tokenAvailabe <= replyChangesData.VBTused) {
                return dispatch(setToastifyInfo({
                    text: "No enough VBT ",
                    type: "error"
                }))
            }
            setReplyChangesData((prev) => {
                return { ...prev, VBTused: replyChangesData.VBTused + 1 }
            })
        } else {

            if (replyChangesData.VBTused <= 0) return
            setReplyChangesData((prev) => {
                return { ...prev, VBTused: replyChangesData.VBTused - 1 }
            })
        }
    }

    const handleSubmitReplyChanges = async () => {

        if (replyChangesData.VBTused <= 0) {
            return dispatch(setToastifyInfo({
                text: "VBT cannot be 0 ",
                type: "error"
            }))
        }


        try {
            await addMoreVBTTApi({
                vbtUsed: replyChangesData.VBTused,
                userId: userData?._id,
                replyId: reply?._id
            })

            setReplyChangesData((prev) => {
                return { ...prev, VBTused: 0 }
            })
            dispatch(setToastifyInfo({
                text: "Reply updated successfully",
                type: "success"
            }))
            dispatch(startRefresh())
        } catch (error) {
            console.log(error)
            dispatch(setToastifyInfo({
                text: "Failed to update reply",
                type: "error"
            }))
        }

    }


    return (
        <div onClick={() => setShowEdit(!showEdit)} className={styles.replyQuotes} >

            <div className={styles.qoutesUserInfo}>
                <img src={reply?.user?.profileImg} alt="userImg" />
                <div className={styles.quotesUsername}>
                    {
                        reply?.user?.username
                    }
                </div>

            </div>
            <div className={styles.qoutesContent}>
                <div className={styles.quotesTitle}>
                    <h2> {reply?.title} </h2>


                </div>
                <div className={styles.qoutesDesc}>
                    {
                        reply?.desc
                    }
                </div>
                <div className={styles.qoutesAssets}>
                    <div className={styles.tokenBox}>
                        <p className={styles.qoutesTokenCount}> {reply?.vbtUsed}</p>
                        <img src="/token.png" alt="tokenImg" />

                    </div>
                    <div>
                        ${reply?.price}
                    </div>

                </div>
            </div>
            <div className={`${styles.replyActions}  ${showEdit && styles.showActionBtns}`}>

                <div className={styles.addMoreText}>
                    Add more VBT's ? (Balance: {userData?.tokenAvailabe} VBT)
                </div>
                <div className={styles.addLessBtns}>
                    <div className={styles.actionVbtCount}>

                        <input value={replyChangesData.VBTused} type="text" />
                        <p>VBT</p>
                    </div>
                    <div className={styles.butnImg}>

                        <img onClick={() => handleChangeVBTused("less")} src="/images/create/minimize.png" alt="less" />
                        <img onClick={() => handleChangeVBTused("add")} src="/images/create/maximize.png" alt="add" />
                    </div>
                </div>
                <div className={`${styles.replyActionBtns}`}>
                    <DelModal itemId={reply?._id} type="reply">   <button className={styles.deleteRplyBtn}>Delete Reply <img src="/items/trashRed.png" alt="trash" /></button></DelModal>
                    <button onClick={handleSubmitReplyChanges} className={styles.submitReplyChanges}>Submit</button>
                </div>

            </div>



        </div>
    )
}

export default ReplyQuotes