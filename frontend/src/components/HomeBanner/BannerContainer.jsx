import HomeBanner from "./HomeBanner"
import styles from "./homeBanner.module.css"

const BannerContainer = () => {
    return (
        <div className={styles.bannerContainer}>
            <HomeBanner />
        </div>
    )
}

export default BannerContainer