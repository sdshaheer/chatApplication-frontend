export const getChatPicture = (chat, loggedInUser) => {
    if (chat?.isGroupChat) {
        return chat?.groupPicture
    }

    const otherUser = chat?.users?.find((chatUser) => chatUser?.uuid != loggedInUser?.uid)
    return otherUser?.picture

}
export const isGroupAdmin = (chat, loggedInUser) => {
    return chat?.groupAdmin?.uuid === loggedInUser?.uid
}