import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../utils/firebase/firebase"


export const useUploadImages = (images) => {

    const [urls, setUrls] = useState([])
    const [error, setError] = useState(false)




    useEffect(() => {


        if (urls?.length < images?.length) {
            upload(images[urls.length], setUrls)
        } else {
            setUrls([])
        }
    }, [urls])



    return { url: urls, error }
}

const upload = (file, setUrls) => {


    // Upload file and metadata to the object 'images/mountains.jpg'
    console.log(file?.name, file)
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file)


    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(progress + '%')
        },
        (error) => {
            console.log(error)
        },
        async () => {

            const theUrl = await getDownloadURL(uploadTask.snapshot.ref)
            setUrls((prev) => { return [...prev, theUrl] })
        }
    );


}






