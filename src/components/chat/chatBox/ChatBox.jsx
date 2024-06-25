import React from 'react'
import { useChat } from '../../../context/ChatContext';
import ChatBoxHeader from './ChatBoxHeader';
import MessageBox from './MessageBox';


const ChatBox = () => {

    const { selectedChat, setSelectedChat } = useChat()

    const handleMoveBack = () => {
        setSelectedChat(null)
    }

    return (
        <div className='h-full p-3 flex flex-col gap-2'>
            {selectedChat &&
                <ChatBoxHeader handleMoveBack={handleMoveBack} />
            }
            <MessageBox />
        </div>
    )
}

export default ChatBox
