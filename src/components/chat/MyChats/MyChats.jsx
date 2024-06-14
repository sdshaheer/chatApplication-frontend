import React, { useState, useEffect } from 'react'
import { MdOutlineAddCircle } from "react-icons/md";
import axios from 'axios';
import { basePath } from '../../../utils/basePath';
import UserList from '../sidebar/UserList';
import { useAuth } from '../../../context/AuthContext';
import { useChat } from '../../../context/ChatContext';
import CreateNewGroupChat from './CreateNewGroupChat';
import Skeleton from 'react-loading-skeleton';
import { getChatPicture } from '../../../config/ChatLogics';
import './MyChats.css'

const MyChats = () => {

    // const { user } = useAuth()
    const { isChatsFetching, chats } = useChat()
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
            <div className='h-full flex flex-col p-3 gap-5'>
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
                    {isChatsFetching ? <ShowLoadingSkeleton /> :
                        <div className='mychats flex flex-col gap-2 h-full w-full absolute overflow-auto '>
                            {chats.map((chat) => {
                                return <SingleChat chat={chat} key={chat?._id} />
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


const SingleChat = ({ chat }) => {
    const { user } = useAuth()
    const { selectedChat, setSelectedChat } = useChat()
    const baseStyleOfChat = 'flex items-center rounded-md  gap-3 p-2 mr-1 cursor-pointer bg-slate-200'
    const hoverEffect = "hover:bg-slate-300";

    const handleSelectChat = () => {
        setSelectedChat(chat)
    }

    const isSelectedChat = selectedChat && selectedChat._id === chat._id;

    return (
        <div
            className={`${baseStyleOfChat} ${isSelectedChat ? 'bg-cyan-300' : hoverEffect}`}
            onClick={() => handleSelectChat()}
        >
            <div>
                <img
                    src={getChatPicture(chat, user)}
                    alt='profile picture'
                    className="rounded-full w-10 h-10 object-cover"
                />
            </div>
            <div>
                <div className='font-semibold '>{chat?.chatName ?? ''}</div>
                <div className='flex gap-1'>message here ....</div>
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
