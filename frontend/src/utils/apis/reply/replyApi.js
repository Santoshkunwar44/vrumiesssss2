import instance from "../../axios/axios";


export const addReply = (data) => instance.post(`/reply`, data)

export const getReplyByPost = (postId) => instance.get(`/reply/${postId}/bypost`)

export const getReplyQuoteByUserId = (userId) => instance.get(`/reply/${userId}/byuser`)

export const deleteReplyQuote = (id) => instance.delete(`/reply/${id}`)

export const addMoreVBTTApi = (data) => instance.put(`/reply/addMoreVBT`, data)



