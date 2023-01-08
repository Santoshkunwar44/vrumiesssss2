import instance from "../../axios/axios"
export const getPostByCat = (data) => instance.get(`/post/${data}`)

export const getPostById = (postId) => instance.get(`/post/${postId}/byId`);


export const getPostByUserId = (userId) => instance.get(`/post/${userId}/byUserId`)





