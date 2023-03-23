import React from 'react'
import ShopItem from '../ShopItem/ShopItem'


const ShopServices = ({ items }) => {
    return (
        <>

            {
                !items ? <>loading</> : items.map((item) => (
                    <ShopItem key={item?._id} item={item} />

                ))
            }
        </>


    )
}

export default ShopServices