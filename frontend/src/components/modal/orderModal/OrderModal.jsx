import {
    Modal,
    ModalOverlay,
    ModalContent,
    useDisclosure,
    ModalBody
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { addTransactionApi } from '../../../utils/apis/transactions/transactionsApi'
import styles from "./orderModal.module.css"



function OrderNowModal({ children, postData }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [transactionFee, setTransactionFee] = useState(null)
    const [totalPrice, setTotalPrice] = useState()
    const { userData } = useSelector(state => state.userReducer)

    const [orderData, setOrderData] = useState({

    })


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


    const handleOrder = async () => {
        try {
            const { data } = await addTransactionApi(orderData)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <span style={{ display: "inline", width: "100%", textAlign: "end" }} onClick={onOpen}>{children}</span>
            <Modal isOpen={isOpen} closeOnOverlayClick={true} onClose={onClose}>
                <ModalOverlay className={styles.modalOverlay} />
                <ModalContent className={styles.modalContent}>
                    <ModalBody className={styles.ModalBody}>
                        <img className={styles.closeImg} src="/order/close.png" alt="closeImg" />
                        <div className={styles.orderBoxWrapper}>

                            <div className={styles.orderBoxHeader}>
                                <h2>
                                    Place Order

                                </h2>

                            </div>
                            <div className={styles.orderBoxContent}>
                                <div className={styles.orderBoxRowBox}>

                                    <div className={styles.orderItemRowItem}>

                                        Payment Info

                                    </div>
                                    <div className={styles.orderItemRowItem}>

                                        Inventory Remaining : {postData?.inventoryCount}

                                    </div>

                                </div>
                                <div className={styles.orderBoxRowBox}>

                                    <input type="text" placeholder='first name' name="" id="" className={styles.orderItemRowItem} />
                                    <input type="text" placeholder='last name' name="" id="" className={styles.orderItemRowItem} />

                                </div>
                                <div className={styles.orderBoxRowBox}>

                                    <input type="text" name="" id="" placeholder='address' className={styles.orderItemRowItem} />

                                </div>
                                <div className={styles.orderBoxRowBox}>

                                    <input style={{ width: "55px" }} type="text" placeholder='city' name="" id="" className={styles.orderItemRowItem} />
                                    <input style={{ width: "55px" }} type="text" placeholder='state' name="" id="" className={styles.orderItemRowItem} />
                                    <input type="text" placeholder='Zip code' name="" id="" className={styles.orderItemRowItem} />

                                </div>
                                <div className={styles.orderBoxRowBox}>

                                    <input type="text" placeholder='card number' name="" id="" className={styles.orderItemRowItem} />

                                </div>
                                <div className={styles.orderBoxRowBox}>

                                    <input type="text" placeholder='CVV' name="" id="" className={styles.orderItemRowItem} />
                                    <input type="text" placeholder='EXPIRED DATE' name="" id="" className={styles.orderItemRowItem} />

                                </div>
                                <div className={styles.orderBottomBox}>


                                    <div className={styles.orderBottomInfo}>
                                        <div>
                                            Item : ${postData?.price}
                                        </div>
                                        <div>

                                            Transaction Fee : ${transactionFee}
                                        </div>
                                        <div>
                                            Total : ${totalPrice}
                                        </div>
                                    </div>
                                    <button onClick={handleOrder} className={styles.orderNowBtnPost}>
                                        ORDER NOW
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




export default OrderNowModal