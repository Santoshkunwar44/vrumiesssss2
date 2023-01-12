import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    // PopoverCloseButton,
} from '@chakra-ui/react'
import styles from "./postFilterPopover.module.css"
import { useState } from "react"
import { useEffect } from 'react'
import { setFilterPostItem } from '../../../redux/actions/otherAction'
import { useDispatch } from 'react-redux'
import { getCitiesInState, getStatesOfAmerica } from '../../../utils/apis/location/locationApi'
import { useParams } from 'react-router-dom'
const PostFilterPopOver = ({ children }) => {


    const [postFilterData, setPostFilterData] = useState({
        state: "",
        city: "",
        showAll: false
    })
    const [statesOfUSA, setStatesOfUS] = useState([])
    const [cities, setCities] = useState([])
    const dispatch = useDispatch()
    const category = useParams().catName
    const [currentCategory, setCurrentCategory] = useState()




    useEffect(() => {

        setCurrentCategory(category)

    }, [category])







    useEffect(() => {

        const fetchStates = async () => {
            try {

                const { data } = await getStatesOfAmerica()
                setStatesOfUS(data?.data?.states)
            } catch (error) {
                console.log(error)
            }
        }
        fetchStates()
    }, [])


    useEffect(() => {

        if (postFilterData?.state) {
            CitieisInState()
        }


    }, [postFilterData?.state])





    const CitieisInState = async () => {
        try {

            const { data } = await getCitiesInState(postFilterData?.state)
            setCities(data?.data)
        } catch (error) {
            console.log(error)

        }
    }

    const handleFilterChange = (name, value) => {
        setPostFilterData((prev) => {
            return { ...prev, [name]: value }

        })
    }


    const handleFilterPost = () => {

        dispatch(setFilterPostItem(currentCategory, postFilterData.city, postFilterData.state, postFilterData))

    }

    return (
        <div style={{ position: "relative", zIndex: "99" }}>
            <Popover >
                <PopoverTrigger>
                    <span>{children}</span>
                </PopoverTrigger>
                <PopoverContent className={styles.popOverMain} borderRadius={"10"} p={'25'} pb={"45"} bg="#000000">
                    <PopoverArrow />

                    <PopoverBody className={styles.content}>
                        <div>
                            <h3>LOCATION FILTER</h3>
                        </div>
                        <div className={styles.catBannerBtnWrapper}>


                            <button onClick={() => handleFilterChange("showAll", false)} className={`${styles.catBtnOption} ${!postFilterData?.showAll ? styles.activeCatOption : ""} `}> <span>Filter By Location</span></button>
                            <button onClick={() => handleFilterChange("showAll", true)} className={`${styles.catBtnOption} ${postFilterData?.showAll ? styles.activeCatOption : ""}  `}> <span>Show All</span></button>

                        </div>
                        <div className={`${styles.mainContentBox} ${postFilterData?.showAll && styles.fadeContentBox}`}>
                            <div className={styles.mainContentLeft}>

                                <img className={styles.navPostBtn} src="/NavMap.png" alt="myMap" />
                            </div>
                            <div className={styles.vrLine}></div>
                            <div className={styles.mainContentRight}>
                                <select onChange={(e) => handleFilterChange("state", e.target.value)} name="" id="">
                                    <option unselectable='true'>state</option>
                                    {
                                        statesOfUSA?.map((state) => (

                                            <option key={state?.name} value={state?.name}>{state?.name}</option>
                                        ))
                                    }
                                </select>
                                <select onChange={(e) => handleFilterChange("city", e.target.value)}>
                                    <option unselectable='true'>city</option>
                                    {
                                        cities?.map((city) => (
                                            <option key={city} value={city}>{city}</option>
                                        ))
                                    }

                                </select>
                                <button onClick={handleFilterPost} className={styles.filterLocationBtn}>
                                    save
                                </button>
                            </div>
                        </div>
                    </PopoverBody>
                </PopoverContent>
            </Popover >
        </div >
    )
}
export default PostFilterPopOver

