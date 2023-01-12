import styles from "./signup.module.css"
import { Link } from "react-router-dom"
const Signup = () => {


    const handleLoginInGoogle = async () => {
        window.open("http://localhost:8000/api/passport/google", "_self")

    }

    return (
        <div className={styles.signup}>
            <div className={styles.leftElipse}>

            </div>
            <div className={styles.topRightElipse}>

            </div>
            <div className={styles.circleBall}>

            </div>
            <Link to={"/"} className={styles.logoBox}>
                <img width={"145px"} src="/vrumies_logo.png" alt="vrumies_logo" />
            </Link>
            <div className={styles.signUpContentBox}>

                <h3 className={styles.signUpText}>Welcome to Vrumies!</h3>
                <p className={styles.signUpsecondaryText}>An advertisement platform for the automotive industry.</p>

                <div className={styles.signupBtn} onClick={handleLoginInGoogle}>
                    <img src="/images/google.png" alt="googlePng" />
                    <p>Sign in with Google</p>

                </div>
            </div>

        </div>
    )
}

export default Signup