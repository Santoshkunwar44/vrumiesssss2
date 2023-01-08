const initialState = {
    toastifyInfo: null,
    refresh: false
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
        case "REMOVE_TOASTIFY_INFO":
            return { ...state, toastifyInfo: null }
        default:
            return state
    }
}