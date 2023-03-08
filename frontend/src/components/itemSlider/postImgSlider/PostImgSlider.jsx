import React from "react";
import "./imageslider.css"
import Slider from "react-slick";
import { useWindowResize } from "../../../hooks/useWindowResize";
import { useState } from "react";
import { useEffect } from "react";

export const PostImgSlider = ({ items, postImgwidth }) => {

    const { innerWidth } = useWindowResize();
    const [sliderSettings, setSliderSettings] = useState({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,

    })

    useEffect(() => {
        if (innerWidth < 480) {
            setSliderSettings((prev) => {

                return { ...prev, slidesToShow: 2, slidesToScroll: 2 }

            })
        } else {
            setSliderSettings((prev) => {

                return { ...prev, slidesToShow: 3, slidesToScroll: 3 }

            })
        }
    }, [innerWidth])




    if (items.length < 3) {
        return <div className="normal_imgBox">

            {
                items.map((photo) => {
                    return <div className="normal_image_item">

                        <img src={photo} alt="postImg" />

                    </div>
                })
            }
        </div>
    }



    return (
        <>
            <div className="imageBox" style={{ width: `${postImgwidth - 25}px` }}>
                <Slider {...sliderSettings}>

                    {
                        items.map((photo) => {
                            return <div key={photo} className="postImgItem">
                                <img src={photo} alt="postImg" />
                            </div>
                        })
                    }




                </Slider>
            </div>
        </>
    )
}
const SamplePrevArrow = ({ onClick }) => {

    return (
        <>

            <div className={"catArrows leftArrow"}>

                <img src="/images/profile/leftArrow.png" alt="leftArrow" onClick={onClick} />

            </div>

        </>
    )

}

const SampleNextArrow = ({ onClick }) => {


    return (
        <>
            <div className={"catArrows rightArrow"} >


                <img src="/images/profile/rightArrow.png" alt="rightArrow" onClick={onClick} />
            </div>


        </>
    )

}