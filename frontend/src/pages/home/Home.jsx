import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import BannerContainer from "../../components/HomeBanner/BannerContainer"
import HomeCategory from "../../components/HomeCategory/HomeCategory"
import Navbar from "../../components/Navbar/Navbar"
import styles from "./home.module.css"
import { CalenderLayout } from "../../Layouts/Calender/Calender";
import 'react-calendar/dist/Calendar.css';

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
                        <div className={styles.home_bottom}>

                            <p className={styles.see_all}>See All</p>


                        </div>
                    </div>

                    <CalenderLayout />
                </div>
            </div>
        </>
    )
}

export default Home