import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useUploadImages } from '../../hooks/firebase'
import instance from '../../utils/axios/axios'
import "./uploadImageprogress.css"
import { useDispatch, useSelector } from "react-redux"
import ReactLoading from 'react-loading';
import { setToastifyInfo, startRefresh } from '../../redux/actions/otherAction'
import { useNavigate } from 'react-router-dom'


const UploadImageProgress = ({ uploadData, uploadImages, urlPath, setCompleted, updateMethod, setCreatePostData, setImageFiles }) => {
    const { url, error } = useUploadImages([...uploadImages])
    const [finished, setFinished] = useState(false)
    const { userData } = useSelector((state) => state.userReducer)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (error) {
            return setCompleted()
        }
        if (url.length === [...uploadImages].length) {
            startPostData()
        }
    }, [url, error])


    const startPostData = async () => {
        try {
            if (updateMethod) {
                await instance.put(urlPath, {
                    ...uploadData,
                    profileImg: url[0]
                })
            } else {
                await instance.post(urlPath, {
                    ...uploadData,
                    postImg: url
                })
            }
            setFinished(true)
            setCompleted()
            dispatch(setToastifyInfo({
                text: "Item posted successfully",
                type: 'success',
            }))
            setImageFiles([])
            setCreatePostData((prev) => {
                return {
                    ...prev,
                    type: "Advertise",
                    VBTused: 0,
                    orderNowBtn: false,
                    inventoryCount: 1,
                    setLocation: true,
                    onlineOnly: false,
                    subCategory: "",
                    category: "",
                    location: {
                        state: null,
                        city: null,
                    }
                }
            })
            dispatch(startRefresh())
            navigate(`/profile/${userData._id}`)
        } catch (error) {
            setFinished(true)
            setCompleted()
            dispatch(setToastifyInfo({
                text: "Failed to post item",
                type: 'error',
            }))
            console.log(error)
        }

    }

    return (
        <div className="uploadImageProgress">
            <div className="uploadImageProgressBox">



                {
                    finished ? <img src="https://img.icons8.com/fluency/96/null/checked.png" alt='done' /> : <ReactLoading type={"spinningBubbles"} color={"#37e710"} height={'120px'} width={'120px'} />

                }
                <h3 className="uploadingText">UPLOADED  {`${url?.length}/${uploadImages?.length}`} PHOTOS </h3>
            </div>


        </div>
    )
}

export default UploadImageProgress