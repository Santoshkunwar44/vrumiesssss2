export const getNextUser = (currentUserid, users) => {
    if (!currentUserid || !users) return
    return users.find(user => user?._id !== currentUserid)
}
export const isLoggedInUser = (senderId, loggedInUserId) => {


    return senderId === loggedInUserId

}