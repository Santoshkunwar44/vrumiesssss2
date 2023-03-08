import instance from "../../axios/axios";

export const getContentByTypeApi = (contentId) => instance.get(`/content?contentType=${contentId}`)
export const getContentByIdApi = (contentType) => instance.get(`/content?contentId=${contentType}`)
export const getContentByUserApi = (userId) => instance.get(`/content?userId=${userId}`)
export const addContentCommentApi = (contentId, commentData) => instance.post(`/content/comment/${contentId}`, commentData)


export const likeContentApi = (contentId, userId) => instance.post(`/content/react/${contentId}?like=${userId}`)

export const disLikeContentApi = (contentId, userId) => instance.post(`/content/react/${contentId}?dislike=${userId}`)
export const createContentApi = (contentData) => instance.post(`/content`, contentData)
