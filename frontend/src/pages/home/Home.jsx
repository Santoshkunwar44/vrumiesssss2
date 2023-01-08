import BannerContainer from "../../components/HomeBanner/BannerContainer"
import HomeCategory from "../../components/HomeCategory/HomeCategory"
import Navbar from "../../components/Navbar/Navbar"
import styles from "./home.module.css"



const Home = () => {
    return (
        <div
            className={styles.home}>

            <Navbar />
            <div className={styles.homeWrapper}>

                <div className={styles.homeLeft}>

                    <BannerContainer />
                    <HomeCategory />
                </div>

                <div className={styles.homeRight}>

                </div>
            </div>
        </div>
    )
}

export default Home