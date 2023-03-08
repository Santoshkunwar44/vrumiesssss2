import Catslider from "../catSlider/Catslider"
import styles from "./homecategory.module.css"


const HomeCategory = ({ fullWidth }) => {


    console.log("catboxwidth2", fullWidth)


    return (
        <div className={styles.homeCategory}>

            <div className={styles.homeCatHeader}>

                <div>

                    <h3 className={styles.categoryText}>Explore Categories</h3>
                    <img src="/images/catText.png" alt="catText" />
                </div>
            </div>
            <div style={{ width: "100%" }} className={styles.cateoriesBox}>

                <Catslider fullWidth={fullWidth} />


            </div>


        </div >
    )
}

export default HomeCategory