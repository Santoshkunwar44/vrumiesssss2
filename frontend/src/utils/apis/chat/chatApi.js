import instance from "../../axios/axios"

export const chatOfUserApi = (userId) => instance.get(`/chat/${userId}`)
export const getChatById = (chatId) => instance.get(`/chat/byChatId/${chatId}`)
export const getChatByBothUser = (senderId, receiverId) => instance.get(`/chat/byUsersId/${senderId}/${receiverId}`)
export const deleteChat = (chatId) => instance.delete(`/chat/${chatId}`)