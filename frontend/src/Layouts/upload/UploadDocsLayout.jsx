import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { useUploadImages } from "../../hooks/firebase"
import styles from "./UploadDocsLayout.module.css"

const UploadDocsLayout = ({ closeUploadDocsUi, docs, cb }) => {
    console.log("the docss", docs)


    const { url, error } = useUploadImages([...docs], null, true)
    const [finished, setFinished] = useState(false)
    const { userData } = useSelector((state) => state.userReducer)


    useEffect(() => {

        console.log(url)
        if (error) {
            return closeUploadDocsUi()
        }
        const validDocs = [...docs].filter((doc) => {
            if (doc) {
                return true
            } else {
                return false
            }
        });
        if (url.length === validDocs.length) {

            console.log("completed ", url)

            closeUploadDocsUi(true)
            cb(url)
        }
    }, [url, error])




    return (
        <div className={styles.upload_docs_progress}>

            <div className={styles.loading_progress}>
                <img src="/icons/loading.png" alt="loadingProgess" />
            </div>

        </div>
    )
}

export default UploadDocsLayout