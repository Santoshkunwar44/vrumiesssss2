import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import BlogItem from "../../components/content/BlogItem/BlogItem";
import ForumItem from "../../components/content/ForumItem/ForumItem";
import SingleContent from "../../components/content/SingleContent/SingleContent";
import VlogItem from "../../components/content/VlogItem/VlogItem";
import ContentCreateModal from "../../components/modal/ContentCreateModal/ContentCreateModal";
import Navbar from "../../components/Navbar/Navbar";
import { getContentByTypeApi } from "../../utils/apis/content/contentApi";
import styles from "./Content.module.css"

const Content = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [activeList, setActiveTabList] = useState("vlog");
    const location = useLocation()
    const [currentSearchContent, setCurrentSearchContent] = useState(null)
    const [contentArr, setContentArr] = useState(null)
    const { refresh } = useSelector((state) => state.otherReducer);
    const navigate = useNavigate()

    useEffect(() => {
        handle_set_active_tab_item(activeList)
    }, [activeList])

    const handle_set_active_tab_item = (type) => {
        if (activeList === type) {
            return true
        } else {
            return false
        }
    }

    const ContentMapping = {
        vlog: <VlogContainer contentArr={contentArr} />,
        blog: <BlogContainer contentArr={contentArr} />,
        forum: <ForumContainer contentArr={contentArr} />
    }


    useEffect(() => {
        const searchQuery = location.search.split("=")[0].substring(1)
        if (searchQuery) {

            setCurrentSearchContent({ [searchQuery]: searchParams.get(searchQuery) })
        } else {
            setCurrentSearchContent(null)
        }
    }, [searchParams])



    useEffect(() => {
        if (activeList) {

            fetchContent(activeList)
        }
    }, [activeList, refresh])
    console.log("the refresh value ", refresh)

    const fetchContent = async (contentType) => {


        try {
            const res = await getContentByTypeApi(contentType);
            setContentArr(res.data?.message)

        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            <Navbar />
            {
                currentSearchContent ? <SingleContent /> : <div className={styles.content}>
                    <div className={styles.content_header}>

                        <div className={styles.header_title}>

                            <h3>Vrumies Vlogs</h3>
                            <img src="/layouts/btm_border.png" alt="borderBtn" />



                        </div>
                        <ContentCreateModal type={activeList}>

                            <button className={styles.create_btn}>
                                <img src="/icons/add.png" alt="addIcon" />
                                <p>Create {activeList}</p>
                            </button>
                        </ContentCreateModal>
                    </div>
                    <div className={styles.content_tab_list_box}>

                        <div className={styles.tab_list}>
                            <div className={`${styles.tab_list_item} ${handle_set_active_tab_item("vlog") && styles.active_tab_list_item}`} onClick={() => setActiveTabList("vlog")}>
                                <img src="/icons/video.png" alt="vlogs" />
                                Vlogs
                            </div>
                            <div className={`${styles.tab_list_item} ${handle_set_active_tab_item("forum") && styles.active_tab_list_item}`} onClick={() => setActiveTabList("forum")}>
                                <img src="/icons/group.png" alt="group" />
                                Forums
                            </div>
                            <div className={`${styles.tab_list_item} ${handle_set_active_tab_item("blog") && styles.active_tab_list_item}`} onClick={() => setActiveTabList("blog")}>
                                <img src="/icons/blog.png" alt="blogIcon" />
                                Blogs
                            </div>
                        </div>
                        <div className={styles.hrLine}>


                        </div>
                        <div className={styles.back_text} onClick={() => navigate(-1)}>
                            BACK
                        </div>
                    </div>


                    <div className={styles.content_items_container}>

                        {
                            ContentMapping[activeList]
                        }

                    </div>
                </div>
            }

        </>
    )
}

export default Content



const ForumContainer = ({ contentArr }) => {



    return <>
        {
            !contentArr ? <div> loading </div> : contentArr?.map((forum) => <ForumItem key={forum?._id} data={forum} />)
        }


    </>

}

const VlogContainer = ({ contentArr }) => {


    return <>

        {
            !contentArr ? <div> loading </div> : contentArr?.map((forum) => <VlogItem key={forum?._id} data={forum} />)
        }



    </>

}

const BlogContainer = ({ contentArr }) => {
    return <>

        {
            !contentArr ? <div> loading </div> : contentArr?.map((forum) => <BlogItem key={forum?._id} data={forum} />)
        }

    </>
}