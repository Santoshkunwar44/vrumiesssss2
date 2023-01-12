const initialState = {
    toastifyInfo: null,
    refresh: false,
    locationFilterPostItem: null,
    locationFilters: null,
    categorySliderIndex: 0
}

export const otherReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_TOASTIFY_INFO":
            return {
                ...state, toastifyInfo: action.data
            }
        case "START_REFRESH":
            return {
                ...state,
                refresh: !state.refresh
            }
        case "SET_FILTER_POST":
            return {
                ...state, locationFilterPostItem: action.data.message, locationFilters: action.data.filters
            }
        case "REMOVE_FILTER_LOCATION_DATA":
            return {
                ...state, locationFilterPostItem: null, locationFilters: null
            }

        case "SET_CATEGORY_SLIDER_INDEX":
            return {
                ...state, categorySliderIndex: action.data
            }

        case "REMOVE_TOASTIFY_INFO":
            return { ...state, toastifyInfo: null }
        default:
            return state
    }
}