import styles from "./transaction.module.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { createDisputesApi, getTransactionInspectApi, updateTransactionApi } from "../../utils/apis/transactions/transactionsApi"
import { changeTime } from "../../services/changeTime"
import { useDispatch, useSelector } from "react-redux"
import { setToastifyInfo } from "../../redux/actions/otherAction"
import DisputeModal from "../modal/disputePopover/DisputePopover"
import { useRef } from "react"
import NotFound from "../notFound/NotFound"
import BuyTransaction from "./BuyTransaction/BuyTransaction"
import SellTransaction from "./sellTransaction/SellTransaction"

const Transactions = ({ transactionId }) => {

    const [viewAs, setViewAs] = useState(null)
    const [sellerTransactionList, setSellerTransactionList] = useState([])
    const [currentTransactionEdit, setCurrentTransactionEdit] = useState(null)
    const [buyerTransactionList, setBuyerTransactionList] = useState([])
    const [transactionEditData, setTransactionEditData] = useState({
    })
    const [startDisputePopover, setStartDisputePopover] = useState(false)
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.userReducer)
    const orderRef = useRef()

    console.log(transactionEditData)

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





    const handleTransactionFeedback = (name, value, transactionId) => {

        if (name === "rating") {
            value = +value
        }

        if (viewAs === "seller") {

            setTransactionEditData((prev) => {
                return {
                    ...prev,
                    sellersFeedback: {
                        ...prev.sellersFeedback,
                        [name]: value
                    }
                }
            })


        } else {
            console.log(value, name)
            setTransactionEditData((prev) => {
                return {
                    ...prev,
                    buyersFeedback: {
                        ...prev.buyersFeedback,
                        [name]: value
                    }
                }
            })
        }

    }


    useEffect(() => {
        if (!viewAs) return
        fetchTransactions()
        setTransactionEditData({})
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



    const handleSaveTransaction = async (transaction, disputeComment) => {

        console.log("the current transaction eidit", transaction)
        let neededKeys = ['rating', 'response']
        let availableKey = []
        let newObj = { ...transactionEditData }
        if (viewAs === "seller") {

            for (let key in transactionEditData?.sellersFeedback) {
                availableKey.push(key)
            }
        } else {
            for (let key in transactionEditData?.buyersFeedback) {
                availableKey.push(key)
            }
        }
        if (availableKey.length === 1) {
            let propertyToBeAccessed = neededKeys.filter(item => availableKey.every(val => item !== val))[0]

            if (viewAs === "seller") {

                newObj.sellersFeedback[propertyToBeAccessed] = transaction?.sellersFeedback[propertyToBeAccessed.toString()]
            } else {
                newObj.buyersFeedback[propertyToBeAccessed] = transaction?.buyersFeedback[propertyToBeAccessed.toString()]
            }
        } else if (availableKey.length === 0) {
            console.log("no change")
            return
        }
        try {
            await updateTransactionApi(transaction?._id, newObj)
            if (startDisputePopover) {
                await createDisputesApi({
                    userId: userData?._id,
                    userType: viewAs,
                    comment: disputeComment,
                    transactionId: transaction?._id,
                    nextUser: viewAs === "seller" ? transaction?.buyer?._id : transaction?.seller?._id
                })

            }
            dispatch(setToastifyInfo({
                text: "Trasaction updated successfully",
                type: "success"
            }))



        } catch (error) {
            dispatch(setToastifyInfo({
                text: "Error while updating Transaction",
                type: "success"
            }))
            console.log(error)
        }
    }
    const handleStartTransactionSave = (transaction) => {
        let feedBack = null
        if (viewAs === "seller") {
            feedBack = transactionEditData.sellersFeedback
        } else {
            feedBack = transactionEditData.buyersFeedback
        }
        if (feedBack?.response && feedBack?.response === "dispute") {
            setCurrentTransactionEdit(transaction)
            setStartDisputePopover(true)
        } else {
            handleSaveTransaction(transaction)
        }
    }
    return (
        <div
            className={styles.transactions}
        >
            {
                (startDisputePopover && currentTransactionEdit) ? <DisputeModal currentTransactionEdit={currentTransactionEdit} handleSaveTransaction={handleSaveTransaction} viewAs={viewAs} /> : ""
            }
            <div className={styles.transactionHeader}>

                <h2>My Transactions</h2>
                <div className={styles.transactionHeaderLine}></div>

            </div>
            <div className={styles.transactionMainContent}>

                <div className={styles.mainContentHeader}>
                    <div className={styles.contentHeaderLeft}>
                        <div>Average  Rating :  <span className={styles.greenText}>{userData?.avgRating}/ 10    </span> </div>
                        <div>Disputes : <span className={styles.greenText}>{userData?.disputes}</span></div>
                    </div>
                    <div className={styles.contentHeader}>

                        <div className={styles.catBannerBtnWrapper}>
                            <button onClick={() => setViewAs("seller")} className={`${styles.catBtnOption} ${viewAs === "seller" && styles.activeCatOption}  `}> <span>As Seller </span></button>
                            <button onClick={() => setViewAs("buyer")} className={`${styles.catBtnOption}  ${viewAs === "buyer" && styles.activeCatOption} `}> <span>As Buyer </span></button>

                        </div>
                    </div>
                    <button className={styles.editDirectDeposit}>
                        EDIT DIRECT DEPOSIT
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
                                    transactionEditData={transactionEditData}
                                    item={item}
                                    handleStartTransactionSave={handleStartTransactionSave}
                                    handleTransactionFeedback={handleTransactionFeedback}
                                    orderRef={orderRef}
                                    transactionId={transactionId}
                                />)
                            }
                            {

                                viewAs === "seller" && sellerTransactionList?.map((item) => <SellTransaction
                                    transactionEditData={transactionEditData}
                                    item={item}
                                    handleStartTransactionSave={handleStartTransactionSave}
                                    handleTransactionFeedback={handleTransactionFeedback}


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