import styles from "./transaction.module.css"
import { useState } from "react"
import { useEffect } from "react"
import { createDisputesApi, getTransactionInspectApi, updateTransactionApi } from "../../utils/apis/transactions/transactionsApi"
import { useDispatch, useSelector } from "react-redux"
import { setToastifyInfo } from "../../redux/actions/otherAction"
import DisputeModal from "../modal/disputePopover/DisputePopover"
import { useRef } from "react"
import BuyTransaction from "./BuyTransaction/BuyTransaction"
import SellTransaction from "./sellTransaction/SellTransaction"



const Transactions = ({ transactionId }) => {
    const [viewAs, setViewAs] = useState(null)
    const [sellerTransactionList, setSellerTransactionList] = useState([])
    const [buyerTransactionList, setBuyerTransactionList] = useState([])
    const [startDisputePopover, setStartDisputePopover] = useState(false)
    const { userData } = useSelector(state => state.userReducer)
    const orderRef = useRef()


    useEffect(() => {
        if (transactionId) {
            setViewAs("buyer")
        } else {
            setViewAs("seller")
        }
    }, [transactionId])


    useEffect(() => {
        if (!orderRef) return
        orderRef?.current?.scrollIntoView({ behavior: "smooth" })
    }, [buyerTransactionList])


    //  set the transaction data to the object 







    useEffect(() => {
        if (!viewAs) return
        fetchTransactions()
    }, [viewAs])


    const fetchTransactions = async () => {
        try {
            const { data } = await getTransactionInspectApi(viewAs, userData?._id)
            if (viewAs === "seller") {
                setSellerTransactionList(data.message)

            } else {
                setBuyerTransactionList(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div
            className={styles.transactions}
        >

            <div className={styles.transactionHeader}>

                <h2>My Transactions</h2>
                <div className={styles.transactionHeaderLine}></div>

            </div>
            <div className={styles.transactionMainContent}>

                <div className={styles.mainContentHeader}>
                    <div className={styles.contentHeaderLeft}>
                        <div> Avg Rating :  <span className={styles.greenText}>{userData?.avgRating}/ 10    </span> </div>
                        <div>Disputes : <span className={styles.greenText}>{userData?.disputes}</span></div>
                    </div>
                    <div className={styles.contentHeader}>

                        <div className={styles.catBannerBtnWrapper}>
                            <button onClick={() => setViewAs("seller")} className={`${styles.catBtnOption} ${viewAs === "seller" && styles.activeCatOption}  `}> <span>As Seller </span></button>
                            <button onClick={() => setViewAs("buyer")} className={`${styles.catBtnOption}  ${viewAs === "buyer" && styles.activeCatOption} `}> <span>As Buyer </span></button>

                        </div>
                    </div>
                    <button className={styles.editDirectDeposit}>
                        DEPOSIT DETAILS
                    </button>

                </div>
                <div className={styles.transactionListBox}>

                    <table className={styles.transactionTable}>
                        <thead className={styles.tableHead}>

                            <th>
                                User
                            </th>

                            <th>
                                Date
                            </th>

                            <th>
                                Amount
                            </th>

                            <th>
                                Status
                            </th>
                            <th>
                                Post
                            </th>
                            <th>
                                Rating
                            </th>
                            <th>
                                Response
                            </th>
                            <th>
                                Save
                            </th>


                        </thead>
                        <tbody>
                            {
                                viewAs === "buyer" && buyerTransactionList?.map((item) => <BuyTransaction
                                    item={item}
                                    orderRef={orderRef}
                                    viewAs={viewAs}
                                    setStartDisputePopover={setStartDisputePopover}
                                    startDisputePopover={startDisputePopover}
                                    transactionId={transactionId}
                                />)
                            }
                            {
                                viewAs === "seller" && sellerTransactionList?.map((item) => <SellTransaction
                                    startDisputePopover={startDisputePopover}
                                    setStartDisputePopover={setStartDisputePopover}
                                    item={item}
                                    viewAs={viewAs}

                                />)
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </div >
    )
}

export default Transactions