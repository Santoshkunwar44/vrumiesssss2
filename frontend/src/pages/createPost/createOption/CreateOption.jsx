import styles from "../createPost.module.css"
import AddInfoItem from "./AddInfoItem"

const CreateOption = ({ handleDelete, handleChangeAdditionalInformation, setCreatePostData, createPostData, onChangeEnableBtn, handleChangeInventory, onChangeInput }) => {
    const addNewItem = () => {



        setCreatePostData(prev => ({
            ...prev,
            additionalInformation: [...prev.additionalInformation, {
                title: "",
                details: "",
                id: prev.additionalInformation.length,
            }]

        }))
    }
    return (
        <div className={styles.createOptionBox}>
            <div className={styles.option_box_left}>

                <div className={`${styles.inventoryOptionBox} ${createPostData.VBTused < 20 ? styles.inventoryDisabled : ""}`}>
                    <div className={styles.inventoryLeftBox}>

                        <p className={styles.orderNowBtnText}>Order Now Button</p>
                        <div className={styles.catBannerBtnWrapper}>

                            <button onClick={() => onChangeEnableBtn("enable")} className={`${styles.catBtnOption} ${createPostData.orderNowBtn ? styles.activeCatOption : ""}`}> <span>Enable Button</span></button>
                            <button onClick={() => onChangeEnableBtn("disable")} className={`${styles.catBtnOption}  ${!createPostData.orderNowBtn ? styles.activeCatOption : ""} `}> <span>Disable Button</span></button>
                        </div>
                    </div>
                    <div className={styles.inventoryRightBox}>

                        <p>Max Inventory</p>
                        <div className={styles.inventoryChooseBox}>
                            <div onClick={() => handleChangeInventory("Sub")} className={styles.inventoryLeft}>
                                -
                            </div>

                            <div className={styles.inventoryMid}>
                                {createPostData.inventoryCount}
                            </div>
                            <div onClick={() => handleChangeInventory("Add")} className={styles.inventoryRight}>
                                +
                            </div>
                        </div>

                    </div>
                </div>
                <div className={styles.websiteAndpriceBox}>

                    <div className={styles.priceSettingItem}>
                        <label className={styles.label} > Price Setting:</label>
                        <div className={styles.priceSettingBox}>
                            <input onChange={onChangeInput} name="price" type="text" placeholder="Set price...    " />
                        </div>
                    </div>
                    <div className={styles.websiteUrlItem}>
                        <label className={styles.label} > Website Url:</label>
                        <div className={styles.websiteUrlBox}>
                            <input onChange={onChangeInput} name="websiteLink" type="text" placeholder="website url...    " />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.option_box_right}>

                <div className={styles.additional_information_box}>

                    <h2>Additional Information</h2>
                    <div className={styles.add_info_list}>
                        {
                            // createPostData 
                            createPostData?.additionalInformation?.map((item, index) => (

                                < AddInfoItem handleDelete={handleDelete}
                                    item={item}
                                    index={index} onChangeItem={handleChangeAdditionalInformation} key={index} />
                            ))

                        }



                    </div>
                    <div onClick={addNewItem} className={styles.create_new_info}>
                        Create New Info
                    </div>

                </div>

            </div>
        </div>
    )
}

export default CreateOption