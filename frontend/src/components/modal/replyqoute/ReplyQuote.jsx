import styles from "./replyQuoteModa.module.css"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    useDisclosure,
    ModalBody
} from '@chakra-ui/react'
import { useState } from "react"
import { addReply } from "../../../utils/apis/reply/replyApi"
import { useDispatch, useSelector } from "react-redux"
import { setToastifyInfo, startRefresh } from "../../../redux/actions/otherAction"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function ReplyQuoteModal({ children, postId, handleSetReply, postData }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { userData } = useSelector(state => state.userReducer)
    const disptach = useDispatch()
    const navigate = useNavigate()

    const [replyQuoteData, setReplyQuoteData] = useState({
        title: "",
        desc: "",
        price: "",
        vbtUsed: 0,
        post: postId,
        user: userData?._id

    })

    useEffect(() => {
        if (!postId) return
        setReplyQuoteData((prev) => {
            return { ...prev, post: postId }
        })
    }, [postId])



    const handleChangeInputs = (events) => {

        let value = events.target.value;
        if (events.target.name === "price") {
            value = parseInt(value)

        }
        setReplyQuoteData((prev) => { return { ...prev, [events.target.name]: value } })
    }

    const changeVBt = (type) => {
        console.log(userData.tokenAvailabe)
        if (type === "add") {
            if (!userData?.tokenAvailabe) return disptach(setToastifyInfo({
                text: "No enough tokens ",
                type: "error"
            }))
            if (userData?.tokenAvailabe <= replyQuoteData.vbtUsed) {
                return disptach(setToastifyInfo({
                    text: "No enough tokens available",
                    type: "error"
                }))
            }
            setReplyQuoteData((prev) => {
                return { ...prev, vbtUsed: prev.vbtUsed + 1 }
            })
        } else {
            if (replyQuoteData.vbtUsed <= 0) return
            setReplyQuoteData((prev) => {
                return { ...prev, vbtUsed: prev.vbtUsed - 1 }
            })
        }
    }




    const handlePostReply = async () => {
        if (!replyQuoteData.title || !replyQuoteData.desc || !replyQuoteData.price) {
            return disptach(setToastifyInfo({
                text: "Fill all required fields",
                type: "error"
            }))
        }

        if (replyQuoteData.vbtUsed < 4) {
            disptach(setToastifyInfo({
                text: "Required minimum 4 VBT",
                type: "error"
            }))
            return
        }

        try {
            await addReply(replyQuoteData)
            disptach(setToastifyInfo({
                text: "Replied to the post",
                type: "success"
            }))
            disptach(startRefresh())
            onClose()
        } catch (error) {
            disptach(setToastifyInfo({
                text: "Error while replying",
                type: "error"
            }))
            console.log(error)

        }

    }

    return (
        <>
            <span onClick={() => userData?.username ? onOpen() : navigate("/signup")} className={`${postData?.owner?._id === userData?._id ? styles.fadeReplyBtn : ""}`}>{children}</span>
            <Modal isOpen={isOpen} closeOnOverlayClick={true} onClose={onClose}>
                <ModalOverlay className={styles.modalOverlay} />
                <ModalContent className={styles.modalContent}>
                    <ModalBody className={styles.ModalBody}>
                        <div className={styles.replayModal}>
                            <div className={styles.replyContainer}>

                                <h2>Create Reply with Quote</h2>
                                <input onChange={handleChangeInputs} placeholder="Title" name="title" className={styles.replyQuoteTitleInput} type="text" />
                                <textarea onChange={handleChangeInputs} placeholder="Description on post" className={styles.replyQuoteDescInput} name="desc" id="" cols="30" rows="10"></textarea>
                                <div className={styles.replyQuoteBottomcontent}>

                                    <div className={styles.replayQuoteVBTFilterBox}>
                                        <p>how many  VBT you want to use ?</p>
                                        <div className={styles.replyQuoteVBTBtns}>
                                            <img onClick={() => changeVBt("less")} src="/images/create/minimize.png" alt="minimizeImg" />
                                            <div className={styles.vbtQuantity}>
                                                {replyQuoteData.vbtUsed}
                                            </div>
                                            <img onClick={() => changeVBt("add")} src="/images/create/maximize.png" alt="maximize" />
                                            <p>VBT</p>
                                        </div>
                                    </div>
                                    <div className={styles.replyQuoteText}>
                                        <p className={styles.priceSettingText}>Price Setting</p>
                                        <div className={styles.replyQuoteInfoBox}>
                                            <div className={styles.infotextWithToken}>
                                                <img src="/token.png" alt="tokenImg" />
                                                <span>4 VBT required to  post</span>
                                            </div>
                                            <span className={styles.totalBalance}>Total Balance : {userData?.tokenAvailabe} VBT's</span>

                                        </div>
                                    </div>
                                    <div className={styles.replyQuoteButtonRow}>

                                        <input onChange={handleChangeInputs} name="price" type="text" className={styles.setPrice} placeholder="set price.." />
                                        <button onClick={onClose} className={styles.cancelBtn}>
                                            CANCEL

                                        </button>

                                        <button onClick={handlePostReply} className={styles.postBtn}>
                                            POST
                                        </button>

                                    </div>

                                </div>


                            </div>
                        </div>
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    )
}




export default ReplyQuoteModal