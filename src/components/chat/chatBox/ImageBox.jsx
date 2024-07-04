import React from 'react'
import ModalWrapper from '../../../customComponents/ModalWrapper'
import { useAuth } from '../../../context/AuthContext'
import { useChat } from '../../../context/ChatContext'
import { getChatPicture } from '../../../config/ChatLogics'

const ImageBox = ({ isOpen, setIsOpen }) => {

    const { user } = useAuth()
    const { selectedChat } = useChat()

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <ModalWrapper open={isOpen} onClose={handleClose}>
            <div className='w-full'>
                <img
                    src={getChatPicture(selectedChat, user)}
                    alt='other user picture'
                    className="w-full max-h-48 object-cover"
                />
            </div>
        </ModalWrapper>
    )
}

export default ImageBox
