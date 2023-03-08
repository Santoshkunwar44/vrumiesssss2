import React, { useEffect } from 'react'
import { useUploadImages } from '../../../hooks/useUploadImage'

const ImageUploader = ({ imagesArr, cb, setStartUploadImage, setImagesArr }) => {
    const { url, error } = useUploadImages(imagesArr)

    useEffect(() => {
        console.log(url)
        if (imagesArr.length === url.length) {
            cb(url)
            setStartUploadImage(false);
            setImagesArr(null)
        }
    }, [url])

    return (
        <span></span>
    )
}

export default ImageUploader