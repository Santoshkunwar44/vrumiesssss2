
import styles from "./PostAdditionalCard.module.css"
import PostInfoItem from "./PostInfoItem/PostInfoItem"

const PostAdditionalCard = ({ item }) => {
    return (
        <div className={styles.PostAdditionalCardWrapper}>
            <h2>Additional Information</h2>
            <div className={styles.add_post_item}>
                {
                    item.map((item, index) => (
                        <PostInfoItem item={item} key={index} />
                    ))
                }
            </div>

        </div>
    )
}

export default PostAdditionalCard