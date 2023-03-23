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
import { getPostByUserId } from "../../../utils/apis/post/postApi"

function ReplyQuoteModal({ children, postId, handleSetReply, postData }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { userData } = useSelector(state => state.userReducer)
    const [myPosts, setMyposts] = useState([])
    const [allPost, setAllPost] = useState([])
    const disptach = useDispatch()
    const navigate = useNavigate();
    const [attachPostType, setAttachPostType] = useState("request");


    const [replyQuoteData, setReplyQuoteData] = useState({
        title: "",
        desc: "",
        price: "",
        vbtUsed: 0,
        post: postId,
        user: userData?._id,
        attachedPost: "",
        hasPostAttachment: false,
    })

    useEffect(() => {
        if (!userData?._id) return;
        getMyPost()
    }, [userData])
    useEffect(() => {
        if (!postId) return
        setReplyQuoteData((prev) => {
            return { ...prev, post: postId }
        })
    }, [postId])
    useEffect(() => {
        console.log(allPost, attachPostType)
        setMyposts(allPost.filter(post => post.type.toLowerCase() === attachPostType))
    }, [attachPostType])

    const handlePostAttachment = (payload) => setReplyQuoteData(prev => ({ ...prev, hasPostAttachment: payload }))

    useEffect(() => {
        if (!replyQuoteData.hasPostAttachment) {
            setReplyQuoteData((prev) => ({
                ...prev,
                attachedPost: ""
            }));

        }
    }, [replyQuoteData.hasPostAttachment])


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
        if (!replyQuoteData.hasPostAttachment) {
            delete replyQuoteData.attachedPost;
        }
        delete replyQuoteData.hasPostAttachment;

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

    const getMyPost = async () => {

        try {
            const res = await getPostByUserId(userData?._id, true)
            if (res.status === 200) {
                let postObj = res.data?.message;
                if (attachPostType === "request") {
                    setMyposts([...postObj?.postRequest])
                    let allPost = [...postObj?.postRequest, ...postObj?.postAdvertise]
                    setAllPost(allPost)
                    console.log(allPost)


                } else {
                    setMyposts([...postObj?.postAdvertise])
                }
            } else {
                throw Error(res.data?.message)
            }
        } catch (error) {
            console.log(error)
        }

    }
    console.log(replyQuoteData)
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
                                <div className={styles.replyQuoteBottom}>

                                    <div className={styles.attach_post}>

                                        <h5 className={styles.attach_post_text}>Attach Post</h5>
                                        <div className={styles.attach_item}>
                                            <h5 className={styles.attach_item_title}>Type</h5>
                                            <div className={styles.toggle_option_wrapper}>
                                                <button className={`${replyQuoteData.hasPostAttachment ? styles.active_wrapper_option_button : ""}`} onClick={() => handlePostAttachment(true)}>
                                                    Enable Post Link
                                                </button>
                                                <button className={`${!replyQuoteData.hasPostAttachment ? styles.active_wrapper_option_button : ""}`} onClick={() => handlePostAttachment(false)}>
                                                    Disable Post Link
                                                </button>
                                            </div>
                                        </div>
                                        <div className={`${styles.attach_item} ${replyQuoteData.hasPostAttachment ? "" : styles.fade_up}`}>
                                            <h5 className={styles.attach_item_title}>Type</h5>
                                            <div className={`${styles.toggle_option_wrapper}`}>
                                                <button onClick={() => setAttachPostType("advertise")} className={` ${attachPostType === "advertise" ? styles.active_wrapper_option_button : ""}`}>
                                                    Advertise
                                                </button>
                                                <button onClick={() => setAttachPostType("request")} className={` ${attachPostType === "request" ? styles.active_wrapper_option_button : ""}`}>
                                                    Request
                                                </button>
                                            </div>

                                        </div>
                                        <div className={`${styles.attach_item} ${replyQuoteData.hasPostAttachment ? "" : styles.fade_up}`}>
                                            <h5 className={styles.attach_item_title}>My Posts</h5>
                                            <select onChange={handleChangeInputs} className={`${styles.post_attach_select}`} name="attachedPost" id="">
                                                <option value="#" selected disabled={true}>select post---</option>
                                                {
                                                    myPosts?.map(post => (
                                                        <option key={post?._id} value={post?._id}>   {post?.title} </option>

                                                    ))
                                                }

                                            </select>

                                        </div>
                                    </div>
                                    <div className={styles.bottom_right_box}>

                                        <div className={styles.bottom_right_top_left}>
                                            <div className={styles.upperBox_price_setting}>
                                                <h3 className={styles.priceSettingText}>Price Setting</h3>
                                                <input onChange={handleChangeInputs} name="price" type="text" className={styles.setPrice} placeholder="set price.." />

                                            </div>
                                            <div className={styles.bottom_right_top_right}>
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

                                                    <div className={styles.replyQuoteInfoBox}>
                                                        <div className={styles.infotextWithToken}>
                                                            <img src="/token.png" alt="tokenImg" />
                                                            <p>4 VBT required to  post</p>
                                                        </div>
                                                        <p className={styles.totalBalance}>Total Balance : {userData?.tokenAvailabe} VBT's</p>

                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                        <div className={styles.bottom_right_bottom}>


                                            <button onClick={handlePostReply} className={styles.postBtn}>
                                                POST
                                            </button>
                                            <button onClick={onClose} className={styles.cancelBtn}>
                                                CANCEL

                                            </button>
                                        </div>
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