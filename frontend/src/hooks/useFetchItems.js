import { useEffect, useState } from "react"
import instance from "../utils/axios/axios"

const useFetchItems = (url) => {

    const [theItem, setTheItem] = useState(null)

    useEffect(() => {
        fetchItemfunction()
    }, [])



    const fetchItemfunction = async () => {

        try {
            const { data } = await instance.get(url)
            setTheItem(data.message)
        } catch (error) {
            console.log(error)
        }

    }
    return {
        data: theItem
    }

}

export default useFetchItems