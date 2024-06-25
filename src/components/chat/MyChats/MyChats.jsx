import React, { useState, useEffect } from 'react'
import { MdOutlineAddCircle } from "react-icons/md";
import axios from 'axios';
import { basePath } from '../../../utils/basePath';
import UserList from '../sidebar/UserList';
import { useAuth } from '../../../context/AuthContext';
import { useChat } from '../../../context/ChatContext';
import CreateNewGroupChat from './CreateNewGroupChat';
import Skeleton from 'react-loading-skeleton';
import { getChatPicture, getChatName } from '../../../config/ChatLogics';
import './MyChats.css'

const MyChats = () => {

    // const { user } = useAuth()
    const { isChatsFetching, chats, notifications, setNotifications } = useChat()
    // const [isLoading, setIsLoading] = useState(false)
    const [openNewGroupForm, setOpenNewGroupForm] = useState(false)

    // useEffect(() => {
    //     getChats()
    // }, [])

    // const getChats = async () => {
    //     try {
    //         setIsLoading(true)
    //         const response = await axios.get(`${basePath}/chat/getAllChats`,
    //             { headers: { Authorization: user?.accessToken } }
    //         )
    //         // setChats([...response?.data, ...response?.data, ...response?.data, ...response?.data])
    //         setChats([...response?.data])
    //     } catch (error) {
    //         console.log('error in getting all chats of user', error)
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }

    const handleCreateNewGroup = () => {
        setOpenNewGroupForm(true)
    }


    return (
        <>
            <div className='h-full flex flex-col p-3 gap-5 rounded-md'>
                <div className='flex justify-between'>
                    <span className='text-[20px]'>My Chats</span>
                    <div
                        className='flex items-center gap-2 px-3 py-1 cursor-pointer rounded-md border bg-slate-200'
                        onClick={handleCreateNewGroup}
                    >
                        <span>New Group</span>
                        <MdOutlineAddCircle size={24} />
                    </div>
                </div>
                <div className='flex-grow relative p-1'>
                    {!isChatsFetching && chats?.length === 0 &&
                        <div className='flex justify-center mt-16 h-full text-[18px] text-gray-500'>No chats found</div>
                    }
                    {isChatsFetching ? <ShowLoadingSkeleton /> :
                        <div className='mychats flex flex-col gap-2 h-full w-full absolute overflow-auto '>
                            {chats.map((chat) => {
                                return (
                                    <SingleChat
                                        chat={chat}
                                        key={chat?._id}
                                        notifications={notifications}
                                        setNotifications={setNotifications}
                                    />
                                )
                            })}
                        </div>
                    }
                </div>
            </div>
            {openNewGroupForm &&
                <CreateNewGroupChat
                    openNewGroupForm={openNewGroupForm}
                    setOpenNewGroupForm={setOpenNewGroupForm}
                />
            }
        </>
    )
}

export default MyChats


const SingleChat = ({ chat, notifications, setNotifications }) => {
    const { user } = useAuth()
    const { selectedChat, setSelectedChat } = useChat()
    const baseStyleOfChat = 'flex items-center rounded-md  gap-3 p-2 mr-1 cursor-pointer'
    const hoverEffect = "hover:bg-slate-300";

    const isSelectedChat = selectedChat && selectedChat._id === chat._id;
    const newMessages = notifications?.filter((message) => message.chat?._id === chat?._id)

    console.log('in single chat', notifications, newMessages, chat?._id)
    const handleSelectChat = () => {
        const filteredNotifications = notifications?.filter((message) => message.chat?._id !== chat?._id)
        setNotifications([...filteredNotifications])
        setSelectedChat(chat)
    }

    return (
        <div
            className={`${baseStyleOfChat} ${isSelectedChat ? 'bg-cyan-300' : `bg-slate-200 ${hoverEffect}`}`}
            onClick={handleSelectChat}
        >
            <div className=''>
                <img
                    src={getChatPicture(chat, user)}
                    alt='profile picture'
                    className="rounded-full w-10 h-10 object-cover"
                />
            </div>
            <div className='flex-grow'>
                <div className='font-semibold '>{getChatName(chat, user)}</div>
                <div className='flex justify-between items-center'>
                    <div className=''>{newMessages?.length > 0 ? newMessages?.[0]?.content?.substring(0, 15) : chat?.latestMessage?.content?.substring(0, 15)}</div>
                    {selectedChat?._id !== chat?._id && newMessages?.length > 0 &&
                        <div className='rounded-full w-5 h-5 bg-green-600 flex justify-center items-center text-[12px] text-white'>{newMessages?.length}</div>
                    }
                </div>
            </div>
        </div>
    )
}

const ShowLoadingSkeleton = () => {
    return (
        <div className="space-y-5">
            {[...Array(9)].map((_, index) => (
                <Skeleton key={`${index}-skeleton-mychats`} height={60} />
            ))}
        </div>
    );
};
