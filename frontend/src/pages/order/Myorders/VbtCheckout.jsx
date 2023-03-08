import styles from "./myorders.module.css"
import { useStripe, useElements } from "@stripe/react-stripe-js"
import { PaymentElement } from "@stripe/react-stripe-js"
import { useState } from "react"
import PaymentModal from "../../../components/modal/PaymentModa"
import { buyTokensApi } from "../../../utils/apis/transactions/transactionsApi"
import { useDispatch, useSelector } from "react-redux"
import { startRefresh } from "../../../redux/actions/otherAction"
const VBTcheckout = ({ orderTokenData, setOrderType, clearVBTInput }) => {
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
                    await buyTokensApi({
                        VBTcount: orderTokenData?.VBTcount,
                        userId: userData?._id
                    })
                    setSuccess(true)
                    clearVBTInput()
                    dispatch(startRefresh())

                } catch (error) {
                    setError(error.message)
                }
            } else {
                setError(error.message)
            }

            setProcessing(false)
        } catch (error) {
            setError(error.message)
            setProcessing(false)
        }
    }
    return (
        <>
            {
                error && <PaymentModal modalType={"error"} />
            }
            {
                success && <PaymentModal setOrderType={setOrderType} modalType={"success"} />
            }
            <div className={styles.myOrders}>

                <div className={styles.myOrdersMainBox}>

                    <div className={styles.myOrderCardHeaderDesign}>

                        <div className={styles.hrLine}>

                        </div>
                        <div className={styles.designTextMyorder}>
                            Card Info
                        </div>

                        <div className={styles.hrLine}>

                        </div>

                    </div>
                    <div className={styles.myOrderInputBox}>
                        <PaymentElement theme={"night"} />

                    </div>
                </div>
                <div className={styles.bankBox}>
                    <img src="/images/order/bank.png" alt="bankImg" />
                </div>
                <div className={styles.myOrderBottomButtons}>
                    <div onClick={() => setOrderType("select")} className={styles.backBtn}>
                        Back
                    </div>
                    <div onClick={() => handleSubmit()} className={`${styles.payBtn} ${orderTokenData?.VBTcount <= 0 ? styles.disablePayBtn : ""}`}>
                        {processing ? "Processing" : "Pay"}
                    </div>
                </div>

            </div>
        </>
    )
}

export default VBTcheckout

