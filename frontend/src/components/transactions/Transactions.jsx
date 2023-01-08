import styles from "./transaction.module.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { getTransactionInspectApi, updateTransactionApi } from "../../utils/apis/transactions/transactionsApi"
import { changeTime } from "../../services/changeTime"
import { useDispatch, useSelector } from "react-redux"
import { setToastifyInfo } from "../../redux/actions/otherAction"

const Transactions = () => {

    const [viewAs, setViewAs] = useState("seller")
    const [sellerTransactionList, setSellerTransactionList] = useState([])
    const [buyerTransactionList, setBuyerTransactionList] = useState([])
    const [transactionEditData, setTransactionEditData] = useState({

    })
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.userReducer)





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


    const handleSaveTransaction = async (transaction) => {

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
            const { data } = await updateTransactionApi(transaction?._id, newObj)
            dispatch(setToastifyInfo({
                text: "Trasaction updated successfully",
                type: "success"
            }))
            console.log(data)
        } catch (error) {
            dispatch(setToastifyInfo({
                text: "Error while updating Transaction",
                type: "success"
            }))
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
                        <div>Average  Rating :  <span className={styles.greenText}>{userData?.avgRating}/ {userData?.ratings?.length}</span> </div>
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
                                viewAs === "seller" ? sellerTransactionList?.map((item) => (
                                    <tr className={styles.tableRow}>
                                        <td>
                                            {item.buyer?.username}
                                        </td>
                                        <td>
                                            {changeTime(item?.createdAt)}
                                        </td>
                                        <td>
                                            ${item.price}
                                        </td>
                                        <td>
                                            {item.buyersFeedback?.response}
                                        </td>

                                        <td>
                                            <Link to={`/post/${item?.post}`}>
                                                <button className={styles.postLinkBtn}>

                                                    post link
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className={styles.transactionBtn}>

                                                <select onChange={(e) => handleTransactionFeedback("rating", e.target.value)} className={styles.transactionStatusSelection} value={

                                                    transactionEditData?.sellersFeedback?.rating ? transactionEditData?.sellersFeedback?.rating : item?.sellersFeedback?.rating
                                                }  >
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                </select>

                                            </button>
                                        </td>
                                        <td>
                                            <button className={styles.transactionBtn}>
                                                <select onChange={(e) => handleTransactionFeedback("response", e.target.value)} className={styles.transactionStatusSelection} value={transactionEditData?.sellersFeedback?.response ? transactionEditData?.sellersFeedback?.response : item?.sellersFeedback?.response} >
                                                    <option value="in progress">in progress</option>
                                                    <option value="dispute">disputes</option>
                                                    <option value="completed">completed</option>
                                                </select>

                                            </button>
                                        </td>
                                        <td >
                                            <button onClick={() => handleSaveTransaction(item)} className={styles.saveBtn}>
                                                save
                                            </button>
                                        </td>

                                    </tr>
                                )) : buyerTransactionList?.map((item) => (


                                    <tr className={styles.tableRow}>
                                        <td>
                                            {item.seller?.username}
                                        </td>
                                        <td>
                                            {changeTime(item?.createdAt)}
                                        </td>
                                        <td>
                                            ${item.price}
                                        </td>
                                        <td>
                                            {item.sellersFeedback?.response}
                                        </td>

                                        <td>
                                            <Link to={`/post/${item?.post}`}>
                                                <button className={styles.postLinkBtn}>

                                                    post link
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className={styles.transactionBtn}>
                                                <select onChange={(e) => handleTransactionFeedback("rating", e.target.value)} className={styles.transactionStatusSelection} value={

                                                    transactionEditData?.buyersFeedback?.rating ? transactionEditData?.buyersFeedback?.rating : item?.buyersFeedback?.rating
                                                }  >
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                </select>

                                            </button>
                                        </td>
                                        <td>
                                            <button className={styles.transactionBtn}>
                                                <select onChange={
                                                    (e) => handleTransactionFeedback("response", e.target.value)} className={styles.transactionStatusSelection} value={
                                                        transactionEditData?.buyersFeedback?.response ? transactionEditData?.buyersFeedback?.response : item?.buyersFeedback?.response

                                                    } >
                                                    <option value="in progress">in progress</option>
                                                    <option value="dispute">disputes</option>
                                                    <option value="completed">completed</option>
                                                </select>

                                            </button>
                                        </td>
                                        <td >
                                            <button onClick={() => handleSaveTransaction(item)} className={styles.saveBtn}>

                                                save
                                            </button>
                                        </td>

                                    </tr>


                                ))
                            }
                        </tbody>
                    </table>

                </div>


            </div>



        </div>
    )
}

export default Transactions