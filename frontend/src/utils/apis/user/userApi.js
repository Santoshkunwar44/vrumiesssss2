import instance from "../../axios/axios";


export const getUserById = (userId) => instance.get(`/user/${userId}`)
export const updateUser = (userId, userData) => instance.put(`/user/${userId}`, userData)
export const getLoggedInUser = () => instance.get("/user/loggedInUser")
export const logoutApi = () => instance.post("/user/logout")



