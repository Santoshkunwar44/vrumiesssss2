import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import PaymentModal from "../../components/modal/PaymentModa"
import Navbar from "../../components/Navbar/Navbar"
import { setToastifyInfo, startRefresh } from "../../redux/actions/otherAction"
import { buyTokensApi } from "../../utils/apis/transactions/transactionsApi"
import styles from "./ordertokens.module.css"
import SelectQuantity from "./selectQuantity/SelectQuantity"
import VBTPayment from "./TokenPayment/TokenPayment"
const OrderTokens = () => {

    const [orderType, setOrderType] = useState("select")

    const handleChangeOrder = (type) => setOrderType(type)
    const { userData } = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    const [paymentResultInfo, setPaymentResultInfo] = useState("")
    const [orderTokenData, setOrderTokenData] = useState({
        VBTcount: 0,
        totalAmount: 0,

    })
    const handleChangeTokenQuantity = (method) => {
        if (method === "sum") {

            setOrderTokenData((prev) => {
                return { ...prev, VBTcount: orderTokenData.VBTcount + 1 }
            }
            )
        } else {


            if (orderTokenData.VBTcount <= 0) return

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
    return (
        <>
            <Navbar />
            <div className={styles.OrderTokens}>
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

                                            /> : <VBTPayment handleTokenDataChange={handleTokenDataChange}

                                                clearVBTInput={() => setOrderTokenData({ VBTcount: 0, totalAmount: 0 })}
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
        </>
    )
}

export default OrderTokens