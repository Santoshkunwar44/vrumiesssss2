import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure
} from '@chakra-ui/react'
import { useEffect } from 'react'
import styles from "./modal.module.css"

function PaymentModal({ modalType = "error", removePaymentResultInfo }) {
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

                        {modalType === "success" ? <SuccessModalContent handleGoBack={() => { onClose(); removePaymentResultInfo() }} /> : <ErrorModalContent handleGoBack={() => onClose()} />}
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    )
}
export default PaymentModal

const SuccessModalContent = ({ handleGoBack }) => {
    return (
        <>
            <img width={"150px"} src="/images/order/markDone.png" alt="doneImg" />
            <div className={styles.paymentResultText}>Payment Successfullly done.</div>
            <div onClick={() => handleGoBack()} className={styles.goToOrderPage}>
                Back To Order
            </div>


        </>
    )
}
const ErrorModalContent = ({ handleGoBack }) => {
    return (
        <>
            <img width={"150px"} src="/images/order/markError.png" alt="errorImg" />
            <div className={styles.paymentResultErrroText}>Payment has  failed .</div>
            <div onClick={() => handleGoBack()} className={styles.goToOrderPage}>
                Back To Order

            </div>


        </>
    )
}