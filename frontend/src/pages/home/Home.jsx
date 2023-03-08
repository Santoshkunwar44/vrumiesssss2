import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import BannerContainer from "../../components/HomeBanner/BannerContainer"
import HomeCategory from "../../components/HomeCategory/HomeCategory"
import Navbar from "../../components/Navbar/Navbar"
import styles from "./home.module.css"



const Home = () => {

    const [categorySideWidth, setCategorySideWidth] = useState()
    const catBoxRef = useRef()

    useEffect(() => {
        if (!catBoxRef?.current) return;
        setCategorySideWidth(catBoxRef.current?.getBoundingClientRect()?.width)
        window.addEventListener("resize", () => {
            setCategorySideWidth(catBoxRef.current?.getBoundingClientRect()?.width)
        })
        return () => {
            window.removeEventListener("resize", null)
        }
    }, [])


    return (
        <>
            <Navbar />
            <div
                className={styles.home}>
                <div className={styles.homeWrapper}>
                    <div ref={catBoxRef} className={styles.homeLeft}>
                        <BannerContainer />
                        <HomeCategory fullWidth={categorySideWidth} />
                    </div>

                    <div className={styles.homeRight}>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Home