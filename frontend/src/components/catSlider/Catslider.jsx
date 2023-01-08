
import { useState } from "react";
import styles from "./catslider.module.css"
import Slider from "react-slick";
import CatItem from "../CategoryItem/CategoryItem";
import { useEffect } from "react";
import { getAllCategories } from "../../utils/apis/category/categoryApi";


const Catslider = () => {





    const [slideIndex, setSlideIndex] = useState(0)
    const [appCategoryList, setAppCategoryList] = useState([])

    const settings = {
        dots: true,
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        autoplaySpeed: 1000,
        slidesToScroll: 1,
        beforeChange: (current, next) => setSlideIndex(next),
        nextArrow: <SamplePrevArrow />,
        prevArrow: <SampleNextArrow />,
        className: "center"



    };

    // useState 

    useEffect(() => {


        fetchCategoriess()

    }, [])


    const fetchCategoriess = async () => {


        try {


            const { data } = await getAllCategories()
            console.log(data)
            setAppCategoryList(data.message)


        } catch (error) {
            console.log(error)
        }

    }






    return (
        <>
            <div style={{ width: "100%", height: "", position: "relative" }}>
                <Slider {...settings}>
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