const socketState = {
    socketRef: null,
    onlineUsers: [],
    activeChat: null,
    activeUser: null,
    chatMessage: null,
}


const socketReducer = (state = socketState, action) => {
    switch (action.type) {
        case "SET_SOCKET_REF":
            return { ...state, socketRef: action.data }
        case "SET_ACTIVE_USERS":
            return { ...state, onlineUsers: action.data }
        case "SET_ACTIVE_CHAT":
            return { ...state, activeChat: action.data }
        case "SET_ACTIVE_USER":
            return { ...state, activeUser: action.data }

        case "SET_CHAT_MESSAGE":
            return { ...state, chatMessage: action.data }

        case "ADD_NEW_CHAT_MESSAGE":
            if (state.chatMessage) {
                return { ...state, chatMessage: [...state.chatMessage, action.data] }

            } else {
                return { ...state, chatMessage: [action.data] }
            }
        default:
            return state
    }

}
export default socketReducer