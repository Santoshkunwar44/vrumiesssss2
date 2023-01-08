import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import "./category.css"
import MultipleValueTextInput from 'react-multivalue-text-input';
import UploadCatImg from './UploadCatImg'

const Category = () => {

    const [categoryData, setCategoryData] = useState({
        displayName: "",
        name: "",
        subCategory: "",
        img: null,
    })
    const [startUpload, setStartUpload] = useState(false)
    const imgRef = useRef()
    const handleOnChange = (e) => {
        setCategoryData((prev) => { return { ...prev, [e.target.name]: e.target.value } })

    }

    const handleChangeMultipleValue = (item, allItems) => {

        setCategoryData((prev) => { return { ...prev, subCategory: allItems } })

    }
    const handleImgChange = (e) => {
        setCategoryData((prev) => { return { ...prev, img: e.target.files[0] } })
    }
    console.log(categoryData)
    return (
        <div className="category">
            <div className="category_box">
                <h2>ADD CATEGORY</h2>
                <input type="text" placeholder="displayName" name='displayName' onChange={handleOnChange} />
                <input type="text" placeholder="name" name='name' onChange={handleOnChange} />
                <MultipleValueTextInput
                    className="category_multiple"

                    onItemAdded={handleChangeMultipleValue}

                    onItemDeleted={handleChangeMultipleValue}

                    label={"Items"}
                    placeholder="subcategory"

                />
                <div className="warnText">Press Enter after one subcategory</div>
                <input ref={imgRef} type="file" style={{ display: "none" }} onChange={handleImgChange} name="img" />
                <button onClick={() => imgRef.current.click()}>ADD IMAGE</button>
                <button onClick={() => setStartUpload(true)}>SUBMIT </button>
                {
                    startUpload && <UploadCatImg uploadData={categoryData} uploadImg={categoryData.img} />
                }
            </div>
        </div>
    )
}

export default Category