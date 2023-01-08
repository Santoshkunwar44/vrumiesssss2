import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import Navbar from "../../components/Navbar/Navbar"
import UploadImageProgress from "../../components/uploadImage/UploadImageProgress"
import useFetchItems from "../../hooks/useFetchItems"
import styles from "./createPost.module.css"
// import countryData from "../../utils/data/location/country.json"
import state from "../../utils/data/location/state.json"
import city from "../../utils/data/location/city.json"
import { useDispatch, useSelector } from "react-redux"
import { setToastifyInfo } from "../../redux/actions/otherAction"
const CreatePost = () => {

    const currentUser = "63ab1884164e821f6abcc61b"
    const { userData } = useSelector((state) => state.userReducer)
    const [createPostData, setCreatePostData] = useState({
        owner: currentUser,
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

    })
    const [categoryList, setCategoryList] = useState([])
    const [currentSelectedCategory, setCurrentSelectedCategory] = useState(categoryList[0]?.name)
    const [subCategory, setSubCategory] = useState([])
    const fileRef = useRef()
    const [startUpload, setStartUpload] = useState(false)
    const [imageFiles, setImageFiles] = useState([])
    const [theCity, setCity] = useState(city)
    const [theState, setstate] = useState(state)
    const dispatch = useDispatch()



    useEffect(() => {
        if (state) {
            setstate(state.filter((state) => state.country_id === "231"))
        }
    }, [])


    useEffect(() => {

        let theCurrState = createPostData?.location?.state
        if (theCurrState) {
            let thecities = city[0].data?.filter((city) => city.state_id === theCurrState)
            setCity(thecities)
        }


    }, [createPostData?.location?.state])


    // useEffect(() => {
    //     if (createPostData.inventoryCount > 20) {
    //         setCreatePostData((prev) => {
    //             return {
    //                 ...prev,
    //                 orderNowBtn: false,
    //                 inventoryCount: 1
    //             }

    //         })
    //     }

    // }, [createPostData.inventoryCount])

    const { data } = useFetchItems('/category')


    useEffect(() => {

        setCurrentSelectedCategory(categoryList[0]?.name)

    }, [categoryList])


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

        if (!createPostData.price || !createPostData.title || !createPostData.desc || !createPostData.type || !createPostData.subCategory || !createPostData.category || (createPostData.setLocation && !createPostData.location.state)) {
            dispatch(setToastifyInfo({
                text: "Fill required Fields",
                type: "error"
            }))
            return;
        }

        setStartUpload(true)
        dispatch(setToastifyInfo({
            text: "Post created successfully",
            type: "success"
        }))
    }

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
                                        Choose Post Location
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
                                                <select onChange={(e) => handleLocation("state", e.target.value)} name="state"
                                                    value={createPostData?.location?.state} >
                                                    <option >state</option>
                                                    {
                                                        theState?.map((state) => (
                                                            <option value={state?.state_id}>{state?.state_name}</option>
                                                        ))
                                                    }

                                                </select>
                                                <select onChange={(e) => handleLocation("city", e.target.value)} name="city" value={createPostData?.location?.city ? createPostData?.location?.city : "city "}>
                                                    <option > city</option>
                                                    {
                                                        theCity?.map((city) => (
                                                            <>
                                                                <option value={city.city_name}>{city.city_name}</option>
                                                            </>
                                                        ))
                                                    }

                                                </select>
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
                                        <span className={styles.key}>  Category selected </span>  : {currentSelectedCategory}
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
                    <div className={styles.createPostMainContent}>

                        <div className={styles.createPostContentWrapper}>
                            <div className={styles.createPostContentWrapper_left}>

                                <h1 className={styles.createPostContentWrapper_left_header}>
                                    CREATE POST
                                </h1>
                                <div className={styles.createPost_inputWrapper}>

                                    <input required placeholder="post title..." className={styles.createPost_left_input} type="text" name="title" onChange={onChangeInput} />
                                    <textarea required placeholder="post description..." className={styles.createPost_description} name="desc" onChange={onChangeInput} cols="30" rows="10"></textarea>


                                </div>
                                <div className={`${styles.inventoryOptionBox} ${createPostData.VBTused < 20 ? styles.inventoryDisabled : ""}`}>
                                    <div className={styles.inventoryLeftBox}>
                                        <p >Order Now Button</p>
                                        <div className={styles.catBannerBtnWrapper}>

                                            <button onClick={() => onChangeEnableBtn("enable")} className={`${styles.catBtnOption} ${createPostData.orderNowBtn ? styles.activeCatOption : ""}`}> <span>Enable Button</span></button>
                                            <button onClick={() => onChangeEnableBtn("disable")} className={`${styles.catBtnOption}  ${!createPostData.orderNowBtn ? styles.activeCatOption : ""} `}> <span>Disable Button</span></button>
                                        </div>
                                    </div>
                                    <div className={styles.inventoryRightBox}>

                                        <p>Max Inventory</p>
                                        <div className={styles.inventoryChooseBox}>
                                            <div onClick={() => handleChangeInventory("Sub")} className={styles.inventoryLeft}>
                                                -
                                            </div>

                                            <div className={styles.inventoryMid}>
                                                {createPostData.inventoryCount}
                                            </div>
                                            <div onClick={() => handleChangeInventory("Add")} className={styles.inventoryRight}>
                                                +
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className={styles.cratePostContentRight}>
                                <div className={styles.contentRightTop}>

                                    <div className={styles.createPostRightInputsBox}>
                                        <div className={styles.createPostRightInputsItem}>

                                            <label className={styles.label}> Category :</label>

                                            <select onChange={(e) => { setCurrentSelectedCategory(e.target.value); onChangeInput(e) }} value={currentSelectedCategory} className={styles.createPostSelect} name={"category"} >
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
                                        <div className={styles.priceSettingItem}>
                                            <label className={styles.label} > Price Setting:</label>
                                            <div className={styles.priceSettingBox}>
                                                <input onChange={onChangeInput} name="price" type="text" placeholder="Set price...    " />
                                            </div>
                                        </div>


                                    </div>
                                    <div onClick={() => fileRef.current.click()} className={styles.createPostImageWrapper}>

                                        <img src="/images/create/folder.png" alt="folder" />
                                    </div>
                                    <input onChange={(e) => setImageFiles(e.target.files)} multiple style={{ display: "none" }} type="file" name="" id="" ref={fileRef} />
                                </div>
                                <div className={styles.contentRightOptionsBottom}>
                                    <img src="/token.png" alt="token" />
                                    <div className={styles.tokenRequiredTextBox}>
                                        <p>0 VBT required to post</p>
                                        <p className={styles.totalBalance}>Total Balance: {userData?.tokenAvailabe} VBT’s</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.createPostBottomContent}>
                            <div className={styles.createPostBottomVBTInfoTextBox}>

                                <p className={styles.vbtTextBottom}>How many VBT’s do you want to use?</p>
                                <p className={styles.minimumVBTwarnText}>Order Now Button requires minimum 20 VBT</p>
                            </div>
                            <div className={styles.vbtBox}>
                                <img onClick={() => changeVBTusedQuantity("Less")} src="/images/create/minimize.png" alt="minimizeImg" />
                                <p className={styles.vbtcount}>{createPostData.VBTused}</p>
                                <img onClick={() => changeVBTusedQuantity("Add")} src="/images/create/maximize.png" alt="maximizeImg" />
                            </div>
                            <div className={styles.bottom_BtnWrapper}>
                                <button className={styles.backBtn}>
                                    <img src="/images/create/leftArrow.png" alt="leftArrow" />  <span>BACK</span>
                                </button>
                                <button onClick={handleStartUpload} className={styles.postBtn}>
                                    POST
                                </button>
                            </div>
                            {
                                startUpload ? <UploadImageProgress
                                    setCompleted={() => setStartUpload(false)}
                                    uploadData={createPostData} uploadImages={imageFiles} urlPath="/post" /> : ""
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreatePost