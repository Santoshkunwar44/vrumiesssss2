import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useUploadImages } from '../../hooks/firebase'
import instance from '../../utils/axios/axios'
import "./uploadImageprogress.css"
import ReactLoading from 'react-loading';


const UploadImageProgress = ({ uploadData, uploadImages, urlPath, setCompleted, updateMethod }) => {
    console.log(uploadImages)
    const { url, error } = useUploadImages([...uploadImages])
    const [finished, setFinished] = useState(true)
    useEffect(() => {
        if (error) {
            return setCompleted()
        }
        if (url.length === [...uploadImages].length) {
            startPostData()
        }
    }, [url, error])


    const startPostData = async () => {
        let response;
        try {

            if (updateMethod) {

                response = await instance.put(urlPath, {
                    ...uploadData,
                    profileImg: url[0]
                })
            } else {

                response = await instance.post(urlPath, {
                    ...uploadData,
                    postImg: url
                })
            }
            setFinished(true)
            setCompleted()
            console.log(response?.data?.message)
        } catch (error) {
            setFinished(true)
            setCompleted()
            console.log(error)
        }

    }

    return (
        <div className="uploadImageProgress">
            <div className="uploadImageProgressBox">


                {/* {
                    finished ? <h3>UPLOADED ❤</h3> : <h5> {url?.length} / {[...uploadImages].length} photos upload  </h5>
                } */}
                {
                    finished ? <img src="https://img.icons8.com/fluency/96/null/checked.png" alt='done' /> : <ReactLoading type={"spinningBubbles"} color={"#37e710"} height={'120px'} width={'120px'} />

                }
                <h3 className="uploadingText">UPLOADED  {`${url?.length}/${uploadImages?.length}`} PHOTOS </h3>
            </div>


        </div>
    )
}

export default UploadImageProgress