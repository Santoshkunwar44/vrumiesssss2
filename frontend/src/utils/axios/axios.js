import axios from "axios"


const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 5000,
    withCredentials: true,
});

// interceptors

instance.interceptors.response.use((config) => {

    return config


},
    async (err) => {
        const originalReq = err.config
        if (err.response.status == 401 && originalReq && !originalReq._isRetry) {
            originalReq._isRetry = true;
            try {
                await axios.get(`${process.env.REACT_APP_API_URL}/user/account/refresh`, {
                    withCredentials: true
                })
                return instance.request(originalReq)
            } catch (error) {
                console.log(error.message)
            }
        } else if (err.response.status.toString().startsWith("4")) {
            throw err.response
        }
    })




export default instance