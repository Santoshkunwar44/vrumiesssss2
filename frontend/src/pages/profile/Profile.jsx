import Navbar from '../../components/Navbar/Navbar'
import styles from './profile.module.css'

const Profile = () => {
    return (
        <div className={styles.profile}>
            <Navbar />
            <div className={styles.profileWrapper}>
                <div className={styles.profileInfoLeft}>
                    <img className={styles.profileMark} src="/images/profilemark.png" alt="profileMark" />
                    <div className={styles.profileMainInfo}>
                        <div className={styles.imageWrapper}>
                            <img className={styles.profileImage} src="/images/profileImage.png" alt="profileImage" />
                            <div className={styles.imageBg}>

                                <img src="/images/profileCamera.png" alt="profileCamera" />



                            </div>
                        </div>

                        <div className={styles.profileNameInfo}>

                            <img className={styles.pencilEdit} src="/images/pencil.png" alt="pencilEdit" />
                            <p className={styles.profileUsername}>ALEX ANDERSON</p>
                            <p className={styles.profileEmail}>Anderson33@gmail.com</p>

                        </div>



                    </div>
                    <div className={styles.profileUserDescription}>
                        <div className={styles.profileDescHeader}>

                            <p className={styles.aboutText}>About Me</p>
                            <p className={styles.editText}>Edit</p>


                        </div>
                        <div className={styles.profileAboutText}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio
                        </div>
                    </div>

                </div>
                <div className={styles.profileRight}>
                    <div className={styles.profileRightTop}>
                        <div className={styles.profileRightTopIitems}>

                            <div className={styles.profileTopItem}>

                                <img src="/images/profileInfo.png" alt="profileInfo" />
                                <p>My posts</p>
                            </div>

                            <div className={`${styles.profileTopItem} ${styles.activeProfileTopItem}`}>

                                <img src="/images/myLocation.png" alt="loctionImage" />
                                <p>Location Filter</p>
                            </div>



                        </div>
                    </div>
                    <div className={styles.profileRightBottom}>
                        <div className={styles.locationOptionHeader}>
                            <h3>My Location Filter Options</h3>


                        </div>
                        <div className={styles.locationOptionItems}>
                            <div className={styles.locationOptionItem}>

                                <p>View Live Map</p>
                                <div className={styles.ltnOptionImgWrapper}>

                                    <img className={styles.liveMap} src="/images/liveMap.png" alt="liveMap" />
                                </div>

                            </div>
                            <div className={styles.locationOptionItem}>

                                <p>View Live Map</p>
                                <div className={styles.ltnOptionImgWrapper}>

                                    <img className={styles.setLocationImg} src="/images/setMyLocation.png" alt="myLocation" />
                                </div>

                            </div>
                            <div className={styles.locationOptionItem}>

                                <p>Estimate Distance</p>
                                <div className={styles.ltnOptionImgWrapper}>

                                    <img className={styles.estimateLocation} src="/images/estimateDistance.png" alt="myLocation" />
                                </div>

                            </div>

                        </div>
                        <div className={styles.otherLocationFilters}>
                            <div className={styles.otherLocationLeft}>

                                <h5 className={styles.otherLocationHeaderText}>Choose which Location filter Posts to use:</h5>

                                <div className={styles.otherLocationFilterBtn}>
                                    <button>Near Me</button>
                                    <button>Online Post Only</button>
                                </div>
                                <button className={styles.showAllPostBtn}>Show All Post</button>

                            </div>
                            <button className={styles.okeyBtn}>
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Profile