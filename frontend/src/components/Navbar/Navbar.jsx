import styles from "./navbar.module.css"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"


const Navbar = () => {

    const { userData } = useSelector(state => state.userReducer)
    const currentPage = useLocation().pathname.split("/")[1]


    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_left}>
                <Link to="/">   <img src="/vrumies_logo.png" alt="vrumies_logo" /></Link>
                <Link to={"/"}>   <p className={`${styles.navListItem}  ${currentPage === "" ? styles.active : ""}`}>Home</p></Link>
                <Link to={`/profile/${userData?._id}`}>   <p className={`${styles.navListItem}  ${currentPage === "profile" ? styles.active : ""}`}>Profile</p></Link>
            </div>
            <div className={styles.navbar_right}>
                <img className={styles.navPostBtn} src="/NavMap.png" alt="myMap" />
                <Link to={"/createpost"}> <img className={styles.navPostBtn} src="/post.png" alt="addBtn" /></Link>
                <Link to={`/ordertokens`}>
                    <div className={styles.tokenBox} >
                        <h3 className={styles.tokenText}>{userData?.tokenAvailabe}</h3>
                        <img src="/token.png" alt="token" />
                    </div>
                </Link>
                <Link to={`/profile/${userData?._id}`}>
                    <div className={styles.navProfileBox}>
                        <img className={styles.navProfileImg} src={userData?.profileImg} alt="profilePicture" />
                        <div className={styles.navPofileBoxInfo}>
                            <h2 className={styles.navProfileBoxName}>{userData?.username}</h2>
                            <p className={styles.navProfileBoxEmail}>{userData?.email}</p>
                        </div>

                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Navbar