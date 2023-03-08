import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from "./UserItem.module.css"
const UserItem = ({ user }) => {


    return (
        <Link className={styles.link_item} to={`user/${user?._id}`}>
            <div className={styles.chat_user}>
                <div className={styles.profile_image_wrapper}>
                    <img className={styles.chat_user_profile_image} src={user.profileImg} alt="profileImg" />
                    <div className={` ${styles.online_dot}`}>

                    </div>
                </div>
                <div className={styles.chat_user_details}>
                    <h4 className={styles.chat_username}>  {user?.username}</h4>
                    {/* <span className={styles.chat_message}>Lorem ipsum dolor sit   lorew  </span> */}

                </div>
            </div>
        </Link>
    )
}

export default UserItem