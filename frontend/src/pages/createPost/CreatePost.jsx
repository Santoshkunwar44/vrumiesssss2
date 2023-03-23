import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import Navbar from "../../components/Navbar/Navbar"
import UploadImageProgress from "../../components/uploadImage/UploadImageProgress"
import useFetchItems from "../../hooks/useFetchItems"
import styles from "./createPost.module.css"
import { useDispatch, useSelector } from "react-redux"
import { setToastifyInfo } from "../../redux/actions/otherAction"
import { getCitiesInState, getStatesOfAmerica } from "../../utils/apis/location/locationApi"
import { useNavigate } from "react-router-dom"
import CreateOption from "./createOption/CreateOption"
const CreatePost = () => {

    const { userData } = useSelector((state) => state.userReducer)
    const [createPostData, setCreatePostData] = useState({
        loading: false,
        owner: userData?._id,
        title: "",
        desc: "",
        type: "Advertise",
        VBTused: 0,
        orderNowBtn: false,
        inventoryCount: 1,
        setLocation: true,
        websiteLink: "",
        onlineOnly: false,
        subCategory: "",
        category: "",
        location: {
            state: null,
            city: null,
        },
        additionalInformation: [
            {
                id: 0,
                title: "",
                details: ""
            }
        ]

    })

    const [categoryList, setCategoryList] = useState([]);
    const [currentSelectedCategory, setCurrentSelectedCategory] = useState("#");
    const [subCategory, setSubCategory] = useState([]);
    const fileRef = useRef();
    const [createPostTab, setCreatePostTab] = useState("main_information_tab")

    const [startUpload, setStartUpload] = useState(false);
    const [imageFiles, setImageFiles] = useState([]);
    const [theCity, setCity] = useState([]);
    const [theState, setstate] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        if (userData?._id) {
            setCreatePostData((prev) => {
                return {
                    ...prev, owner: userData._id
                }
            })
        }
    }, [userData])







    const { data } = useFetchItems('/category')


    useEffect(() => {
        getAllStatesOfUSA()
    }, [])

    useEffect(() => {
        const selectedState = createPostData?.location?.state
        if (selectedState) {
            getAllCitiesInStates(selectedState)
        }
    }, [createPostData?.location?.state])




    useEffect(() => {
        if (data) {
            setCategoryList(data)
        }
    }, [data])





    useEffect(() => {

        if (currentSelectedCategory) {
            const theSubCats = categoryList.find((cat) => cat.name === currentSelectedCategory)
            setSubCategory(theSubCats?.subCategory)
            setCreatePostData((prev) => {
                return { ...prev, subCategory: theSubCats?.subCategory[0] }
            })
        }




    }, [currentSelectedCategory])



    const onChangeInput = (event) => {

        setCreatePostData((prev) => {
            return { ...prev, [event.target.name]: event.target.value }
        })

    }


    const getAllStatesOfUSA = async () => {

        try {

            const { data } = await getStatesOfAmerica()
            setstate(data?.data?.states)
        } catch (error) {
            console.log(error)
        }

    }
    const getAllCitiesInStates = async (selectedState) => {
        setCreatePostData((prev) => {
            return { ...prev, loading: true }
        })
        try {
            const { data } = await getCitiesInState(selectedState)
            setCity(data.data)
            setCreatePostData((prev) => {
                return { ...prev, loading: false }
            })
        } catch (error) {
            console.log(error)
            setCreatePostData((prev) => {
                return { ...prev, loading: false }
            })
        }

    }



    const handleTypeChange = (type) => {
        setCreatePostData((prev) => {
            return { ...prev, type }
        })
    }

    const changeVBTusedQuantity = (type) => {
        if (type === "Add") {
            if (userData?.tokenAvailabe <= createPostData.VBTused) {
                return dispatch(setToastifyInfo({
                    type: "error",
                    text: "No enough VBT"
                }))
            }
            setCreatePostData((prev) => {
                return { ...prev, VBTused: prev.VBTused + 1 }
            })
        } else {
            if (createPostData.VBTused === 0) return;
            if (createPostData.VBTused <= 20) {
                setCreatePostData((prev) => {
                    return { ...prev, orderNowBtn: false, inventoryCount: 1 }
                })
            }
            setCreatePostData((prev) => {
                return { ...prev, VBTused: prev.VBTused - 1 }
            })
        }
    }

    const handleChangeInventory = (type) => {
        if (type === "Add") {

            setCreatePostData((prev) => {
                return { ...prev, inventoryCount: prev.inventoryCount + 1 }
            })
        } else {
            if (createPostData.inventoryCount <= 1) return;

            setCreatePostData((prev) => {
                return { ...prev, inventoryCount: prev.inventoryCount - 1 }
            })
        }
    }

    const onChangeEnableBtn = (type) => {


        if (type === "enable") {
            setCreatePostData((prev) => {

                return { ...prev, orderNowBtn: true }
            })
        } else {
            setCreatePostData((prev) => {

                return { ...prev, orderNowBtn: false }
            })

        }
    }


    const locationSetting = (type) => {


        if (type === "online") {
            setCreatePostData((prev) => {
                return { ...prev, onlineOnly: true, setLocation: false, location: { city: null, state: null } }
            })
        } else {
            setCreatePostData((prev) => {
                return { ...prev, onlineOnly: false, setLocation: true }
            })
        }
    }

    const handleLocation = (locationType, value) => {
        setCreatePostData((prev) => {
            return { ...prev, location: { ...prev.location, [locationType]: value } }
        })
    }
    const handleStartUpload = () => {
        if (!createPostData.price || !createPostData.title || !createPostData.desc || !createPostData.type || !createPostData.subCategory || !createPostData.category || imageFiles.length < 1 || (createPostData.setLocation && !createPostData.location.state)) {
            dispatch(setToastifyInfo({
                text: "Fill required Fields",
                type: "error"
            }))
            return;
        }
        setStartUpload(true)
    }



    const handleChangeAdditionalInformation = (itemId, name, value) => {

        console.log("handle changing", name, value,)

        let additionalInfoArr = createPostData.additionalInformation;

        additionalInfoArr = additionalInfoArr.map(item => {
            return item.id === itemId ? { ...item, [name]: value } : item
        })

        setCreatePostData(prev => ({
            ...prev,
            additionalInformation: additionalInfoArr
        }))

    }

    const handleDeleteAdditionalInformation = (itemId) => {
        console.log(itemId)
        let additionalInfoARr = createPostData.additionalInformation
        setCreatePostData((prev) => ({
            ...prev,
            additionalInformation: additionalInfoARr.filter(item => item.id !== itemId)
        }))

    }
    console.log(createPostData)

    return (
        <>
            <Navbar />
            <div className={styles.createPost}>
                <div className={styles.createPostWrapper}>
                    <div className={styles.createPostTopBox}>
                        <div className={styles.createPostTopLeftWrapper}>
                            <div className={styles.postLeftContents}>

                                <div className={styles.postLocationBtnsBox}>
                                    <div className={styles.postLocationText}>
                                        Choose  Location
                                    </div>
                                    <div className={styles.catBannerBtnWrapper}>
                                        <button onClick={() => locationSetting("location")} className={`${styles.catBtnOption} ${createPostData.setLocation ? styles.activeCatOption : ""}`}> <span>Set Location</span></button>
                                        <button onClick={() => locationSetting("online")} className={`${styles.catBtnOption}  ${!createPostData.setLocation ? styles.activeCatOption : ""} `}> <span>Online Only</span></button>
                                    </div>

                                </div>
                                <div className={styles.postLocationCityCountryBox}>
                                    {

                                        createPostData.setLocation ?
                                            <div className={styles.locationCityBox}>

                                                <img src="/NavMap.png" alt="map.png" />
                                                <div className={styles.select_boxes}>

                                                    <select onChange={(e) => { handleLocation("state", e.target.value); setCity([]) }} name="state"
                                                        value={createPostData?.location?.state} >
                                                        <option selected disabled value={"#"}>state</option>
                                                        {
                                                            theState?.map((state) => (
                                                                <option value={state?.name}>{state?.name}</option>
                                                            ))
                                                        }

                                                    </select>
                                                    <select onChange={(e) => handleLocation("city", e.target.value)} name="city" value={createPostData?.location?.city ? createPostData?.location?.city : "city "}>
                                                        <option selected disabled value={"#"}> {createPostData.loading ? "loading" : "city"} </option>

                                                        {
                                                            theCity?.map((city) => (
                                                                <>
                                                                    <option value={city}>{city}</option>
                                                                </>
                                                            ))
                                                        }

                                                    </select>
                                                </div>
                                            </div> : ""


                                    }

                                </div>
                            </div >
                        </div>
                        <div className={styles.hrLine}>
                        </div>
                        <div className={styles.createPostTopRight} >
                            <div className={styles.topRightWrapper}>

                                <div className={styles.postTopRightHeader}>
                                    Current Category Selected
                                </div>
                                <div className={styles.postToprightInfosBox}>
                                    <p>
                                        <span className={styles.key}>  Category selected </span>  : {currentSelectedCategory !== "#" && currentSelectedCategory}
                                    </p>
                                    <p>
                                        <span className={styles.key}>  Subcategory Selected </span>  : {createPostData.subCategory}
                                    </p>
                                    <p>
                                        <span className={styles.key}>Type</span>  : {createPostData.type}
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>

                    <h1 className={styles.createPostContentWrapper_left_header}>
                        CREATE POST
                    </h1>
                    <div className={styles.create_post_tab}>

                        <div className={`${styles.create_post_left_tab}`} onClick={() => setCreatePostTab("main_information_tab")} >
                            <h2 className={` ${createPostTab === "main_information_tab" ? styles.active_create_post_tab : ""} `}> Main Information</h2>
                            {
                                createPostTab === "main_information_tab" && <img src="/bottomBorder.png" alt="borderPng" />

                            }
                        </div>
                        <div className={styles.create_post_right_option_tab} onClick={() => setCreatePostTab("option_tab")}>

                            <h2 className={` ${createPostTab === "option_tab" ? styles.active_create_post_tab : ""} `}> Options</h2>
                            {
                                createPostTab === "option_tab" && <img src="/bottomBorder.png" alt="borderPng" />

                            }
                        </div>

                    </div>
                    {
                        createPostTab === "option_tab" ? <CreateOption
                            handleDelete={handleDeleteAdditionalInformation}
                            handleChangeAdditionalInformation={handleChangeAdditionalInformation}
                            setCreatePostData={setCreatePostData}
                            createPostData={createPostData} onChangeEnableBtn={onChangeEnableBtn} onChangeInput={onChangeInput} handleChangeInventory={handleChangeInventory} /> :
                            <div className={styles.createPostMainContent}>

                                <div className={styles.createPostContentWrapper}>
                                    <div className={styles.createPostContentWrapper_left}>

                                        <div className={styles.createPost_inputWrapper}>

                                            <input value={createPostData.title} required placeholder="post title..." className={styles.createPost_left_input} type="text" name="title" onChange={onChangeInput} />
                                            <textarea value={createPostData.desc
                                            } required placeholder="post description..." className={styles.createPost_description} name="desc" onChange={onChangeInput} cols="30" rows="10"></textarea>


                                        </div>

                                    </div>
                                    <div className={styles.cratePostContentRight}>
                                        <div className={styles.contentRightTop}>

                                            <div className={styles.createPostRightInputsBox}>
                                                <div className={styles.createPostRightInputsItem}>

                                                    <label className={styles.label}> Category :</label>

                                                    <select onChange={(e) => { setCurrentSelectedCategory(e.target.value); onChangeInput(e) }} value={currentSelectedCategory} className={styles.createPostSelect} name={"category"} >
                                                        <option value="#" selected disabled>Category</option>
                                                        {
                                                            categoryList?.map((item, index) => (
                                                                <option key={index} value={item.name}>{item.name}</option>

                                                            ))
                                                        }
                                                    </select>

                                                </div>
                                                <div className={styles.createPostRightInputsItem}>

                                                    <label className={styles.label}> Subcategory :</label>

                                                    <select name="subCategory" value={createPostData.subCategory} onChange={onChangeInput} className={styles.createPostSelect} >
                                                        <option value="#" selected disabled>sub Cateogory</option>
                                                        {
                                                            subCategory?.map((item, index) => (
                                                                <option key={index} value={item}>{item}</option>
                                                            ))
                                                        }
                                                    </select>

                                                </div>
                                                <div className={styles.typeSelect}>
                                                    <label className={styles.label} >Type :</label>
                                                    <div className={styles.createPostTypeSelect}>

                                                        <button onClick={() => handleTypeChange("Advertise")} className={`${styles.createPostTypeOption} ${createPostData.type === "Advertise" ? styles.activeCreatePostTypeOption : ""}`}> <span>Advertise</span></button>
                                                        <button onClick={() => handleTypeChange("Request")} className={`${styles.createPostTypeOption}   ${createPostData.type === "Request" ? styles.activeCreatePostTypeOption : ""} `}> <span>Request</span></button>
                                                    </div>

                                                </div>

                                                <div className={styles.mini_photo_wrapper}>
                                                    <label className={styles.label} >Item photos</label>
                                                    <div onClick={() => fileRef.current.click()} className={styles.createPostImageWrapper}>

                                                        <img className={styles.folderImg} src="/images/create/folder.png" alt="folder" />
                                                    </div>
                                                    <input onChange={(e) => setImageFiles(e.target.files)} multiple style={{ display: "none" }} type="file" name="" id="" ref={fileRef} />
                                                </div>


                                            </div>
                                            <div onClick={() => fileRef.current.click()} className={styles.createPostImageWrapper}>

                                                <img className={styles.folderImg} src="/images/create/folder.png" alt="folder" />
                                                <div className={styles.imageWrapperInfo}>

                                                    <span>Minimum 1 photo</span>
                                                    {

                                                        imageFiles.length > 0 && <span>You submitted {imageFiles.length} photos</span>

                                                    }
                                                </div>
                                            </div>
                                            <input onChange={(e) => setImageFiles(e.target.files)} multiple style={{ display: "none" }} type="file" name="" id="" ref={fileRef} />
                                        </div>

                                        <div className={styles.contentRightOptionsBottom}>
                                            <img className={styles.vbtTokenImg} src="/token.png" alt="token" />
                                            <div className={styles.tokenRequiredTextBox}>
                                                <p>0 VBT required to post</p>
                                                <p className={styles.totalBalance}>Total Balance: {userData?.tokenAvailabe} VBT’s</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.createPostBottomContent}>
                                    <div className={styles.bottomfirstContent}>

                                        <div className={styles.createPostBottomVBTInfoTextBox}>

                                            <p className={styles.vbtTextBottom}>How many VBT’s do you want to use?</p>
                                            <p className={styles.minimumVBTwarnText}>Order Now Button requires minimum 20 VBT</p>
                                        </div>
                                        <div className={styles.vbtBox}>
                                            <img className={styles.minBtn} onClick={() => changeVBTusedQuantity("Less")} src="/images/create/minimize.png" alt="minimizeImg" />
                                            <p className={styles.vbtcount}>{createPostData.VBTused}</p>
                                            <img className={styles.maxBtn} onClick={() => changeVBTusedQuantity("Add")} src="/images/create/maximize.png" alt="maximizeImg" />
                                        </div>
                                    </div>
                                    <div className={styles.bottom_BtnWrapper}>
                                        <button onClick={() => navigate(-1)} className={styles.backBtn}>
                                            <span>BACK</span>
                                        </button>
                                        <button onClick={handleStartUpload} className={styles.postBtn}>
                                            POST
                                        </button>
                                    </div>
                                    {
                                        startUpload ? <UploadImageProgress
                                            setCompleted={() => setStartUpload(false)}
                                            uploadData={createPostData} uploadImages={imageFiles} setImageFiles={setImageFiles} setCreatePostData={setCreatePostData} urlPath="/post" /> : ""
                                    }

                                </div>
                            </div>
                    }


                </div>
            </div>
        </>
    )
}

export default CreatePost