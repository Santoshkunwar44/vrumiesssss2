import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ProfileItemList } from '../../../Layouts/profileItemList/ProfileItemList'
import { getAllContentOfUserApi } from '../../../utils/apis/content/contentApi'

const Contents = () => {

    const { userData } = useSelector((state) => state.userReducer)
    const [contentData, setContentData] = useState(null)
    useEffect(() => {
        if (!userData?._id) return
        fetchAllContentOfUser()
    }, [])
    console.log(contentData)
    const fetchAllContentOfUser = async () => {

        try {
            const res = await getAllContentOfUserApi(userData?._id)
            if (res.status == 200) {
                setContentData(res.data.message)
            } else {
                throw Error(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <ProfileItemList name={"My Blogs"} type={"blog"} data={contentData ? contentData.blog : null} />
            <ProfileItemList name={"My Vlogs"} type={"vlog"} data={contentData ? contentData.vlog : null} />
            <ProfileItemList name={"My Forums"} type={"forum"} data={contentData ? contentData.forum : null} />

        </div>
    )
}

export default Contents