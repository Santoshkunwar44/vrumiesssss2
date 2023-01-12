import React from 'react'
import { Link } from 'react-router-dom'
import { changeTime } from '../../../services/changeTime'
import styles from "../transaction.module.css"
const BuyTransaction = ({ item, handleTransactionFeedback, handleStartTransactionSave, transactionEditData, orderRef, transactionId }) => {
    return (
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
    )
}

export default BuyTransaction