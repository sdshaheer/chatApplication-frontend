import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { getChatPicture, getChatName } from '../../../config/ChatLogics';
import { LiaEditSolid } from "react-icons/lia";
import { useAuth } from '../../../context/AuthContext';
import { useChat } from '../../../context/ChatContext';
import UpdateGroupChat from '../updateGroupChat/UpdateGroupChat';
import { isGroupAdmin } from '../../../config/ChatLogics';
import ImageBox from './ImageBox';

const ChatBoxHeader = ({ handleMoveBack }) => {

    const { user } = useAuth()
    const { selectedChat } = useChat()

    const [isOpen, setIsOpen] = useState(false)
    const [showImageModal, setShowImageModal] = useState(false)

    const handleEdit = () => {
        setIsOpen(true)
    }

    return (
        <>
            <div className='flex justify-between items-center p-2 rounded-md  bg-slate-300'>
                <div className='flex items-center gap-3'>
                    <div className='block md:hidden cursor-pointer' onClick={handleMoveBack}>
                        <IoIosArrowRoundBack size={24} />
                    </div>
                    <div className='flex items-center gap-3'>
                        <div>
                            <img
                                src={getChatPicture(selectedChat, user)}
                                alt='profile picture'
                                className="rounded-full w-8 h-8 object-cover cursor-pointer"
                                onClick={() => setShowImageModal(true)}
                            />
                        </div>
                        <div>{getChatName(selectedChat, user)}</div>
                    </div>
                </div>
                <div>
                    {selectedChat?.isGroupChat && isGroupAdmin(selectedChat, user) &&
                        <LiaEditSolid size={24} className='cursor-pointer' onClick={handleEdit} />
                    }
                </div>
            </div>
            {isOpen &&
                <UpdateGroupChat
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            }
            {showImageModal &&
                <ImageBox
                    isOpen={showImageModal}
                    setIsOpen={setShowImageModal}
                />
            }

        </>
    )
}

export default ChatBoxHeader
