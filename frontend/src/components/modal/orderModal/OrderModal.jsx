import {
    Modal,
    ModalOverlay,
    ModalContent,
    useDisclosure,
    ModalBody
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setToastifyInfo } from '../../../redux/actions/otherAction'
import { addTransactionApi } from '../../../utils/apis/transactions/transactionsApi'
import { useNavigate } from "react-router-dom"
import styles from "./orderModal.module.css"
import OrderPayment from './OrderPayment'



function OrderNowModal({ children, postData }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [transactionFee, setTransactionFee] = useState(null)
    const [totalPrice, setTotalPrice] = useState()
    const { userData } = useSelector(state => state.userReducer)

    const [orderData, setOrderData] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        if (postData?._id) {
            let fee = (5 / 100) * +postData?.price
            let total = fee + (+postData?.price)
            setTransactionFee(fee)
            setTotalPrice(total)
            setOrderData((prev) => {
                return {

                    ...prev,
                    post: postData?._id,
                    seller: postData?.owner?._id,
                    buyer: userData?._id,
                    price: total
                }

            })
        }
    }, [postData])
    console.log("prices", postData.price, transactionFee, orderData.price)


    // const handleOrder = async () => {
    //     try {
    //         dispatch(setToastifyInfo({
    //             text: "Order placed successfully",
    //             type: "success"
    //         }))
    //         onClose()
    //     } catch (error) {
    //         dispatch(setToastifyInfo({
    //             text: "Failed to place order",
    //             type: "error"
    //         }))
    //         onClose()
    //         console.log(error)
    //     }
    // }
    return (
        <>
            <span style={{ display: "inline", width: "100%", textAlign: "end" }} onClick={() => userData?.username ? onOpen() : navigate("/signup")} className={`${postData?.owner?._id === userData?._id ? styles.fadeOrderBtn : ""}`}>{children}</span>
            <Modal isOpen={isOpen} closeOnOverlayClick={true} onClose={onClose}>
                <ModalOverlay className={styles.modalOverlay} />
                <ModalContent className={styles.modalContent}>
                    <ModalBody className={styles.ModalBody}>
                        <img onClick={onClose} className={styles.closeImg} src="/order/close.png" alt="closeImg" />
                        <div className={styles.orderBoxWrapper}>

                            <div className={styles.orderBoxHeader}>
                                <h2>
                                    Place Order

                                </h2>

                            </div>
                            <OrderPayment
                                transactionFee={transactionFee}
                                orderData={orderData}
                                postData={postData} totalPrice={totalPrice}
                                handleCloseModal={onClose}
                            />




                            {/* </div> */}

                        </div>


                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    )
}




export default OrderNowModal