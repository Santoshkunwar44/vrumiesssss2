



export const setUserData = (data) => async (dispatch) => {
    try {
        dispatch({ type: "SET_USER_DATA", data })
    } catch (error) {
        console.log(error)

    }
}


// logout action

export const logoutUser = () => async (dispatch) => {

    dispatch({ type: "LOG_OUT" })

}