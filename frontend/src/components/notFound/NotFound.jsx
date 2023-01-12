import styles from "./notfound.module.css"
const NotFound = ({ text, img = "/items/post.png" }) => {
    return (
        <div className={styles.notFound}>
            <div className={styles.notFoundWrapper}>
                <img width={"260px"} alt="No 
                Data Found" src={img} />
                <p>{text}</p>
            </div>
        </div>
    )
}

export default NotFound