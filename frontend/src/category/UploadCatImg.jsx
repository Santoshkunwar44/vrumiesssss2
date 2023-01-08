
import React from 'react'
import { useEffect } from 'react'
import { useUploadImages } from '../hooks/firebase'
import { createCategory } from '../utils/apis/category/categoryApi'

const UploadCatImg = ({
    uploadData, uploadImg
}) => {
    const { url } = useUploadImages([uploadImg])


    useEffect(() => {
        console.log(url[0]?.url)
        if (url[0]?.url) {
            postCategoryFunction(url[0]?.url)
        }

    }, [url])


    const postCategoryFunction = async (img) => {


        if (img) {
            const { data } = await createCategory({ ...uploadData, img })
            console.log(data)

        }
    }




    return (
        <div>UploadCatImg</div>
    )
}

export default UploadCatImg