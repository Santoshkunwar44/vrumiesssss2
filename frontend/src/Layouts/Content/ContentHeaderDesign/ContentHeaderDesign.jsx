import styles from "./ContentHeaderDesign.module.css"
const ContentHeaderDesign = ({ currentSearchContent  }) => {


    return (
        <div className={styles.content_header_design}>
            <div className={styles.content_header_body}>

                <h2>Vrumies</h2>
                <h2 className={styles.content_item_text}>{currentSearchContent ? Object.keys(currentSearchContent)[0] + "s" : null}</h2>

                <h2>Vrumies</h2>
                <h2 className={styles.content_item_text}>{currentSearchContent && Object.keys(currentSearchContent)[0] + "s"}</h2>

                <h2>Vrumies</h2>
                <h2 className={styles.content_item_text}>{currentSearchContent && Object.keys(currentSearchContent)[0] + "s"}</h2>
                <h2>Vrumies</h2>

            </div>
        </div>
    )
}

export default ContentHeaderDesign