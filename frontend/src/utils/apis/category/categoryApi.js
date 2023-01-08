import instance from "../../axios/axios"


export const createCategory = (data) => instance.post("/category", data)
export const getAllCategories = () => instance.get("/category")









