import { loadStripe } from "@stripe/stripe-js"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Elements } from "@stripe/react-stripe-js"
import instance from "../../../utils/axios/axios"
import OrderCheckout from "./OrderCheckout"

const OrderPayment = ({ postData, totalPrice, orderData, transactionFee, handleCloseModal }) => {
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
                amount: totalPrice,
                description: `${userData?.email} orderd ${postData.title}   item.`
            });
            setClientSecret(data.message)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {
                stripePromise && clientSecret && <Elements
                    stripe={stripePromise}
                    options={{
                        clientSecret: clientSecret,
                        appearance: {
                            theme: "night",
                            labels: "floating"
                        }
                    }}>
                    <OrderCheckout
                        handleCloseModal={handleCloseModal}
                        fee={transactionFee}
                        postData={postData}
                        orderData={orderData}
                    />
                </Elements>
            }
        </>
    )
}

export default OrderPayment