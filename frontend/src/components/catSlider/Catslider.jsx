
import { useState } from "react";
import styles from "./catslider.module.css"
import Slider from "react-slick";
import CatItem from "../CategoryItem/CategoryItem";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { getAllCategories } from "../../utils/apis/category/categoryApi";
import Catskeleton from "../skeleton/catSkeleton/Catskeleton";


const Catslider = ({ fullWidth }) => {




    const [slideIndex, setSlideIndex] = useState(0)
    const [appCategoryList, setAppCategoryList] = useState([])



    useEffect(() => {
        setSlideIndex(0)
    }, [])

    const handleslideChange = (index) => {
        console.log("inside")
        setSlideIndex(index)
    }




    const settings = {
        beforeChange: (current, next) => handleslideChange(next),
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        className: "center",
        responsive: [
            { breakpoint: 350, settings: { slidesToShow: 1 } },
            { breakpoint: 600, settings: { slidesToShow: 1 } },
            { breakpoint: 1200, settings: { slidesToShow: 3 } },
            { breakpoint: 2000, settings: { slidesToShow: 3 } },

        ]
    };

    // useState 

    useEffect(() => {
        fetchCategoriess()
    }, [])


    const fetchCategoriess = async () => {
        try {
            const { data } = await getAllCategories()
            setAppCategoryList(data.message)
        } catch (error) {
            console.log(error)
        }

    }


    const catSkeletionsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    console.log(slideIndex)

    return (
        <>
            <div style={{ width: `${fullWidth - 100}px`, height: "", position: "relative" }}>
                <Slider {...settings}>
                    {
                        appCategoryList.length <= 0 ? catSkeletionsArr.map((item, index) => < Catskeleton currentFocus={slideIndex === index} />
                        ) : ""
                    }
                    {
                        appCategoryList.map((item, index) => (
                            <CatItem key={index} catItem={item} currentFocus={slideIndex === index} />
                        ))
                    }
                </Slider>
            </div>
        </>
    )
}

export default Catslider

const SamplePrevArrow = ({ onClick }) => {



    return (
        <>

            <div className={`${styles.catArrows}  ${styles.leftArrow}`}>

                <img src="/images/leftArrow.png" alt="leftArrow" onClick={onClick} />

            </div>

        </>
    )

}

const SampleNextArrow = ({ onClick }) => {


    return (
        <>
            <div className={`${styles.catArrows}  ${styles.rightArrow}`}>


                <img src="/images/rightArrow.png" alt="rightArrow" onClick={onClick} />
            </div>


        </>
    )

}




