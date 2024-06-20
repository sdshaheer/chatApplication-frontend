export const getChatPicture = (chat, loggedInUser) => {
    if (chat?.isGroupChat) {
        return chat?.groupPicture
    }

    const otherUser = chat?.users?.find((chatUser) => chatUser?.uuid != loggedInUser?.uid)
    return otherUser?.picture

}

export const getChatName = (chat, loggedInUser) => {
    if (chat?.isGroupChat) {
        return chat?.chatName
    }

    return loggedInUser?.uid === chat?.users[0]?.uuid ? chat?.users[1]?.name : chat?.users[0]?.name
}

export const isGroupAdmin = (chat, loggedInUser) => {
    return chat?.groupAdmin?.uuid === loggedInUser?.uid
}

export const isSameSender = (messages, currentMessage, index, user) => {
    if (index < messages.length - 1) {
        if (messages[index + 1]?.sender?._id !== currentMessage?.sender?._id &&
            messages[index]?.sender?.uuid !== user?.uid) {
            return true
        }
    }

    return false
}

export const isLastMessage = (messages, index, user) => {
    if (index === messages.length - 1) {
        if (messages[messages.length - 1]?.sender?.uuid !== user?.uid &&
            messages[index]?.sender?.uid !== user?.uid) {
            return true
        }
    }

    return false
}
