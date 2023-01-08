import styles from "./myorders.module.css"
const Myorders = ({ orderTokenData, setOrderType, handlePay }) => {
    return (
        <div className={styles.myOrders}>
            <div className={styles.myOrdersHeader}>

                <h2 className={styles.headerText}>Your Order</h2>

                <div className={styles.myOrderInfo}>
                    <div className={styles.orderDate}>
                        08/21/2022

                    </div>
                    <div className={styles.orderInfoQuantity}>
                        <div className={styles.orderInfoText}>
                            <img src="/token.png" alt="tokenImg" />
                            <span className={styles.keyText}>Quantity :</span>{orderTokenData.VBTcount} VBT
                        </div>
                    </div>
                    <div className={styles.orderInfoText}>
                        <span className={styles.keyText}>Total Cost :</span>
                        ${orderTokenData.totalAmount}
                    </div>
                </div>

            </div>
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
                    <div className={styles.inputGroup}>
                        <div className={styles.inputItem}>
                            <label > First Name</label>

                            <input type="text" name="" id="" />
                        </div>
                        <div className={styles.inputItem}>
                            <label > Last Name</label>

                            <input type="text" name="" id="" />
                        </div>

                    </div>
                    <div className={styles.inputGroup}>
                        <div className={styles.inputItem}>
                            <label > Card Number</label>

                            <input type="text" name="" id="" />
                        </div>


                    </div>
                    <div className={styles.inputGroup}>
                        <div className={styles.inputItem}>
                            <label > Expiration </label>

                            <input type="text" name="" id="" />
                        </div>
                        <div className={styles.inputItem}>
                            <label >CVV</label>

                            <input type="text" name="" id="" />
                        </div>
                        <div className={styles.inputItem}>
                            <label > Zip </label>

                            <input type="text" name="" id="" />
                        </div>

                    </div>
                </div>
            </div>
            <div className={styles.bankBox}>
                <img src="/images/order/bank.png" alt="bankImg" />
            </div>
            <div className={styles.myOrderBottomButtons}>
                <div onClick={() => setOrderType("select")} className={styles.backBtn}>
                    Back
                </div>
                <div onClick={() => handlePay()} className={`${styles.payBtn} ${orderTokenData.VBTcount <= 0 ? styles.disablePayBtn : ""}`}>
                    Pay
                </div>
            </div>

        </div>
    )
}

export default Myorders