import { useEffect, useState } from "react"
import styles from "./selectQuantity.module.css"

const SelectQuantity = ({ handleChangeTokenQuantity, orderTokenData, setOrderType }) => {


    return (
        <>
            <div className={styles.startOrderBox}>
                <div className={styles.startOrderHeader}>
                    <div className={styles.startOrderheaderLeft}>
                        <div className={styles.basicOrderText}>Basic Order</div>
                        <div className={styles.selectQuantityText}>Select Quantity</div>
                    </div>
                    <div className={styles.startOrderHeaderRight}>


                        <div className={styles.orderTopSelectVbt}>
                            <img onClick={() => handleChangeTokenQuantity("less")} src="/images/order/cut.png" alt="cut" />
                            <div className={styles.vbtQuantity}>{orderTokenData.VBTcount}</div>
                            <img onClick={() => handleChangeTokenQuantity('sum')} src="/images/order/add.png" alt="addImg" />
                            <div className={styles.vbtText}>
                                VBT
                            </div>
                        </div>

                    </div>

                </div>
                <div className={styles.startOrderBottom} >
                    <div className={styles.startOrderTotalSelectedBox}>
                        <p className={styles.totalText}>Total</p>
                        <p className={styles.totalFee}>${orderTokenData.totalAmount}</p>
                    </div>
                    <button onClick={() => setOrderType("myOrder")} className={styles.orderNowBtn}>ORDER NOW</button>
                </div>

            </div>
        </>
    )
}

export default SelectQuantity