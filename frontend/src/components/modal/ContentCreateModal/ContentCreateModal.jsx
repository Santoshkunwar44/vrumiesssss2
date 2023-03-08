import { Modal, ModalBody, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import BlogModalLayouts from "../../../Layouts/Content/ModalLayouts/BlogModalLayouts/BlogModalLayouts"
import ForumModalLayouts from "../../../Layouts/Content/ModalLayouts/ForumModalLayouts/ForumModalLayouts"
import VlogModalLayouts from "../../../Layouts/Content/ModalLayouts/VlogModalLayouts/VlogModalLayouts"
import UploadDocsLayout from "../../../Layouts/upload/UploadDocsLayout"
import { setToastifyInfo, startRefresh } from "../../../redux/actions/otherAction"
import { createContentApi } from "../../../utils/apis/content/contentApi"

import styles from "./ContentCreateModal.module.css"

const ContentCreateModal = ({ children, type = "vlog" }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { userData } = useSelector((state) => state.userReducer);
    const [startUploadDocs, setStartUploadDocs] = useState(false)

    const dispatch = useDispatch()






    const [createContentData, setCreateContentData] = useState({
        title: "",
        description: "",
        thumbnail_image: "",
        video_url: "",
        photos: [],
        website_url: "",
        contentType: "",
        owner: ""
    })


    const handleUploadDocs = () => {
        createContentData["contentType"] = type;
        createContentData["owner"] = userData?._id;

        if (type === "forum") {
            if (handleValidate()) {
                handleUpload();
            } else {
                console.log("please fill all the fieldls", createContentData)
            }
            return;
        }

        if (handleValidate()) {
            setStartUploadDocs(true)
        } else {
            console.log("please fill all the fieldls", createContentData)
        }
    }



    const handleUpload = async (docsImgArr) => {


        let postDataBody = { ...createContentData }




        try {







            if (docsImgArr) {
                console.log(docsImgArr)
                docsImgArr.forEach((item) => {
                    postDataBody[Object.keys(item)[0]] = item[Object.keys(item)[0]]
                })

            }


            if (handleValidate()) {

                const res = await createContentApi(postDataBody)
                if (res.data.success) {
                    console.log("successfull", res.data?.message)
                    dispatch(setToastifyInfo({
                        type: "success",
                        text: `${type} uploaded successfully`
                    }))
                    dispatch(startRefresh())

                    onClose()

                } else {
                    console.log("unsucessfull", res.data?.message)
                }
                setCreateContentData({
                    title: "",
                    description: "",
                    thumbnail_image: "",
                    video_url: "",
                    photos: [],
                    website_url: "",
                    contentType: "",
                    owner: ""
                })
            } else {
                console.log("fill all the fields ,", postDataBody)
            }





        } catch (error) {
            console.log(error)
        }
    }

    const handleValidate = () => {
        if (!createContentData.title || !createContentData.description) {
            return false
        }
        if (type === "blog" && !createContentData.thumbnail_image) {
            return false
        }
        if (type === "vlog" && !createContentData.thumbnail_image && !createContentData.video_url) {
            return false
        }
        return true
    }

    const handleInputChange = (name, value) => {

        setCreateContentData((prev) => {
            return { ...prev, [name]: value }
        })

    }


    const handleDocChange = (name, value) => {
        let file = value;
        file.field = name

        setCreateContentData((prev) => ({
            ...prev, [name]: value
        }))
    };

    const handleCloseModal = () => {
        setCreateContentData({
            title: "",
            description: "",
            thumbnail_image: "",
            video_url: "",
            photos: [],
            website_url: "",
            contentType: "",
            owner: ""
        })

        onClose()
    }



    const ContentModelMapping = {
        vlog: <VlogModalLayouts handleDocChange={handleDocChange} onClose={handleCloseModal} handleSubmit={handleUploadDocs} handleChange={handleInputChange} data={createContentData} />,
        blog: <BlogModalLayouts handleDocChange={handleDocChange} onClose={handleCloseModal} handleSubmit={handleUploadDocs} handleChange={handleInputChange} data={createContentData} />,
        forum: <ForumModalLayouts onClose={handleCloseModal} handleSubmit={handleUploadDocs} handleChange={handleInputChange} data={createContentData} />
    }




    return (
        <>

            <span onClick={onOpen}>
                {
                    children
                }
            </span>
            <Modal closeOnOverlayClick={true} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>

                        <div className={styles.modalOverlay}>
                            <div className={styles.modalbody}>

                                {
                                    startUploadDocs && <UploadDocsLayout closeUploadDocsUi={() => setStartUploadDocs(false)} cb={handleUpload} docs={[createContentData?.thumbnail_image, createContentData.video_url && createContentData?.video_url]} />
                                }
                                <img className={styles.closeIconImg} onClick={handleCloseModal} src="/order/close.png" alt="closeImg" />
                                {
                                    ContentModelMapping[type]
                                }

                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ContentCreateModal