import styles from "./notfound.module.css"
const NotFound = ({ text, img = "https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/66/null/external-page-not-found-shopping-and-retail-smashingstocks-flat-smashing-stocks.png" }) => {
    return (
        <div className={styles.notFound}>
            <div className={styles.notFoundWrapper}>
                <img width={"360px"} alt="No 
                Data Found" src={img} />
                <p>{text}</p>
            </div>
        </div>
    )
}

export default NotFound