import styles from "./navbar.module.css"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import LogoutPop from "../modal/logoutPop/LogoutPop"


const Navbar = () => {

    const { userData } = useSelector(state => state.userReducer)
    const currentPage = useLocation().pathname.split("/")[1]
    const navigate = useNavigate()

    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_left}>
                <Link to="/">   <img src="/vrumies_logo.png" alt="vrumies_logo" /></Link>
                <Link to={"/"}>   <p className={`${styles.navListItem}  ${currentPage === "" ? styles.active : ""}`}>Home</p></Link>
                <Link to={userData?.username ? `/profile/${userData?._id}` : "/signup"}>   <p className={`${styles.navListItem}  ${currentPage === "profile" ? styles.active : ""}`}>Profile</p></Link>
            </div>
            <div className={styles.navbar_right}>
                <Link title="Post Item" to={userData?.username ? "/createpost" : "/signup"}> <img className={styles.navPostBtn} src="/post.png" alt="addBtn" /></Link>
                <Link title="Buy VBT" to={userData?.username ? `/ordertokens` : "/signup"}>
                    <div className={styles.tokenBox} >
                        <h3 className={styles.tokenText}>{userData?.tokenAvailabe}</h3>
                        <img src="/token.png" alt="token" />
                    </div>
                </Link>
                {

                    userData ?
                        <LogoutPop>
                            <div className={styles.navProfileBox}>
                                <img referrerPolicy="no-referrer" className={styles.navProfileImg} src={userData?.profileImg} alt="profilePicture" />
                                <div className={styles.navPofileBoxInfo}>
                                    <h2 className={styles.navProfileBoxName}>{userData?.username}</h2>
                                    <p className={styles.navProfileBoxEmail}>{userData?.email}</p>
                                </div>

                            </div>
                        </LogoutPop> : <button onClick={() => navigate("/signup")} className={styles.signUpBtn}> <img src="/items/person.png" alt="personImg" /> SIGN UP</button>
                }
            </div>
        </div>
    )
}

export default Navbar