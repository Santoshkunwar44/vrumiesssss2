import VehicleItem from "./VehicleItem/VehicleItem"
import styles from "./Vehicles.module.css"

const Vehicles = () => {
    return (
        <div className={styles.vehicles_wrapper}>
            <div className={styles.vehicles_header}>

                <h2>My Vehicles</h2>

                <div className={styles.hrLine}></div>

            </div>

            <button className={styles.add_another_vehicle}>
                <div className={styles.bg_button}>

                </div>
                <img src="/icons/add_green.png" alt="addIcon" />
                <p>
                    ADD ANOTHER VEHICLE
                </p>
            </button>
            <div className={styles.vehicles_list_box}>
                <VehicleItem />
                <VehicleItem />
                <VehicleItem />
                <VehicleItem />
                <VehicleItem />
                <VehicleItem />
            </div>
        </div>
    )
}

export default Vehicles