import ShopItem from "../ShopItem/ShopItem"
import styles from "./ShopProducts.module.css"



const ShopProducts = ({ items }) => {





    return (
        <div className={styles.shop_products}>
            {
                !items ? <>loading</> : items.map(item => (

                    <ShopItem item={item} key={item?._id} />
                ))
            }


        </div>
    )
}

export default ShopProducts