



export const setToastifyInfo = (data) => async (dispatch) => {
    try {
        dispatch({ type: "SET_TOASTIFY_INFO", data })
    } catch (error) {
        console.log(error)

    }
}
export const startRefresh = () => async (dispatch) => {
    dispatch({ type: "START_REFRESH" })
}
export const removeToastifyInfo = () => async (dispatch) => {
    try {
        dispatch({ type: "REMOVE_TOASTIFY_INFO" })
    } catch (error) {
        console.log(error)
    }
}

