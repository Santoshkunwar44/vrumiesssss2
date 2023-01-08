import styles from "./DelModal.module.css"

const DelModal = () => {
    return (
        <div className={styles.modalOverlay}>

            <div className={styles.modalbody}>

                <div className={styles.ModalDelete}>
                    <div className={styles.ModalDeleteheader}>

                        <h1>Are you sure you want to delete your post ?</h1>


                    </div>

                    <p>Tokens used to this post will be  considered used if post is deleted.</p>

                    <button className={styles.confirmDelete}>
                        Confirm & Delete


                    </button>

                </div>

            </div>
        </div>
    )
}

export default DelModal