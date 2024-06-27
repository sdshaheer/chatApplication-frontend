import React, { useState, useEffect, useRef, useCallback } from 'react'
import { VscSend } from "react-icons/vsc";
import axios from 'axios'
import { basePath, socketPath } from '../../../utils/basePath';
import { useAuth } from '../../../context/AuthContext';
import { useChat } from '../../../context/ChatContext';
import { isSameSender, isLastMessage } from '../../../config/ChatLogics';
import { CircularProgress, Box } from '@mui/material';
import io from 'socket.io-client'

let socket, selectedChatCompare

const MessageBox = () => {

    const { user } = useAuth()
    const { chats, setChats, selectedChat, notifications, setNotifications, } = useChat()
    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [socketConnected, setSocketConnected] = useState(false)
    const chatEndRef = useRef(null);


    useEffect(() => {
        if (selectedChat) {
            setNewMessage('')
            fetchMessages()
            selectedChatCompare = selectedChat
        }
    }, [selectedChat])


    useEffect(() => {
        socket = io(socketPath)
        socket.emit('setup', user)
        socket.on('connected', () => setSocketConnected(true))
    }, [])

    useEffect(() => {
        socket.on('messageRecieved', (newMessage) => {
            if (!selectedChatCompare || selectedChatCompare?._id !== newMessage.chat._id) {
                setNotifications([newMessage, ...notifications])
            } else {
                setMessages([...messages, newMessage]);
            }
        })
    })

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleMessageChange = (e) => {
        setNewMessage(e.target.value)
    }

    const fetchMessages = async () => {
        try {
            setIsLoading(true)
            setMessages([])
            const response = await axios.get(`${basePath}/message/getAllMessagesOfChat`,
                {
                    params: { chatId: selectedChat?._id },
                    headers: { Authorization: user?.accessToken }
                }
            )
            setMessages([...response.data])
            socket.emit('joinChat', selectedChat?._id)
        } catch (error) {
            console.log('error in fetching all messages of single chat ', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return

        try {
            setNewMessage('')
            const response = await axios.post(`${basePath}/message/sendMessage`,
                { content: newMessage, chatId: selectedChat?._id },
                { headers: { Authorization: user?.accessToken } }
            )
            socket.emit('newMessage', response?.data)
            setMessages((pre) => [...pre, response.data])
        } catch (error) {
            console.log('error in sending message ', error)
        }

    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    }

    return (
        <>
            {!selectedChat ?
                <div className='h-full flex justify-center items-center text-[20px] text-gray-500'>Click on a user to start Chatting</div>
                :
                <div className='h-full flex flex-col justify-between rounded-md bg-slate-300'>
                    {isLoading &&
                        <div className='w-full h-full flex justify-center items-center'>
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                        </div>
                    }
                    <div className='w-full h-full relative'>
                        <div className='w-full h-full flex flex-col gap-1 p-2 overflow-y-auto absolute'>
                            {messages?.map((message, index) => {
                                return (
                                    <div key={index} className='w-full'>
                                        <SingleMessage
                                            index={index}
                                            messages={messages}
                                            message={message}
                                            user={user}
                                        />
                                    </div>
                                )
                            })}
                            <div ref={chatEndRef} />
                        </div>
                    </div>
                    <div className='w-full flex items-center relative'>
                        <input
                            type="text"
                            placeholder='Type a message'
                            className='flex-1 border rounded p-2 m-2  outline-none'
                            value={newMessage}
                            onChange={handleMessageChange}
                            onKeyPress={handleKeyPress}

                        />
                        {newMessage.trim() !== '' &&
                            <VscSend className='absolute right-5 cursor-pointer' onClick={handleSendMessage} />
                        }
                    </div>
                </div>
            }
        </>

    )
}

export default MessageBox


const SingleMessage = ({ index, messages, message, user }) => {

    const isSenderSameOrLast = isSameSender(messages, message, index, user) || isLastMessage(messages, index, user);
    const isCurrentUser = user?.uid === message?.sender?.uuid
    const isGroupChat = message?.chat?.isGroupChat

    return (
        <div className='flex justify-center items-center' style={{ justifyContent: isCurrentUser ? 'flex-end' : 'start', marginBottom: isSenderSameOrLast ? '12px' : '' }}>
            {isSenderSameOrLast && isGroupChat &&
                <div className='mr-2'>
                    <img
                        src={message?.sender?.picture}
                        alt='profile picture'
                        className="rounded-full w-6 h-6 object-cover"
                    />
                </div>
            }

            <div className={`rounded-md text-wrap break-words whitespace-normal p-1 max-w-[45%] ${!isCurrentUser && !isSenderSameOrLast && isGroupChat ? 'ml-8' : ''} ${isCurrentUser ? 'bg-green-200' : 'bg-white'}`} >
                <div className='px-1'>{message.content}</div>
            </div>

        </div>
    )
}