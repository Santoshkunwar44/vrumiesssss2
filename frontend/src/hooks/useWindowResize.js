import { useEffect, useState } from "react"

export const useWindowResize = () => {
    const [innerWidth, setinnerWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize)
    })
    const handleWindowResize = () => {
        setinnerWidth(window.innerWidth)
    }
    return { innerWidth }
}