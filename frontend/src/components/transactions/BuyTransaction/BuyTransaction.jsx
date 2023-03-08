import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { setToastifyInfo } from '../../../redux/actions/otherAction'
import { changeTime } from '../../../services/changeTime'
import { createDisputesApi, updateTransactionApi } from '../../../utils/apis/transactions/transactionsApi'
import DisputeModal from '../../modal/disputePopover/DisputePopover'
import styles from "../transaction.module.css"
const BuyTransaction = ({ item, orderRef, transactionId, viewAs, startDisputePopover, setStartDisputePopover }) => {
    const locationState = useLocation().state
    const { userData } = useSelector(state => state.userReducer)
    const [transactionEditData, setTransactionEditData] = useState({})
    const [currentTransactionEdit, setCurrentTransactionEdit] = useState(null)
    const dispatch = useDispatch()
    console.log(locationState)

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
    const handleSaveTransaction = async (transaction, disputeComment) => {

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
        <>
            {
                startDisputePopover && currentTransactionEdit ? <DisputeModal
                    currentTransactionEdit={currentTransactionEdit}
                    handleSaveTransaction={handleSaveTransaction}
                    viewAs={viewAs} /> : ""
            }
            <tr ref={transactionId === item?._id ? orderRef : null} className={`${styles.tableRow} ${transactionId === item?._id ? styles.viewingTransaction : ""}`}>
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
                    <button onClick={() => handleStartTransactionSave(item)} className={styles.saveBtn}>
                        save
                    </button>
                </td>

            </tr>
        </>
    )
}

export default BuyTransaction