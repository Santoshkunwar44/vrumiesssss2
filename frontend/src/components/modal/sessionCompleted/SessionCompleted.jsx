import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure
} from '@chakra-ui/react'
import { useEffect } from 'react'
import styles from "../modal.module.css"

function NewSession() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    useEffect(() => {
        onOpen()
    }, [])
    const handleLoginInGoogle = async () => {
        window.open("http://localhost:8000/api/passport/google", "_self")

    }
    return (
        <>
            <div className={styles.modalOverlay}>

                <div className={styles.modalBody}>
                    <h2>VRUMIES SESSION EXPIRED </h2>
                    <h3>Please Login !!</h3>
                    <div className={styles.signupBtn} onClick={handleLoginInGoogle}>
                        <img src="/images/google.png" alt="googlePng" />
                        <p>Sign in with Google</p>

                    </div>
                </div>
            </div>
        </>
    )
}
export default NewSession
