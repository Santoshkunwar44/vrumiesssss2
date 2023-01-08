const initialState = {
    userData: null,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state, userData: action.data
            }
        case "LOG_OUT":
            return initialState
        default:
            return state
    }
}