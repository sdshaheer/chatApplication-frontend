import React from 'react'
import TopBar from '../components/chat/TopBar'
import MyChats from '../components/chat/MyChats/MyChats'
import ChatBox from '../components/chat/chatBox/ChatBox'
import { useChat } from '../context/ChatContext'

const ChatPage = () => {
    const { selectedChat } = useChat()

    return (
        <div className='w-full h-full flex flex-col'>
            <div className='bg-white h-12'>
                <TopBar />
            </div>
            <div className='flex flex-grow'>
                <div className={`bg-white w-full m-2 rounded-md ${selectedChat ? 'hidden md:block' : ''} md:w-[30%]`}>
                    <MyChats />
                </div>
                <div className={`${selectedChat ? 'bg-blue-100' : 'bg-white'} w-full ${selectedChat ? 'block' : 'hidden'} md:block md:w-[70%] m-2 rounded-md ml-0`}>
                    <ChatBox />
                </div>
            </div >
        </div >
    )
}

export default ChatPage
