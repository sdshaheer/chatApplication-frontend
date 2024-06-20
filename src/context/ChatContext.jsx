import { React, useState, useEffect, createContext, useContext } from "react";
import { useAuth } from './AuthContext';
import axios from "axios";
import { basePath } from "../utils/basePath";


const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
    const { user } = useAuth();
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null)
    const [isChatsFetching, setIsChatsFetching] = useState(false)
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        if (user) {
            fetchChats()
        }
    }, [user])

    const clearChatContext = () => {
        setChats([])
        setSelectedChat(null)
    }

    const fetchChats = async () => {
        try {
            setIsChatsFetching(true)
            const response = await axios.get(`${basePath}/chat/getAllChats`,
                { headers: { Authorization: user?.accessToken } }
            )
            // setChats([...response?.data, ...response?.data, ...response?.data, ...response?.data])
            setChats([...response?.data])
        } catch (error) {
            console.log('error in getting all chats of user', error)
        } finally {
            setIsChatsFetching(false)
        }
    }

    const value = {
        isChatsFetching,
        chats,
        setChats,
        fetchChats,
        selectedChat,
        setSelectedChat,
        notifications,
        setNotifications,
        clearChatContext
    }

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChat = () => {
    return useContext(ChatContext)
}