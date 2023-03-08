import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../utils/firebase/firebase";



export const useUploadImages = (images, path, isDocs) => {



    const [urls, setUrls] = useState([])
    const [error, setError] = useState(false)




    useEffect(() => {


        if (urls.length >= images?.length) {
            return setError(true)
        }
        upload(images[urls.length], "path", setUrls, isDocs)


    }, [urls])



    return { url: urls, error }
}

const upload = (file, path, setUrls, isDocs) => {

    console.log("the file ", file)
    if (typeof file !== "object") return
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);


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
            if (isDocs) {
                setUrls((prev) => {
                    return [...prev, { [file.field]: theUrl }]
                })
            } else {

                setUrls((prev) => { return [...prev, theUrl] })

            }
        }
    );


}






