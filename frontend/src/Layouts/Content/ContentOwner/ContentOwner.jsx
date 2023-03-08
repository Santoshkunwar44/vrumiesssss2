import { useNavigate } from "react-router-dom"
import styles from "./ContentOwner.module.css"
import moment from "moment"
const ContentOwner = ({ data }) => {

    const navigate = useNavigate()
    return (
        <div className={styles.contentOwner}>
            <div className={styles.owner_header}>
                <div className={styles.owner_img}>


                    <img src={data?.owner?.profileImg} alt="userImg" />


                </div>
                <div onClick={() => navigate(-1)} className={styles.back_text}>

                    <p>BACK</p>

                </div>

            </div>
            <div className={styles.content_item_title}>

                <h2>{data?.title} </h2>

                <div className={styles.content_owner_secondary_details}>
                    <div className={styles.content_owner_secondary_details_item} >
                        <p>{moment(data?.createdAt).format('LL')}</p>
                        <p>/</p>
                    </div>
                    <div className={styles.content_owner_secondary_details_item} >
                        <p className={styles.website_url}>   {data?.website_url ? <a href={data?.website_url} target="_blank">{data?.website_url}</a> : "no website available"} </p>
                        <p>/</p>
                    </div>
                    <div className={styles.content_owner_secondary_details_item} >
                        <p className={styles.owner_name}>{data?.owner?.username}</p>
                        <p>/</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ContentOwner