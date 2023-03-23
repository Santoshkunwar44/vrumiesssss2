import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getShopItemOfUserByTypeApi } from "../../../utils/apis/shop/shopApi"
import AddNewItem from "./AddNewItem/AddNewItem"
import styles from "./Shop.module.css"
import ShopProducts from "./ShopProducts/ShopProducts"
import ShopServices from "./ShopServices/ShopServices"

const Shop = () => {
    const { userData } = useSelector(state => state.userReducer)
    const { refresh } = useSelector(state => state.otherReducer)

    const [activeShopTab, setActiveShopTab] = useState("products");
    const [shopItems, setShopItems] = useState(null)
    const [addNewItem, setAddNewItem] = useState(false);


    useEffect(() => {
        if (userData) {
            fetchTheShopItems()
        }
    }, [userData, activeShopTab, refresh])

    const handleTabChange = (type) => {

        setActiveShopTab(type)
        console.log(type)


    }

    useEffect(() => {
        isActiveTab()
    }, [activeShopTab])

    const isActiveTab = (type) => {
        if (type === activeShopTab) {
            return true
        } else {
            return false
        }
    }


    const fetchTheShopItems = async () => {

        try {
            const res = await getShopItemOfUserByTypeApi(userData?._id, activeShopTab)
            if (res.status === 200) {
                setShopItems(res.data.message)
            }
            throw Error(res.data.message)
        } catch (error) {
            console.log(error)
        }

    }

    const shopComponentMapping = {
        services: <ShopServices items={shopItems} />,
        products: <ShopProducts items={shopItems} />
    }
    return (
        <div className={styles.shop_wrapper}>



            <div className={`${styles.shop_tab_list} `}>
                <button className={isActiveTab("products") && styles.active_shop_tab} onClick={() => handleTabChange("products")}>
                    Products

                </button>
                <button className={isActiveTab("services") && styles.active_shop_tab} onClick={() => handleTabChange("services")}>
                    Services

                </button>
                <button onClick={() => setAddNewItem((prev) => !prev)} className={styles.new_item_button}>
                    {
                        addNewItem ? "Cancel" : "Add  Item"
                    }
                </button>

            </div>
            {
                addNewItem ? <div style={{ width: '100%' }}>

                    <AddNewItem activeItem={activeShopTab} close={() => setAddNewItem(false)} />
                </div> : ""
            }


            {
                shopComponentMapping[activeShopTab]
            }

        </div >
    )
}

export default Shop