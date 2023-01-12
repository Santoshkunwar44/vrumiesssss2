import { Modal, ModalBody, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { setToastifyInfo, startRefresh } from "../../../redux/actions/otherAction"
import { deletePost } from "../../../utils/apis/post/postApi"
import { deleteReplyQuote } from "../../../utils/apis/reply/replyApi"
import styles from "./DelModal.module.css"

const DelModal = ({ children, type, itemId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
    const handleDelete = async () => {

        try {
            if (type === "reply") {
                await deleteReplyQuote(itemId)
            } else if (type === "post") {
                await deletePost(itemId)
            }
            dispatch(setToastifyInfo({
                text: `${type} deleted successfully.`,
                type: "success"
            }))
            dispatch(startRefresh())
            onClose()

        } catch (error) {
            console.log(error)
            dispatch(setToastifyInfo({
                text: `Failed to delete ${type}.`,
                type: "error"
            }))
        }
    }


    return (
        <>
            <span onClick={onOpen}>
                {
                    children
                }
            </span>
            <Modal closeOnOverlayClick={true} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <div className={styles.modalOverlay}>
                            <div className={styles.modalbody}>
                                <img onClick={onClose} src="/order/close.png" alt="closeImg" />

                                <div className={styles.ModalDelete}>
                                    <div className={styles.ModalDeleteheader}>

                                        <h1>Are you sure you want to delete your {type} ?</h1>


                                    </div>

                                    <p>Tokens used to this {type} will be  considered used if {type} is deleted.</p>

                                    <button onClick={handleDelete} className={styles.confirmDelete}>
                                        Confirm & Delete


                                    </button>

                                </div>

                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DelModal