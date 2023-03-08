import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

const useGetNextuser = (users) => {



    const { userData } = useSelector((state) => state.userReducer);
    const [nextUser, setNextUser] = useState(null)

    useEffect(() => {
        if (!users || !userData?._id) return
        fetchNextUser()
    }, [userData?._id, users])

    const fetchNextUser = () => {
        setNextUser(users.find((user) => user?._id !== userData?._id))
    }

    return { nextUser }

}
export default useGetNextuser;