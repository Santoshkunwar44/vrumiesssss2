import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from "./appCategory.module.css"
import { appCategoryList } from "../../utils/data/AppCategoreis"
import Navbar from '../../components/Navbar/Navbar'
import Post from '../../components/post/Post'
const AppCategory = () => {
    const catName = useParams().catName
    const [currentCatData, setCurrentCatData] = useState({})


    useEffect(() => {
        if (catName) {

            const theData = appCategoryList.find((cat) => cat.name === catName)
            if (theData) {
                setCurrentCatData(theData)
            }
        }
    }, [catName])




    return (
        <div className={styles.appCategory}>

            <Navbar />
            <div className={styles.appCategoryWrapper}>
                <div className={styles.appCategorybanner}>
                    <div className={styles.categoryBannerBgBlur}>

                    </div>
                    <div className={styles.categoryContentWrapper}>

                        <div className={styles.categoryItemLeft}>


                            <h2 className={styles.categoryTitleText}>{currentCatData?.title}</h2>

                            <div className={styles.catBannerBtnWrapperBox}>
                                {
                                    currentCatData?.btns?.map((item, index) => {
                                        return (
                                            <>
                                                <div className={styles.catBannerBtnWrapper}>

                                                    <button className={`${styles.catBtnOption} ${styles.activeCatOption}`}> <span>{item.option1}</span></button>
                                                    <button className={styles.catBtnOption}> <span>{item.option2}</span></button>
                                                </div>
                                            </>
                                        )

                                    })
                                }



                            </div>
                        </div>
                        <div className={styles.categoryIconRight}>

                            <img className={styles.catItemImg} src={currentCatData?.img} alt={currentCatData?.name} />

                        </div>
                    </div>
                </div>
                <div className={styles.appCatPostWrapper}>
                    <div className={styles.appCatPopularPostHeader}>
                        <h1 className={styles.mostPopularText}>MOST POPULAR</h1>
                        <div className={styles.appCatHeaderHrLine}></div>
                        <Link to={"/"}>
                            <div className={styles.appCatBackText}>

                                BACK

                            </div>
                        </Link>

                    </div>
                    <div className={styles.postWrappers}>


                        <Post />
                        <Post />
                        <Post />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default AppCategory