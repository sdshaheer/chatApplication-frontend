import React, { useState } from 'react'
import Spinner from '../../../customComponents/Spinner'
import axios from 'axios'
import { basePath } from '../../../utils/basePath'
import { toast } from 'react-toastify'
import { useAuth } from '../../../context/AuthContext'
import { useChat } from '../../../context/ChatContext'

const Others = ({ handleClose }) => {

    const { user } = useAuth()
    const { selectedChat, setSelectedChat, fetchChats } = useChat()

    const [groupName, setGroupName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleRename = async (e) => {
        e.preventDefault()

        if (groupName?.trim() === '') {
            toast.error('please enter group name')
            return
        }

        const payload = {
            chatId: selectedChat?._id,
            groupName: groupName
        }
        try {
            setIsLoading(true)
            const response = await axios.put(`${basePath}/chat/renameGroupChat`,
                { ...payload },
                { headers: { Authorization: user?.accessToken } }
            )
            handleClose()
            fetchChats()
            setSelectedChat(response?.data)
            toast.success('Chat name changed successfully')

        } catch (error) {
            console.log('error in renaming group chat ', error)
            toast.error('something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex flex-col justify-start items-start p-2 gap-3 mt-3'>
            {isLoading && <Spinner />}
            <div className='w-full'>
                <div className='w-full flex flex-col gap-2'>
                    <input
                        type='text'
                        placeholder='Rename group '
                        className='border rounded w-full h-10 px-3'
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />

                    <div className='flex justify-end mt-3'>
                        <button
                            className='p-1 bg-green-700 rounded w-2/5 text-white text-center cursor-pointer'
                            onClick={handleRename}
                        >Rename</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Others
