import { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Mypost from '../../components/profile/MyPost/Mypost'
import Transactions from '../../components/transactions/Transactions'
import styles from './profile.module.css'
import { useEffect } from "react"
import { getUserById, updateUser } from '../../utils/apis/user/userApi'
import { useParams } from 'react-router-dom'
import { useRef } from 'react'
import UploadImageProgress from '../../components/uploadImage/UploadImageProgress'
import { useDispatch } from 'react-redux'
import { setToastifyInfo, startRefresh } from '../../redux/actions/otherAction'
import { useLocation } from 'react-router-dom'

const Profile = () => {

    const [currentInspect, setCurrentInspect] = useState("myPost")
    const [currentUser, setCurrentUser] = useState({})
    const [editMode, setEditMode] = useState(false)
    const [nameEdit, setNameEdit] = useState(false)
    const [userObjData, setUserObjData] = useState({})
    const userId = useParams().userId
    const [profileFile, setProfileFile] = useState([])
    const [uploadImageStart, setUploadImageStart] = useState(false)
    const [uploadImageCompleted, setUploadImageCompleted] = useState(false)
    const [viewTransaction, setViewTransaction] = useState(null)
    const editableDivRef = useRef()
    const nameRef = useRef()
    const imageRef = useRef()
    const dispatch = useDispatch()


    const locationState = useLocation().state
    useEffect(() => {
        if (locationState) {
            const { transactionId } = locationState
            setViewTransaction(transactionId)
        }
        console.log()
    }, [locationState])



    useEffect(() => {
        if (viewTransaction) {
            setCurrentInspect("myTransactions")

        }
    }, [viewTransaction])

    const newInputRef = useRef()
    useEffect(() => {


        if (editMode && currentUser?.about) {

            editableDivRef.current.focus()

        } else if (editMode && !currentUser?.about) {
            setTimeout(() => {
                newInputRef.current.focus()
            }, 0);
        }

    }, [editMode, currentUser])


    useEffect(() => {
        if (nameEdit) {
            nameRef.current.focus()
        }
    }, [nameEdit])

    useEffect(() => {


        if (!userId) return
        fetchCurrentuser()


    }, [userId])


    const fetchCurrentuser = async () => {
        try {
            const { data } = await getUserById(userId)
            setCurrentUser(data.message)

        } catch (error) {
            console.log(error)
        }


    }

    const handleUpdateUser = async () => {
        if (editMode && currentUser?.about) {
            setUserObjData((prev) => {
                return { ...prev, about: editableDivRef.current.innerText }
            })
            setEditMode(false)
        } else if (editMode) {
            setUserObjData((prev) => {
                return { ...prev, about: newInputRef.current.value }
            })
            setEditMode(false)
        } else if (nameEdit) {
            setUserObjData((prev) => {
                return { ...prev, username: nameRef.current.innerText }
            })
            setNameEdit(false)
        }

    }

    useEffect(() => {

        postUserUpdatedData()
    }, [userObjData])



    useEffect(() => {
        if (profileFile?.length === 0) return
        setUploadImageStart(true)
    }, [profileFile])


    useEffect(() => {
        if (uploadImageCompleted) {
            fetchCurrentuser()
            dispatch(setToastifyInfo({
                text: "Profile Image uploaded successfully",
                type: "success"
            }))
            dispatch(startRefresh())
            setUploadImageCompleted(false)
        }
    }, [uploadImageCompleted])

    const postUserUpdatedData = async () => {

        if (Object.keys(userObjData).length === 0) return

        try {
            await updateUser(userId, userObjData)
            dispatch(setToastifyInfo({
                text: "profile updated successfully",
                type: "success"
            }))
            fetchCurrentuser()
        } catch (error) {
            dispatch(setToastifyInfo({
                text: "Error while updating profile",
                type: "error"
            }))
        }
    }
    return (
        <div className={styles.profile}>
            <Navbar />
            {uploadImageStart ? <UploadImageProgress uploadImages={[...profileFile]} uploadData={userObjData} setCompleted={() => { setUploadImageStart(false); setUploadImageCompleted(true) }} updateMethod={true} urlPath={`/user/${userId}`} /> : ""}
            <div className={styles.profileWrapper}>
                <div className={styles.profileInfoLeft}>
                    <img className={styles.profileMark} src="/images/profilemark.png" alt="profileMark" />
                    <div className={styles.profileMainInfo}>
                        <div onClick={() => imageRef.current.click()} className={styles.imageWrapper}>
                            <img className={styles.profileImage} src={currentUser?.profileImg} alt="profileImage" />
                            <div className={styles.imageBg}>
                                <img src="/images/profileCamera.png" alt="profileCamera" />
                                <input multiple style={{ display: "none" }} onChange={(e) => setProfileFile([e.target.files[0]])} type="file" name="profileImg" id="" ref={imageRef} />

                            </div>
                        </div>

                        <div className={styles.profileNameInfo}>
                            {
                                nameEdit ? <img alt='doneImg' className={styles.pencilEdit} onClick={() => handleUpdateUser()} src="https://img.icons8.com/emoji/48/null/check-mark-emoji.png" /> : <img onClick={() => setNameEdit(true)} className={styles.pencilEdit} src="/images/pencil.png" alt="pencilEdit" />
                            }

                            <p ref={nameRef} contentEditable={nameEdit} className={styles.profileUsername}> {currentUser?.username} </p>
                            <p className={styles.profileEmail}>{currentUser?.email}</p>

                        </div>



                    </div>
                    <div className={styles.profileUserDescription}>
                        <div className={styles.profileDescHeader}>

                            <p className={styles.aboutText}>About Me</p>
                            {
                                editMode ? <p onClick={() => handleUpdateUser()} className={styles.editText}>Save</p> :
                                    <p onClick={() => setEditMode(true)} className={styles.editText}>Edit</p>

                            }
                        </div>

                        <div className={styles.profileAboutText}>
                            {
                                currentUser?.about ? editMode ? <div contentEditable ref={editableDivRef} > {currentUser?.about} </div> : currentUser?.about : editMode ? <textarea ref={newInputRef} rows={"10"} className={styles.editInput} placeholder='start typing...' ></textarea> : <span className={styles.typeText}>Type about  yourself here...</span>
                            }
                        </div>

                    </div>

                </div>
                <div className={styles.profileRight}>
                    <div className={styles.profileRightTop}>
                        <div className={styles.profileRightTopIitems}>

                            <div onClick={() => setCurrentInspect("myPost")} className={`${styles.profileTopItem}  ${currentInspect === "myPost" ? styles.activeProfileTopItem : ""} `}>

                                <img src="/profile/post.png" alt="profileInfo" />
                                <p>My posts</p>
                            </div>

                            <div onClick={() => setCurrentInspect("myTransactions")} className={`${styles.profileTopItem} ${currentInspect === "myTransactions" ? styles.activeProfileTopItem : ""} `}>

                                <img src="/profile/transaction.png" alt="loctionImage" />
                                <p>My Transaction</p>
                            </div>


                        </div>
                    </div>
                    <div className={styles.profileRightBottom}>
                        {
                            currentInspect === "myPost" ? <Mypost /> : <Transactions transactionId={viewTransaction} />
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Profile
