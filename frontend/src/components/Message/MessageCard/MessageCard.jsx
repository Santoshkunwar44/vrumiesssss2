import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { getContentByUserApi } from "../../../utils/apis/content/contentApi";
import { getPostByUserId } from "../../../utils/apis/post/postApi";
import styles from "./Message.module.css"

const MessageCard = () => {

    const { activeUser } = useSelector((state) => state.socketReducer);

    const [thePost, setThePost] = useState(null);
    const [advertisePost, setAdvertisePost] = useState([])
    const [contentSelected, setContentSelected] = useState("");
    const [postTypeSelected, setPostTypeSelected] = useState("Advertise")

    const [requestPost, setRequestPost] = useState([]);
    const [filteredContent, setFilteredContent] = useState([])
    const [allContent, setAllContent] = useState([])
    const [userChoosedPost, setUserChoosedPost] = useState(null)
    const [userChoosedContent, setUserChoosedContent] = useState(null)




    useEffect(() => {
        setUserChoosedContent(filteredContent[0]?._id)
    }, [filteredContent])

    useEffect(() => {
        fetchAllPostOfTheUser()
        fetchAllContentByUser()
    }, [activeUser])
    useEffect(() => {
        setFilteredContent(allContent.filter((content) => content.contentType === contentSelected))
    }, [contentSelected, allContent])


    const fetchAllPostOfTheUser = async () => {

        try {
            const res = await getPostByUserId(activeUser?._id)
            setAdvertisePost(res.data?.message.postAdvertise)
            setRequestPost(res.data?.message.postRequest)

        } catch (error) {
            console.log(error)
        }



    }
    const fetchAllContentByUser = async () => {

        try {
            const res = await getContentByUserApi(activeUser?._id)
            setContentSelected("vlog")
            setAllContent(res.data?.message)

        } catch (error) {
            console.log(error)
        }

    }

    const handleSelectTypes = (name, value) => {
        if (name === "post") {
            setPostTypeSelected(value)

        } else if (name === "content") {
            setContentSelected(value)
        }
    }

    const handleValueOnchange = (name, value) => {
        console.log(name, "changing")
        if (name === "post") {
            setUserChoosedPost(value)
        } else if (name === "content") {

            setUserChoosedContent(value)
        }
    }
    return (
        <div
            className={styles.message_card}
        >


            {/* <div className={styles.profile_top}>
                <img className={styles.message_card_profile_img} src={activeUser?.profileImg} alt="" />
                <h5> {activeUser?.username}</h5>
            </div> */}


            <div className={styles.card_postDetails}>
                <div className={styles.post_type_section}>


                    <h3 className={styles.content_title}>POST MADE BY USER :</h3>
                    <div className={styles.card_content_box}>


                        <div className={styles._post_details_item}>
                            <h5 className={styles.titles}>Type</h5>
                            <div className={styles.post_type_toggle_btnWrapper}>
                                <button className={`${styles.post_type_toggle_btn}  ${postTypeSelected === "Advertise" && styles.activeBtn}`} onClick={() => handleSelectTypes("post", "Advertise")}>
                                    Advertise
                                </button>
                                <button className={`${styles.post_type_toggle_btn} ${postTypeSelected === "Request" && styles.activeBtn}`} onClick={() => handleSelectTypes("post", "Request")}>
                                    Request
                                </button>
                            </div>
                        </div>
                        <div className={styles._post_details_item}>
                            <h5 className={styles.titles}>    POST TITLE</h5>
                            <div className={styles.card_details_bottom}>

                                <select className={styles.post_title_select}
                                    onChange={(e) => handleValueOnchange("post", e.target.value)}
                                >
                                    <option disabled selected>choose post</option>
                                    {
                                        postTypeSelected === "Advertise" ? advertisePost.length > 0 ? advertisePost?.slice(0, 1).map((post) => (

                                            <option value={post?._id}>{post?.title}</option>

                                        )) : <option>No Advertise Post </option> : ""
                                    }
                                    {
                                        postTypeSelected === "Request" ? requestPost.length > 0 ? requestPost?.map((post) => (

                                            <option value={post?._id}>{post?.title}</option>

                                        )) : <option>No Request Post </option> : ""
                                    }
                                </select>
                                <Link to={`/post/${userChoosedPost}`} className={!userChoosedPost ? styles.disableGotoBtn : ""}>
                                    <button className={styles.goto_btn}  >
                                        View
                                    </button>

                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles._post_details_item}>
                    <h3 className={styles.content_title}>CONTENT MADE BY THE USER</h3>
                    <h5 className={styles.titles}>CONTENT TYPE</h5>
                    <div className={styles.card_content_box}>

                        <select onChange={(e) => handleSelectTypes("content", e.target.value)} className={styles.post_title_select}>

                            <option value={"vlog"}>Vlog </option>
                            <option value={"forum"}>Forum </option>
                            <option value={"blog"}>Blog  </option>


                        </select>
                        <div>


                            <h5 className={styles.titles}>Content Title</h5>
                            <div className={styles.card_details_bottom}>


                                <select value={userChoosedContent} className={styles.post_title_select} onChange={(e) => handleValueOnchange("content", e.target.value)}>
                                    <option disabled selected >Choose content</option>
                                    {
                                        filteredContent?.length > 0 ? filteredContent?.map(content => (
                                            <>
                                                <option value={content?._id}>{content?.title}</option>
                                            </>

                                        )) : <>
                                            <option selected>No content</option>
                                        </>
                                    }


                                </select>
                                <Link to={`/content?${contentSelected}=${userChoosedContent}`} className={!userChoosedContent ? styles.disableGotoBtn : ""}>
                                    <button className={styles.goto_btn}>
                                        View
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>



            </div>






        </div >
    )
}

export default MessageCard