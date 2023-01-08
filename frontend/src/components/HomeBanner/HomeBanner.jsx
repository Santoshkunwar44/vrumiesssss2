import styles from "./homeBanner.module.css"
import { useSelector } from "react-redux"

const HomeBanner = () => {
    const { userData } = useSelector((state) => state.userReducer)


    return (
        <div className={styles.homeBanner}>
            <div className={styles.homeBannerWrapper}>
                <div className={styles.homeWrapperContent}>
                    <div className={styles.bannerRoundBox}>
                    </div>
                    <div className={styles.bannerRoundEclipseBig}>

                    </div>
                    <div className={styles.blurContentBox}>
                        <div className={styles.blurContentProfileDetails}>
                            <h5 className={styles.welcomeText}>Welcome to Vrumies, <span className={styles.welcomeProfileName}>{userData?.username}!</span></h5>
                            <p className={styles.welcomeSecondaryText}>Find something you need right now .</p>

                        </div>
                        <div className={styles.tiltedLines}>
                            <div className={styles.tiltedLine}>

                            </div>
                            <div className={styles.tiltedLine}>

                            </div>
                            <div className={styles.tiltedLine}>

                            </div>
                            <div className={styles.tiltedLine}>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeBanner