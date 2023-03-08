import { loadStripe } from "@stripe/stripe-js"
import { useEffect, useState } from "react"
import { Elements } from "@stripe/react-stripe-js"
import instance from "../../../utils/axios/axios"
import { useSelector } from "react-redux"
import VBTcheckout from "../Myorders/VbtCheckout";
import styles from "./tokenPayment.module.css"




const VBTPayment = ({ orderTokenData, clearVBTInput, setOrderType }) => {
    const [stripePromise, setStripePromise] = useState(null)
    const { userData } = useSelector((state) => state.userReducer)
    const [clientSecret, setClientSecret] = useState(null)
    useEffect(() => {
        getPublishableKey()
    }, [])

    useEffect(() => {
        if (!userData?._id) return;
        create_payment_intent()
    }, [userData?._id])

    const getPublishableKey = async () => {
        try {
            const { data } = await instance.get("/payment/config");
            let publishableKey = data.message;
            setStripePromise(loadStripe(publishableKey))
        } catch (error) {
            console.log(error)
        }

    }


    const create_payment_intent = async () => {
        try {

            const { data } = await instance.post("/payment/create-payment-intent", {
                userId: userData?._id,
                email: userData?.email,
                amount: orderTokenData?.totalAmount,
                description: `${userData?.email} bought  ${orderTokenData?.VBTcount} VBT`
            });
            setClientSecret(data.message)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div className={styles.myOrdersHeader}>

                <h2 className={styles.headerText}>Your Order</h2>


                <div className={styles.paymentHeader}>
                    <span className={styles.todayDate}>08/20/2021</span>
                    <div className={styles.paymentHeaderItem}>
                        <p className={styles.paymentHeaderItemKey}>Quanity :</p>
                        <p>{orderTokenData?.VBTcount} VBT</p>
                    </div>
                    <div className={styles.paymentHeaderItem}>
                        <p className={styles.paymentHeaderItemKey}>Total Cost :</p>
                        <p>${orderTokenData.totalAmount}</p>
                    </div>
                </div>
            </div>
            <div style={{ width: "100%", margin: "auto" }}>

                {
                    stripePromise && clientSecret && <Elements
                        stripe={stripePromise}
                        options={{ clientSecret: clientSecret, appearance: { theme: "night", labels: "floating" } }}>
                        <VBTcheckout
                            orderTokenData={orderTokenData}
                            setOrderType={setOrderType}
                            clearVBTInput={clearVBTInput}
                        />
                    </Elements>
                }
            </div>
        </>
    )
}

export default VBTPayment