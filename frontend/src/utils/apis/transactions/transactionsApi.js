import instance from "../../axios/axios"

export const addTransactionApi = (data) => instance.post(`/transaction`, data)
export const getTransactionInspectApi = (inspectAs, userId) => instance.get(`/transaction/inspect?inspectAs=${inspectAs}&userId=${userId} `)
export const updateTransactionApi = (transactionId, data) => instance.put(`/transaction/${transactionId}`, data)
export const buyTokensApi = (data) => instance.post("/transaction/buytokens", data)


