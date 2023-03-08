import instance from "../../axios/axios"

export const getMessagesByChatId = (chatid) => instance.get(`/message?chatId=${chatid}`)
export const addNewMessage = (message) => instance.post(`/message/create`, message)


export const addNewMessageForNewChat = (data) => instance.post(`/message/new_message`, data)