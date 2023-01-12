import {
    Modal,
    ModalOverlay,
    ModalContent,
    useDisclosure,
    ModalBody
} from '@chakra-ui/react'
import { useEffect } from 'react'
import styles from "./disputePopover.module.css"
import { useSelector } from "react-redux"
import { useRef } from 'react'



function DisputeModal({ viewAs, handleSaveTransaction, currentTransactionEdit }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { userData } = useSelector((state) => state.userReducer)
    const commentRef = useRef()

    useEffect(() => {
        onOpen()
    }, [])



    return (
        <>
            <Modal isOpen={isOpen} closeOnOverlayClick={true} onClose={onClose}>
                <ModalOverlay className={styles.modalOverlay} />
                <ModalContent className={styles.modalContent}>
                    <ModalBody className={styles.ModalBody}>
                        <img onClick={onClose} className={styles.closeImg} src="/order/close.png" alt="closeImg" width={"45px"} />
                        <div>
                            <h2 className={styles.disputeHeaderText}>Dispute</h2>


                        </div>
                        <div className={styles.disputeContentWrapper}>
                            <img className={styles.profileImg} src={userData.profileImg} alt="profileImg" />

                            <div className={styles.disputeMainContentBox}>

                                <p className={styles.customerSupportText}>In addition contact support at  itsOkey@gmail.com</p>
                                <textarea ref={commentRef} placeholder='place your comment here' cols="30" rows="6"></textarea>
                                <p className={styles.minimumTextAllowed}>maximum characters allowed : 350</p>
                                <div className={styles.disputesBottomBtns}>
                                    <div className={styles.catBannerBtnWrapper}>
                                        <button className={`${styles.catBtnOption}   ${viewAs === "seller" ? styles.activeCatOption : ""}  `}> <span>As Seller </span></button>
                                        <button className={`${styles.catBtnOption}  ${viewAs === "buyer" ? styles.activeCatOption : ""} `}> <span>As Buyer </span></button>

                                    </div>
                                    <button onClick={() => { handleSaveTransaction(currentTransactionEdit, commentRef.current.value); onClose() }} className={styles.submitDisputeBtn}>
                                        SUBMIT
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




export default DisputeModal