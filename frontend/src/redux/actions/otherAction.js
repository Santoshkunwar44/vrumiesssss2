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
        const { data: { message } } = await getPostByLocation(category, state, city)
        dispatch({ type: "SET_FILTER_POST", data: { message, filters } })

    } catch (error) {
        console.log(error)

    }
}
export const setRemoveFilterLocationData = () => async (dispatch) => {

    dispatch({ type: "REMOVE_FILTER_LOCATION_DATA" })

}


export const setCategoryIndex = (index) => (dispatch) => {
    dispatch({ type: "SET_CATEGORY_SLIDER_INDEX", data: index })
}