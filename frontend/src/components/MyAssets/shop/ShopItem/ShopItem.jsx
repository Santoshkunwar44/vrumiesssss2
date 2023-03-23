import styles from "./ShopItem.module.css"
import { useState } from 'react'
import { useDispatch } from "react-redux"
import Collapse from '@mui/material/Collapse';
import { deleteShopItemApi } from "../../../../utils/apis/shop/shopApi";
import { startRefresh } from "../../../../redux/actions/otherAction";
const ShopItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const handleDelete = async () => {
        try {
            const res = await deleteShopItemApi(item?._id);
            if (res.status === 200) {
                dispatch(startRefresh())

            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            <div className={styles.shopItem_container} onClick={() => setIsOpen(prev => !prev)}>

                <div className={styles.shop_item} >


                    <div className={styles.shop_sub_item}>
                        <p>ITEM:</p>
                        <p>{item?.title}</p>
                    </div>
                    <div className={styles.shop_sub_item}>
                        <p>QUANTITY:</p>
                        <p>{item?.quantity}</p>
                    </div>
                    <div className={styles.shop_sub_item}>
                        <p>PRICE:</p>
                        <p>${item?.price}</p>
                    </div>




                </div>
                <div className={styles.shop_item_details}>

                    <Collapse in={isOpen} collapsedSize={0}>

                        <div className={styles.item_content}>
                            <div className={styles.item_top_content}>


                                <div className={styles.image_side}>
                                    <img draggable={"false"} src={item?.photos?.length > 0 ? item?.photos[0] : "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FzaGluZyUyMG1hY2hpbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60"} alt="shopItem" />

                                </div>
                                <div className={styles.right_content_side}>

                                    <p>Description</p>
                                    <p>{item?.description}</p>

                                </div>

                            </div>
                            <div className={styles.shop_item_buttons}>
                                <button className={styles.deleteProduct} onClick={handleDelete}>
                                    <img src="/items/trashRed.png" alt="delIcon" />    <p>  Delete Product</p>
                                </button>
                                <button className={styles.saveProduct}>
                                    Save
                                </button>

                            </div>
                        </div>
                    </Collapse>
                </div>
            </div>

        </>
    )
}

export default ShopItem