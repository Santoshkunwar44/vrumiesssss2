import instance from "../../axios/axios"
export const getPostByCat = (data) => instance.get(`/post/${data}`)

export const getPostById = (postId) => instance.get(`/post/${postId}/byId`);


export const getPostByUserId = (userId) => instance.get(`/post/${userId}/byUserId`)

export const getPostByLocation = (category, state, city) => instance.get(`/post/location?state=${state}&city=${city}&category=${category}`)

export const deletePost = (postId) => instance.delete(`/post/${postId}`);



export const addMoreVBTtoPost = (postId, data) => instance.post(`/post/addMoreVBT/${postId}`, data)