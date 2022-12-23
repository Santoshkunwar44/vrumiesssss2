import { useState } from "react"
import styles from "./navbar.module.css"
import { Link } from "react-router-dom"


const Navbar = () => {

    const [activeNav, setActiveNav] = useState(true)


    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_left}>
                <Link to="/">   <img src="/vrumies_logo.png" alt="vrumies_logo" /></Link>
                <Link to={"/"}>   <p className={`${styles.navListItem}  ${activeNav ? styles.active : ""}`}>Home</p></Link>
                <Link to={"/profile"}>   <p className={styles.navListItem}>Profile</p></Link>
            </div>
            <div className={styles.navbar_right}>
                <img className={styles.navPostBtn} src="/post.png" alt="addBtn" />
                <div className={styles.tokenBox}>
                    <h3 className={styles.tokenText}>100</h3>
                    <img src="/token.png" alt="token" />
                </div>
                <Link to={"/profile"}>
                    <div className={styles.navProfileBox}>
                        <img className={styles.navProfileImg} src="/loggedUser.png" alt="profilePicture" />
                        <div className={styles.navPofileBoxInfo}>
                            <h2 className={styles.navProfileBoxName}>Alex Anderson</h2>
                            <p className={styles.navProfileBoxEmail}>Anderson33@gmail.com</p>
                        </div>

                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Navbar