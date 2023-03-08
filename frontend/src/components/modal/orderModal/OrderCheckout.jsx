import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setToastifyInfo, startRefresh } from '../../../redux/actions/otherAction'
import { addTransactionApi } from '../../../utils/apis/transactions/transactionsApi'
import styles from "./orderModal.module.css"

const OrderCheckout = ({ orderData, postData, fee, handleCloseModal }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [processing, setProcessing] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const dispatch = useDispatch()
    const { userData } = useSelector((state) => state.userReducer)

    const handleSubmit = async () => {
        if (!stripe || !elements) return

        setProcessing(true)
        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `http://localhost:3000/completion`
                },
                redirect: "if_required"
            })
            if (!error) {
                try {
                    // add transaction / order
                    await addTransactionApi(orderData)
                    setSuccess(true)
                    dispatch(startRefresh())
                    dispatch(setToastifyInfo({
                        text: "Order placed successfully",
                        type: "success"
                    }))
                    handleCloseModal()
                } catch (error) {
                    dispatch(setToastifyInfo({
                        text: "Failed to place order",
                        type: "error"
                    }))
                    setError(error.message)
                    dispatch(setToastifyInfo({
                        text: "Failed to place order",
                        type: "error"
                    }))
                }
            } else {
                setError(error.message)
            }

            setProcessing(false)
        } catch (error) {
            dispatch(setToastifyInfo({
                text: "Failed to place order",
                type: "error"
            }))
            setError(error.message)
            setProcessing(false)
        }
    }
    return (
        <div className={styles.orderPaymentElement} style={{ width: "100%", display: 'flex', flexDirection: "column", gap: "2rem" }}>
            {
                <PaymentElement theme={"night"} />
            }

            <div className={styles.orderBottomBox}>
                <div className={styles.orderBottomInfo}>
                    <div>
                        <span>  Price : </span> <span>
                            ${postData?.price}      </span>
                    </div>
                    <div>
                        <span>Charge : </span>
                        <span>${fee}</span>
                    </div>
                    <div>
                        <span>Total : </span>
                        <span>${orderData.price}</span>
                    </div>
                </div>
                <button onClick={handleSubmit} className={styles.orderNowBtnPost}>
                    ORDER NOW
                </button>
            </div>
        </div>
    )
}

export default OrderCheckout