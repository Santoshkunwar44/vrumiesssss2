import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure
} from '@chakra-ui/react'
import { useEffect } from 'react'
import styles from "./modal.module.css"

function PaymentModal({ modalType = "error", setOrderType }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    useEffect(() => {
        onOpen()
    }, [])

    return (
        <>
            <Modal isOpen={isOpen} closeOnOverlayClick={true} onClose={onClose} >
                <ModalOverlay className={styles.modalOverlay} />
                <ModalContent className={styles.modalContent}>
                    <ModalBody className={styles.modalBody}>
                        {modalType === "success" ?
                            <SuccessModalContent setOrderType={() => setOrderType("select")} handleGoBack={() => { onClose() }} />
                            : <ErrorModalContent handleGoBack={() => onClose()} />}
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    )
}
export default PaymentModal

const SuccessModalContent = ({ handleGoBack, setOrderType }) => {
    return (
        <>
            <img className={styles.paymentImg} width={"150px"} src="/images/order/markDone.png" alt="doneImg" />
            <div className={styles.paymentResultText}>Payment Successfull .</div>
            <div onClick={() => { handleGoBack(); setOrderType() }} className={styles.goToOrderPage}>
                Back To Order
            </div>


        </>
    )
}
const ErrorModalContent = ({ handleGoBack, setOrderType }) => {
    return (
        <>
            <img className={styles.paymentImg} width={"150px"} src="/images/order/markError.png" alt="errorImg" />
            <div className={styles.paymentResultErrroText}>Payment   failed .</div>
            <div onClick={() => { handleGoBack() }} className={styles.goToOrderPage}>
                Back To Order
            </div>


        </>
    )
}