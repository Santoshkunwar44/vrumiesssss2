import Slider from "react-slick";
import Post from "../post/Post";
import ReplyQuotes from "../replyQuotes/ReplyQuotes";
import styles from "./itemSlider.module.css"

const ItemSlider = ({ items, type }) => {



    console.log(items)


    const settings = {
        dots: true,
        infinite: false,
        slidesToShow: items?.length < 3 ? items?.length : 3,
        slidesToScroll: 3,
        nextArrow: <SamplePrevArrow />,
        prevArrow: <SampleNextArrow />,
        className: "center"

    };

    // useState 







    return (
        <>
            <div style={{ width: "100%", height: "", position: "relative" }}>
                <Slider {...settings}>

                    {
                        type === "reply" && items.map((item) => <ReplyQuotes reply={item} key={item?._id} />)
                    }
                    {
                        type === "post" && items.map((item) => <Post post={item} key={item?._id} />)
                    }
                    {
                        type === "postImg" && items?.map((item) => <img
                            className={styles.postImgSlider}
                            src={item} key={item} alt="postImg" />)
                    }

                </Slider>
            </div>
        </>
    )
}

export default ItemSlider

const SamplePrevArrow = ({ onClick }) => {

    return (
        <>

            <div className={`${styles.sliderArrow}  ${styles.leftArrow}`}>

                <img src="/images/profile/leftArrow.png" alt="leftArrow" onClick={onClick} />

            </div>

        </>
    )

}

const SampleNextArrow = ({ onClick }) => {

    return (
        <>
            <div className={`${styles.sliderArrow}  ${styles.rightArrow}`}>
                <img src="/images/profile/rightArrow.png" alt="rightArrow" onClick={onClick} />
            </div>


        </>
    )

}