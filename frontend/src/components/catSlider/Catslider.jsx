
import { useState } from "react";
import styles from "./catslider.module.css"
import Slider from "react-slick";
import CatItem from "../CategoryItem/CategoryItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllCategories } from "../../utils/apis/category/categoryApi";
import { setCategoryIndex } from "../../redux/actions/otherAction";
import { useRef } from "react";


const Catslider = () => {




    const { categorySliderIndex } = useSelector((state) => state.otherReducer)
    const [slideIndex, setSlideIndex] = useState(0)
    const [appCategoryList, setAppCategoryList] = useState([])
    const dispatch = useDispatch()







    useEffect(() => {
        dispatch(setCategoryIndex(slideIndex))
    }, [slideIndex])

    const settings = {
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        beforeChange: (current, next) => setSlideIndex(next),
        nextArrow: <SamplePrevArrow />,
        prevArrow: <SampleNextArrow />,
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