import { Collapse } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import UploadDocsLayout from '../../../../Layouts/upload/UploadDocsLayout';
import { startRefresh } from '../../../../redux/actions/otherAction';
import { addNewShopItemApi } from '../../../../utils/apis/shop/shopApi';
import styles from "./AddNewItem.module.css"
const AddNewItem = React.memo(({ close, activeItem }) => {


    const { userData } = useSelector((state) => state.userReducer)
    const [newShopItemState, setNewShopItemState] = useState({ shopType: activeItem, owner: userData?._id, quantity: 0, price: 0 })
    const inputFileRef = useRef();
    const [startUpload, setStartUpload] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        setNewShopItemState((prev) => ({ shopType: activeItem, owner: userData?._id, quantity: 0, price: 0 }))
    }, [activeItem])



    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        if (name === "photos") {
            return setNewShopItemState(prev => ({ ...prev, [name]: e.target.files }))
        }


        setNewShopItemState((prev) => ({
            ...prev, [name]: value
        }))

    }


    const handleNumberInputChange = (e) => {
        let value = +e.target.value;
        console.log(value)
        if (value < 0) {
            console.log("invalied ")
            return
        };
        console.log("valid")
        setNewShopItemState(prev => ({
            ...prev, [e.target.name]: +e.target.value
        }))
    }

    const handleSubmit = async (url) => {
        let reqBody = {
            ...newShopItemState, photos: url
        }
        // api request 
        console.log("submintting", reqBody)
        try {
            const res = await addNewShopItemApi(reqBody)
            if (res.status === 200) {
                setNewShopItemState((prev) => ({ shopType: activeItem, owner: userData?._id, quantity: 0, price: 0 }));
                dispatch(startRefresh())
                close()
            } else {
                throw Error(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleStartUpload = () => {
        if (!newShopItemState.photos || !newShopItemState.photos?.length > 0) {
            console.log("No photos found")
        } else {
            setStartUpload(true);
        }
    }

    return (
        <>
            {

                startUpload && <UploadDocsLayout isDocs={false} docs={newShopItemState.photos} cb={handleSubmit} closeUploadDocsUi={() => setStartUpload(false)} />
            }
            <div className={styles.new_shop_item} >
                <div className={styles.shop_sub_item}>
                    <p>ITEM:</p>
                    <input onChange={handleChange} type="text" name="title" placeholder='Add name' />
                </div>
                <div className={styles.shop_sub_item}>
                    <p>QUANTITY:</p>
                    <input value={newShopItemState.quantity} onChange={handleNumberInputChange} type="number" name="quantity" placeholder='Add Quantity' />
                </div>
                <div className={styles.shop_sub_item}>
                    <p>PRICE:</p>
                    <input value={newShopItemState.price} onChange={handleNumberInputChange} type="number" name="price" placeholder='select price' />
                </div>




            </div>
            <div className={styles.new_shop_item_details}>

                <Collapse in={true} collapsedSize={0}>

                    <div className={styles.item_content}>
                        <div className={styles.item_top_content}>


                            <div className={styles.image_side}>
                                <div className={styles.image_box_wrapper}>

                                    <img onClick={() => inputFileRef.current.click()} draggable={"false"} src="/icons/gallary.png" alt="gallaryIcon" />

                                    <div className={styles.image_content}>
                                        <p>Add New Photo</p>
                                        <p>Delete Photo</p>
                                    </div>
                                    <input style={{ display: "none" }} multiple ref={inputFileRef} type="file" name="photos" onChange={handleChange} />
                                </div>
                            </div>
                            <div className={styles.right_content_wrapper}>


                                <div className={styles.right_content_side}>

                                    <p>Description</p>
                                    <input onChange={handleChange} type="text" name="description" placeholder='Type your description of service here... ' />

                                </div>
                                <div className={styles.new_shop_item_buttons}>
                                    <button className={styles.deleteProduct} onClick={close}>
                                        <img src="/items/trashRed.png" alt="delIcon" />    <p>  Cancel</p>
                                    </button>
                                    <button className={styles.saveProduct} onClick={handleStartUpload}>
                                        Save
                                    </button>

                                </div>
                            </div>
                        </div>

                    </div>
                </Collapse>
            </div>
        </>
    )
})

export default AddNewItem