import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setToastifyInfo, startRefresh } from "../../../redux/actions/otherAction"
import { disLikeContentApi, likeContentApi } from "../../../utils/apis/content/contentApi"
import instance from "../../../utils/axios/axios"
import styles from "./ReactToContent.module.css"
const ReactToContent = ({ data, mini, contentType }) => {

    const { userData } = useSelector(state => state.userReducer)
    const [hasLiked, setHasliked] = useState(false);
    const [hasDisLiked, setHasDisliked] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        if (data?.likes?.includes(userData?._id)) {
            setHasliked(true)
        } else {
            setHasliked(false)
        }
        if (data?.dislikes?.includes(userData?._id)) {
            setHasDisliked(true)
        } else {
            setHasDisliked(false)
        }
    }, [hasLiked, hasDisLiked, userData, data])



    const handleReact = async (type) => {
        try {
            if (type === "like") {
                const res = await instance.post(`/content/react/${data?._id}?like=${userData?._id}`)
                console.log(res)
                dispatch(setToastifyInfo({
                    text: `${contentType} liked successfully.`,
                    type: "success"
                }))
            } else {
                await disLikeContentApi(data?._id, userData?._id)
                dispatch(setToastifyInfo({
                    text: `${contentType} disliked .`,
                    type: "success"
                }))
            }

            dispatch(startRefresh())


        } catch (error) {
            console.log("the error ", error)
            if (error.data.message) {
                dispatch(setToastifyInfo({
                    text: `${error.data.message}`,
                    type: "error"
                }))
            }
        }
    }


    return (
        <div className={`${styles.action_box_wrapper} ${mini && styles.mini_reaction}`}>
            <div className={`${styles.action_box_item} ${hasLiked ? styles.shineItem : ""}`}>
                <img onClick={(e) => { handleReact("like"); e.stopPropagation() }} src="/icons/like.png" alt="likeIcon" />
                <p>{data?.likes?.length}</p>
            </div>
            <div className={`${styles.action_box_item} ${hasDisLiked ? styles.shineItem : ""}`}>
                <img onClick={(e) => { handleReact("dislike"); e.stopPropagation() }} src="/icons/dislike.png" alt="likeIcon" />
                <p>{data?.dislikes?.length}</p>
            </div>
        </div>
    )
}

export default ReactToContent