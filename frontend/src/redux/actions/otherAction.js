import { getPostByLocation } from "../../utils/apis/post/postApi"




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

export const setFilterPostItem = (category, city, state, filters) => async (dispatch) => {

    try {
        dispatch({ type: "SET_LOADING_DATA", data: { isLoading: true, type: "appCategory" } })
        const { data: { message } } = await getPostByLocation(category, state, city)
        dispatch({ type: "SET_FILTER_POST", data: { message, filters } })
        dispatch({ type: "REMOVE_LOADING_DATA" })
    } catch (error) {
        console.log(error)
        dispatch({ type: "REMOVE_LOADING_DATA" })

    }
}
export const setRemoveFilterLocationData = () => async (dispatch) => {

    dispatch({ type: "REMOVE_FILTER_LOCATION_DATA" })

}


export const setCategoryIndex = (index) => (dispatch) => {
    dispatch({ type: "SET_CATEGORY_SLIDER_INDEX", data: index })
}




// SET_LOADING_DATA

export const setLoadingData = (data) => (dispatch) => {

    dispatch({ type: "SET_LOADING_DATA", data })


}
export const removeLoadingData = () => (dispatch) => {

    dispatch({ type: "REMOVE_LOADING_DATA" })


}

export const setSessionExpired = () => (dispatch) => {
    dispatch({ type: "SET_SESSION_EXPIRED" })

}
export const resetSessionExpired = () => (dispatch) => {
    dispatch({ type: "RESET_SESSION_EXPIRED" })

}