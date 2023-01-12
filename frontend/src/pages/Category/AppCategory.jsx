import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from "./appCategory.module.css"
import Navbar from '../../components/Navbar/Navbar'
import Post from '../../components/post/Post'
import { getPostByCat } from '../../utils/apis/post/postApi'
import { useRef } from 'react'
import NotFound from '../../components/notFound/NotFound'
import { useDispatch, useSelector } from 'react-redux'
import { setRemoveFilterLocationData } from '../../redux/actions/otherAction'
import PostFilterPopOver from '../../components/popOvers/postFilterPopover/PostFilterPopOver'
const AppCategory = () => {
    const { locationFilterPostItem, locationFilters } = useSelector((state) => state.otherReducer)
    const [currentCatData, setCurrentCatData] = useState({})
    const [postFilter, setPostFilters] = useState({
        subcategory: "",
        type: "Advertise",
    })
    const [thePosts, setTheposts] = useState([])
    const [theFilterdPost, setTheFilteredPost] = useState([])
    const catData = useLocation().state.data
    const postWrapperRef = useRef()
    const dispatch = useDispatch()


    useEffect(() => {
        if (catData) {
            setCurrentCatData(catData)
        }

    }, [catData])


    useEffect(() => {
        if (catData?.name) {

            fetchThePosts(catData?.displayName)
        }

    }, [catData])



    useEffect(() => {
        let getPost;
        getPost = thePosts.filter((post) => post.type === postFilter.type);
        getPost = getPost.filter((post) => post.subCategory === postFilter.subcategory)

        setTheFilteredPost(getPost)

    }, [postFilter, thePosts])


    useEffect(() => {
        postWrapperRef.current.scrollIntoView({ behavior: "smooth" })
    }, [theFilterdPost, locationFilterPostItem])


    useEffect(() => {

        if (currentCatData?.subCategory) {

            setPostFilters({
                type: "Advertise",
                subcategory: currentCatData?.subCategory[0]
            })
        }

    }, [currentCatData])




    const fetchThePosts = async (catName) => {

        try {
            const { data } = await getPostByCat(catName)
            setTheposts(data.message)
        } catch (error) {
            console.log(error)
        }

    }



    return (
        <div className={styles.appCategory}>

            <Navbar />
            <div className={styles.appCategoryWrapper}>
                <div className={styles.appCategorybanner}>
                    <div className={styles.categoryBannerBgBlur}>

                    </div>
                    <div className={styles.categoryContentWrapper}>

                        <div className={styles.categoryItemLeft}>


                            <h2 className={styles.categoryTitleText}>{currentCatData?.name}</h2>

                            <div className={styles.catBannerBtnWrapperBox}>
                                <div className={styles.catBannerBtnWrapper}>


                                    <button onClick={() => setPostFilters((prev) => {
                                        return {
                                            ...prev, type: "Advertise"
                                        }
                                    })} className={`${styles.catBtnOption} ${postFilter.type === "Advertise" ? styles.activeCatOption : ""}  `}> <span>Advertise</span></button>
                                    <button onClick={() => setPostFilters((prev) => {
                                        return {
                                            ...prev, type: "Request"
                                        }
                                    })} className={`${styles.catBtnOption} ${postFilter.type === "Request" ? styles.activeCatOption : ""}  `}> <span>Request</span></button>

                                </div>
                                <div className={styles.catBannerBtnWrapper}>


                                    {/* <button className={`${styles.catBtnOption} ${styles.activeCatOption}`}> <span>{item.option1}</span></button> */}
                                    {
                                        currentCatData?.subCategory?.map((item, index) => (
                                            <button onClick={() => setPostFilters((prev) => { return { ...prev, subcategory: item } })} key={index} className={`${styles.catBtnOption} ${postFilter.subcategory === item ? styles.activeCatOption : ""}  `}> <span>{item}</span></button>
                                        ))
                                    }
                                </div>




                            </div>
                        </div>
                        <div className={styles.categoryIconRight}>

                            <img draggable={"false"} className={styles.catItemImg} src={currentCatData?.img} alt={currentCatData?.name} />

                        </div>
                    </div>
                </div>
                <div className={styles.appCatPostWrapper}>
                    <div className={styles.appCatPopularPostHeader}>
                        <h1 className={styles.mostPopularText}>MOST POPULAR</h1>
                        {

                            locationFilters ? <div className={styles.filterLocationButton}>
                                <p>Filter Location</p>
                                <button>
                                    {locationFilters?.state} / {locationFilters?.city ? locationFilters?.city : "___"}
                                    <img onClick={() => dispatch(setRemoveFilterLocationData())} src="/order/close.png" alt="closeImig" />
                                </button>
                            </div> : <PostFilterPopOver>

                                <button className={styles.filterByLocation}>
                                    <img src="/NavMap.png" alt="mapImg" />
                                    Filter By Location
                                </button>
                            </PostFilterPopOver>
                        }
                        <div className={styles.appCatHeaderHrLine}></div>
                        <Link to={"/"}>
                            <div className={styles.appCatBackText}>

                                BACK
                            </div>
                        </Link>

                    </div>
                    <div ref={postWrapperRef} className={styles.postWrappers}>
                        {
                            locationFilterPostItem ? locationFilterPostItem.length > 0 ? locationFilterPostItem.map((post) => <Post post={post} key={post?._id} />) : <NotFound img='/items/post.png' text={"No post found of your choice"} /> : ""
                        }
                        {
                            !locationFilterPostItem ? theFilterdPost.length > 0 ? theFilterdPost.map((post) => <Post post={post} key={post?._id} />) : <NotFound img='/items/post.png' text={"No post found of your choice"} /> : null
                        }

                    </div>

                </div>
            </div>

        </div>
    )
}

export default AppCategory