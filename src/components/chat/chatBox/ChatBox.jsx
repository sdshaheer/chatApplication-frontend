import React from 'react'
import { useChat } from '../../../context/ChatContext';
import ChatBoxHeader from './ChatBoxHeader';



const ChatBox = () => {

    const { selectedChat, setSelectedChat } = useChat()

    const handleMoveBack = () => {
        setSelectedChat(null)
    }

    return (
        <div className='h-full p-3 flex flex-col gap-3'>
            {selectedChat &&
                <ChatBoxHeader handleMoveBack={handleMoveBack} />
            }
            <div className='flex-grow bg-white rounded-md'>
                {!selectedChat ?
                    <div className='h-full flex justify-center items-center text-[20px] text-gray-500'>Click on a user to start Chatting</div>
                    : ''
                }
            </div>
        </div>
    )
}

export default ChatBox
