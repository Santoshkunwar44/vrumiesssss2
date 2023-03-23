
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ContentCard from "../Content/ContentCard/ContentCard";
import "./ContentSlider.css"
const ContentSlider = ({ data }) => {
    const settings = {
        dots: true,
        infinite: false,
        slidesToShow: 3,
        className: "slider_items",



    };
    return (
        <>
            <Slider {...settings}>
                {
                    data?.map((item) => <ContentCard key={item?._id} content={item} />)
                }
            </Slider>
        </>
    )
}

export default ContentSlider