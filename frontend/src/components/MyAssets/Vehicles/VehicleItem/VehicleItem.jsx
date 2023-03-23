import React from 'react'
import styles from "./Vehicle.module.css"
const VehicleItem = () => {
    return (
        <div className={styles.vehicle_item}>
            <div className={styles.bg_color}>

            </div>
            <div className={styles.vehicle_task_box}>

                <p className={styles.task_text}>Tasks &nbsp;:</p>
                <ul className={styles.task_list}>
                    <li>Check the engine code</li>
                    <li>Check tire pressure sensor</li>
                    <li>Fix dents on the side</li>
                    <li>Get a tune up</li>
                    <li>Get a tune up</li>
                    <li>Get a tune up</li>
                    <li>Get a tune up</li>
                    <li>Get a tune up</li>
                    <li>Get a tune up</li>
                    <li>Get a tune up</li>
                    <li>Get a tune up</li>
                    <li>Get a tune up</li>
                    <li>Get a tune up</li>
                    <li>Get a tune up</li>
                    <li>Get a tune up</li>
                </ul>
            </div>
            <div className={styles.vehicle_info}>

                <div className={styles.vehicle_info_item}>
                    <p className={styles.item_title}>Year  <span> :</span> </p>
                    <div className={styles.item_ans}>2007   </div>

                </div>
                <div className={styles.vehicle_info_item}>
                    <p className={styles.item_title}>Make  <span> :</span> </p>
                    <div className={styles.item_ans}>Ford   </div>

                </div>
                <div className={styles.vehicle_info_item}>
                    <p className={styles.item_title}>Model  <span> :</span></p>
                    <div className={styles.item_ans}>Expedition  </div>

                </div>
                <div className={styles.vehicle_info_item}>
                    <p className={styles.item_title}>   Trim  <span> :</span> </p>
                    <div className={styles.item_ans}>XLT   </div>

                </div>
                <div className={styles.vehicle_info_item}>
                    <p className={styles.item_title}>   Color  <span> :</span> </p>
                    <div className={styles.item_ans}>Beige   </div>
                </div>

            </div>
        </div>
    )
}

export default VehicleItem