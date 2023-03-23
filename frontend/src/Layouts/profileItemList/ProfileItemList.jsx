import React from 'react'
import ContentCard from '../Content/ContentCard/ContentCard'
import ContentSlider from '../contentSlider/ContentSlider'
import styles from "./ProfileItemList.module.css"
export const ProfileItemList = ({ name, type, data }) => {
    console.log(type, data)
    return (
        <div>
            <div className={styles.profileItem}>
                <div className={styles.profileItemTopic}>
                    <h2>{name}</h2>
                    <div className={styles.profileItemHrLine}>
                    </div>
                </div>
                <div className={styles.profileItemWrapper}>
                    {/* {
                        data?.map((content) => (
                            <ContentCard content={content} key={content?._id} />
                        ))
                    } */}
                    
                    <ContentSlider data={data} />
                </div>


            </div>
        </div>
    )
}
