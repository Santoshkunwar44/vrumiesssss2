import { deleteChat } from "../../utils/apis/chat/chatApi"
import { addNewMessage, addNewMessageForNewChat, getMessagesByChatId } from "../../utils/apis/message/messageApi"
import { getNextUser } from "../../utils/helper"

export const setSocketRef = (socketRef) => (dispatch) => {
    dispatch({ type: "SET_SOCKET_REF", data: socketRef });
}
export const setActiveUsers = (activeUsers) => (dispatch) => {

    dispatch({ type: "SET_ACTIVE_USERS", data: activeUsers });
}


export const setActiveChat = (activeChat, userId) => (dispatch) => {
    const activeUser = getNextUser(userId, activeChat?.users);
    console.log("setting up the active user ", activeUser, userId, activeChat?.users)
    dispatch({ type: "SET_ACTIVE_CHAT", data: activeChat })
    dispatch({ type: "SET_ACTIVE_USER", data: activeUser })
}


export const setChatMessages = (chatId) => async (dispatch) => {
    try {
        const res = await getMessagesByChatId(chatId)
        dispatch({ type: "SET_CHAT_MESSAGE", data: res?.data?.message })
    } catch (error) {
        console.log(error)
    }
}

export const addNewChatMessage = (newMessage, cb, chatId) => async (dispatch) => {
    try {
        let res = null
        if (chatId) {
            res = await addNewMessage(newMessage);
        } else {
            res = await addNewMessageForNewChat(newMessage);
            dispatch({ type: "SET_ACTIVE_CHAT", data: res.data?.message?.chatId })

        }
        const data = res.data.message
        dispatch({ type: "ADD_NEW_CHAT_MESSAGE", data })
        dispatch({ type: "START_REFRESH" })
        cb(res.data.message)
    } catch (error) {
        console.log(error)
    }

}

export const setDeleteChat = (chatId, activeChatId, cb) => async (dispatch) => {


    console.log("deleting the caht  ", chatId, activeChatId)

    try {
        const { status } = await deleteChat(chatId)


        console.log("deleted status ", status)
        if (status === 200) {

            // if deleted chat was is equal to the activeChat then 
            // clear the active user 
            // clear the active chat 
            // clear the actvie chat  message
            // navigate to previous page 
            if (chatId === activeChatId) {
                dispatch({ type: "SET_CHAT_MESSAGE", data: [] })
                dispatch({ type: "SET_ACTIVE_CHAT", data: null })
                dispatch({ type: "SET_ACTIVE_USER", data: null })
                cb()
            }
            dispatch({ type: "START_REFRESH" })
        }
    } catch (error) {
        console.log(error)
    }

}