import { Box, Stack } from "@chakra-ui/react";
import { Skeleton, Typography } from "@mui/material";
import Slider from "react-slick";
import NotFound from "../notFound/NotFound";
import Post from "../post/Post";
import ReplyQuotes from "../replyQuotes/ReplyQuotes";
import styles from "./itemSlider.module.css"

const ItemSlider = ({ items, type, isLoading, sliderWidth }) => {
    console.log('the width *****', sliderWidth)

    const settings = {
        dots: true,
        infinite: false,
        nextArrow: <SamplePrevArrow />,
        prevArrow: <SampleNextArrow />,
        slidesToShow: 4,
        className: "slider_items",

        responsive: [
            { breakpoint: 350, settings: { slidesToShow: 1 } },
            { breakpoint: 500, settings: { slidesToShow: 1 } },
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 2000, settings: { slidesToShow: 3 } },

        ]

    };

    // useState 



    if (isLoading || items === null) {
        return <div className={styles.loaderBox} style={{ width: `${sliderWidth - 50}px`, height: "", position: "relative" }}>
            <Slider {...settings}>

                <Stack direction={"column"} gap={2.3} >
                    <Box>
                        <Skeleton className='dark_skeleton' variant='rectangular' height={160} width={"90%"} />
                    </Box>
                    <Box display={"flex"} flexDirection={"row"} alignItems="center" width={"90%"}>
                        <Stack sx={{ width: "90%" }}>
                            <Typography variant="body2" sx={{ width: "90%" }}>
                                <Skeleton className='dark_skeleton' variant='text' height={34} />
                            </Typography>
                            <Typography variant="body2" sx={{ width: "90%" }}>
                                <Skeleton className='dark_skeleton' variant='text' height={34} />
                            </Typography>
                        </Stack>
                    </Box>
                </Stack>
                <Stack sx={{ width: "90%" }} direction={"column"} gap={2.3} >
                    <Box>
                        <Skeleton className='dark_skeleton' variant='rectangular' height={160} width={"90%"} />
                    </Box>
                    <Box display={"flex"} flexDirection={"row"} alignItems="center" width={"90%"}>
                        <Stack sx={{ width: "90%" }}>
                            <Typography variant="body2" sx={{ width: "90%" }}>
                                <Skeleton className='dark_skeleton' variant='text' height={34} />
                            </Typography>
                            <Typography variant="body2" sx={{ width: "90%" }}>
                                <Skeleton className='dark_skeleton' variant='text' height={34} />
                            </Typography>
                        </Stack>
                    </Box>
                </Stack>
                <Stack sx={{ width: "90%" }} direction={"column"} gap={2.3} >
                    <Box>
                        <Skeleton className='dark_skeleton' variant='rectangular' height={160} width={"90%"} />
                    </Box>
                    <Box display={"flex"} flexDirection={"row"} alignItems="center" width={"90%"}>
                        <Stack sx={{ width: "90%" }}>
                            <Typography variant="body2" sx={{ width: "90%" }}>
                                <Skeleton className='dark_skeleton' variant='text' height={34} />
                            </Typography>
                            <Typography variant="body2" sx={{ width: "90%" }}>
                                <Skeleton className='dark_skeleton' variant='text' height={34} />
                            </Typography>
                        </Stack>
                    </Box>
                </Stack>




            </Slider>
        </div>
    }


    return (
        <>
            <div className={styles.sliderWrapper} style={{ width: `${sliderWidth - 50}px`, height: "", position: "relative" }}>
                <Slider {...settings}>

                    {
                        type === "reply" && items?.map((item) => <ReplyQuotes slider={true} reply={item} key={item?._id} />)
                    }
                    {
                        type === "post" && items?.map((item) => <Post slider={true} post={item} key={item?._id} />)
                    }

                    {
                        items?.length <= 0 && <NotFound img="/items/post.png" text={"No post yet !!"} />
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