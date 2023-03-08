import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useLocation, useSearchParams } from "react-router-dom"
import ContentHeaderDesign from "../../../Layouts/Content/ContentHeaderDesign/ContentHeaderDesign"
import ContentOwner from "../../../Layouts/Content/ContentOwner/ContentOwner"
import { getContentByIdApi } from "../../../utils/apis/content/contentApi"
import ContentComment from "../Comments/ContentComment"
import CreateComment from "../Comments/CreateComment/CreateComment"
import ReactToContent from "../ReactToContent/ReactToContent"
import styles from "./SingleContent.module.css"
const SingleContent = () => {

    const [currentSearchContent, setCurrentSearchContent] = useState(null)
    const { refresh } = useSelector((state) => state.otherReducer)
    const [searchParams, setSearchParams] = useSearchParams()
    const [contentType, setContentType] = useState("")
    const [currentContent, setCurrentContent] = useState(null)
    const location = useLocation()




    useEffect(() => {
        const searchQuery = location.search.split("=")[0].substring(1)
        if (searchQuery) {
            setCurrentSearchContent({ [searchQuery]: searchParams.get(searchQuery) })
            setContentType(searchQuery)
        } else {
            setCurrentSearchContent(null)
        }
    }, [searchParams])

    useEffect(() => {
        fetchCurrentItem()

    }, [currentSearchContent, refresh])


    const fetchCurrentItem = async () => {
        try {
            const res = await getContentByIdApi(currentSearchContent[contentType])
            if (res.data?.message) {

                setCurrentContent(res?.data?.message[0])

            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.SingleContent}>
            <ContentHeaderDesign contentType={contentType} currentSearchContent={currentSearchContent} />
            <ContentOwner data={currentContent} />
            <SingleContentItem data={currentContent} contentType={contentType} />
        </div>
    )
}

export default SingleContent


const SingleContentItem = ({ contentType, data }) => {
    const { userData } = useSelector((state) => state.userReducer);
    const videoRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoError, setVideoError] = useState(false)

    const handlePlayVideo = () => {
        videoRef.current.play()
        setIsPlaying(true)

    };

    const handlePauseVideo = () => {
        setIsPlaying(false)
    }

    const handleVideoError = () => {
        setVideoError(true)
        console.log("   ERROR WHILE PLAYING THE VIDEO ************")
    }

    return <>
        <div className={styles.singleContent_item}>
            {
                contentType === "vlog" && <div className={styles.vlog_video}>

                    {
                        (!isPlaying) && <>
                            <img className={styles.playVdoIcon} src="/icons/playVideo.png" alt="playIcon" onClick={handlePlayVideo} />
                            <img alt="video_thumbnail" src={data?.thumbnail_image} className={styles.video_thumbnail} />      </>
                    }
                    {
                        videoError ? <img src="https://images.pexels.com/photos/4439425/pexels-photo-4439425.jpeg?auto=compress&cs=tinysrgb&w=400" alt="VideoErrorImg" className={styles.video_thumbnail} /> : <video onError={handleVideoError} onPause={handlePauseVideo} onEnded={handlePauseVideo} ref={videoRef} draggable="false" src={data?.video_url} controls ></video>
                    }

                </div>
            }
            {
                contentType === "blog" && <div className={styles.vlog_video}>
                    <img draggable={"false"} className={styles.thumbnail_image} src={data?.thumbnail_image} alt="drivingPicture" />
                </div>
            }


            <div className={styles.single_content_description}>
                {
                    data?.description
                }

            </div>
            <div className={styles.commentWrappper}>
                {
                    !data?.comments ? <div>
                        loading
                    </div> : data?.comments?.length > 0 ? data?.comments.map((comment) => <ContentComment key={comment?._id} data={comment} />) : <div>NO COMMENTS YET</div>
                }


            </div>
            <CreateComment contentId={data?._id} />

            <div className={styles.single_content_item_other_action_box}>
                <ReactToContent contentType={contentType} data={data} />
            </div>
            <div className={styles.single_content_item_secondary_action}>
                <button>
                    <p>comments </p>
                </button>
                <button>
                    <img src="/icons/share.png" alt="shareIcon" />
                    <p>Share</p>
                </button>
                <Link className={`${data?.owner?._id === userData?._id && styles.disable_message_btn}`} to={`/chat/user/${data?.owner?._id}`}>
                    <button>
                        <img src="/icons/mail.png" alt="shareIcon" />
                        <p>Message User</p>
                    </button>
                </Link>
            </div>
        </div>

    </>

}