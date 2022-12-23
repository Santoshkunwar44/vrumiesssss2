import Catslider from "../catSlider/Catslider"
import styles from "./homecategory.module.css"


const HomeCategory = () => {





    return (
        <div className={styles.homeCategory}>

            <div className={styles.homeCatHeader}>

                <div>

                    <h3 className={styles.categoryText}>Explore Categories</h3>
                    <img src="/images/catText.png" alt="catText" />
                </div>



            </div>
            <div className={styles.cateoriesBox}>
                {/* <div className={styles.arrowWrapper}>

                    <img onClick={() => { goLeft() }} src="/images/leftArrow.png" alt="leftArrow" />
                    <img onClick={() => { goRight() }} src="/images/rightArrow.png" alt="rightArrow" />

                </div> */}
                <div className={styles.arrowWrapperSlider}>
                    <Catslider />

                </div>

            </div>


        </div >
    )
}

export default HomeCategory