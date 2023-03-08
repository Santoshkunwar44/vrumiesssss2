import { useNavigate } from "react-router-dom"
import ReactToContent from "../ReactToContent/ReactToContent"
import styles from "./VlogItem.module.css"
const VlogItem = ({ data }) => {
    const navigate = useNavigate()
    return (

        <div
            onClick={() => navigate(`?vlog=${data?._id}`)}
            className={styles.contentItem}>

            <div className={styles.content_item_left}>
                <div className={styles.image_wrappper}>
                    <img className={styles.content_img} src={data?.thumbnail_image} alt="contentImg" />
                </div>
                <div className={styles.content_details}>
                    <h5 className={styles.content_title}>{data?.title}</h5>
                    <p className={styles.content_about}>{data?.description.substring(0, 100)}</p>
                </div>
            </div>

            <div className={styles.content_other_action}>
                <div className={styles.content_secondary_details}>
                    Total comments : {data?.comments?.length}
                </div>
                <div className={styles.reaction_box}>
                    <p className={styles.ranking_text}>RANKINGS</p>
                    <div className={styles.content_action_box}>
                        {/* <div className={styles.action_box_item}>
                                <div className={styles.action_box_img_wrapper}>
                                    <img src="/icons/like.png" alt="likeImg" />
                                </div>
                                <p>{data?.likes?.length}</p>
                            </div>
                            <div className={styles.action_box_item}>
                                <div className={styles.action_box_img_wrapper}>
                                    <img src="/icons/dislike.png" alt="likeImg" />
                                </div>
                                <p>{data?.dislikes?.length}</p>
                            </div> */}
                        <ReactToContent data={data} contentType={"vlog"} mini={true} />
                    </div>

                </div>

            </div>

        </div>

    )
}

export default VlogItem