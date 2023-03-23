import instance from "../../axios/axios";

export const addNewShopItemApi = (data) => instance.post(`/shop`, data)
export const deleteShopItemApi = (itemId) => instance.delete(`/shop/${itemId}`)
export const getShopItemOfUserByTypeApi = (userId, shopType) => instance.get(`/shop?owner=${userId}&shopType=${shopType}`)

