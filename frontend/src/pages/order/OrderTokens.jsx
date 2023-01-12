import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import PaymentModal from "../../components/modal/PaymentModa"
import Navbar from "../../components/Navbar/Navbar"
import { setToastifyInfo, startRefresh } from "../../redux/actions/otherAction"
import { buyTokensApi } from "../../utils/apis/transactions/transactionsApi"
import Myorders from "./Myorders/Myorders"
import styles from "./ordertokens.module.css"
import SelectQuantity from "./selectQuantity/SelectQuantity"
const OrderTokens = () => {

    const [orderType, setOrderType] = useState("select")

    const handleChangeOrder = (type) => setOrderType(type)
    const { userData } = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    const [paymentResultInfo, setPaymentResultInfo] = useState("")
    const [orderTokenData, setOrderTokenData] = useState({
        VBTcount: 0,
        totalAmount: 0,
        firstName: "",
        lastName: "",
        cardNumber: "",
        expDate: "",
        cvv: "",
        zip: ""
    })
    console.log(orderTokenData)
    const handleChangeTokenQuantity = (method) => {
        if (method === "sum") {

            setOrderTokenData((prev) => {
                return { ...prev, VBTcount: orderTokenData.VBTcount + 1 }
            }
            )
        } else {
            setOrderTokenData((prev) => {
                return { ...prev, VBTcount: orderTokenData.VBTcount - 1 }
            }
            )
        }

    }

    useEffect(() => {



        setOrderTokenData((prev) => {
            return {
                ...prev, totalAmount: orderTokenData.VBTcount * 0.25
            }
        })
    }, [orderTokenData.VBTcount])


    const handleTokenDataChange = (name, value) => {

        setOrderTokenData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })


    }

    const handlePay = async () => {

        let error = null;
        console.log(orderTokenData)
        for (const [key, value] of Object.entries(orderTokenData)) {
            console.log(key)
            if (!value) {
                error = key
                console.log("inside ", key)

            }
        }
        console.log(error)
        if (error) {
            dispatch(setToastifyInfo({
                type: "error",
                text: `${error} field is missing`,
            }))
            return
        }
        try {
            await buyTokensApi({
                ...orderTokenData,
                userId: userData?._id
            })
            setPaymentResultInfo("success")
            dispatch(setToastifyInfo({
                type: "success",
                text: "Payment successful",

            }))
            setOrderTokenData((prev) => {
                return {
                    ...prev, VBTcount: 0, totalAmount: 0, firstName: "",
                    lastName: "",
                    cardNumber: "",
                    expDate: "",
                    cvv: "",
                    zip: ""
                }
            })
            setOrderType("select")
            dispatch(startRefresh())
        } catch (error) {
            setPaymentResultInfo("error")
            dispatch(setToastifyInfo({
                type: "error",
                text: "Payment Failed",
            }))
            console.log(error)
        }

    }

    return (
        <div className={styles.OrderTokens}>
            <Navbar />
            {
                paymentResultInfo ? <PaymentModal removePaymentResultInfo={() => setPaymentResultInfo("")} modalType={paymentResultInfo} /> : ""
            }
            <div className={styles.orderTokensWrapper}>
                <div className={styles.orderContentSide}>
                    <div className={styles.tokenHeaderBox}>
                        <img className={styles.orderTokensHeaderImg}
                            src="/images/order/headerText.png" alt="headerText" />
                    </div>
                    <div className={styles.orderContentWrappper}>
                        <div className={styles.orderInfoLeft} >
                            <div className={styles.orderInfoLeftWrapper}>
                                <img src="/images/order/tokenImgBig.png" alt="tokenImage" />
                                <div className={styles.mainText}>
                                    Vrumies Bump Tokens
                                </div>
                                <p className={styles.youHaveText}>You have</p>
                                <h1 className={styles.vbtCount}>{userData?.tokenAvailabe} VBT</h1>
                                <p className={styles.vbtRate}>1 VBT = $0.25</p>
                            </div>
                        </div>
                        <div className={styles.orderBoxRight}>
                            <div className={styles.orderBoxRightWrapper}>

                                <div className={styles.orderRightBoxHeader}>

                                    <button className={styles.basicOrder}>
                                        Basic Order
                                    </button>


                                </div>
                                <div className={styles.orderBox}>
                                    <div className={styles.theOrderBoxOptions}>

                                        <p className={`${orderType === "select" && styles.currentOrder} ${orderType === "myOrder" && styles.fade}`} onClick={() => handleChangeOrder("select")}>Start Order</p>
                                        <p className={`${orderType === "myOrder" && styles.currentOrder} ${orderType === "select" && styles.fade}`} onClick={() => handleChangeOrder("myOrder")}>Your Order</p>

                                    </div>

                                    {
                                        orderType === "select" ? <SelectQuantity
                                            setOrderType={setOrderType}
                                            orderTokenData={orderTokenData}
                                            handleChangeTokenQuantity={handleChangeTokenQuantity}

                                        /> : <Myorders handleTokenDataChange={handleTokenDataChange}
                                            handlePay={handlePay}
                                            orderTokenData={orderTokenData}
                                            setOrderType={setOrderType} />
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={styles.openSpace}>
                </div>
            </div>
        </div >
    )
}

export default OrderTokens