import React, { useState, useEffect } from 'react'
import Spinner from '../../../customComponents/Spinner'
import axios from 'axios'
import { basePath } from '../../../utils/basePath'
import { toast } from 'react-toastify'
import { useAuth } from '../../../context/AuthContext'
import { useChat } from '../../../context/ChatContext'

import { FaCamera } from 'react-icons/fa';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../../firebase/firebase';
import defaultImage from '../../../assets/groupImage.jpeg'

const Others = ({ handleClose }) => {

    const { user } = useAuth()
    const { selectedChat, setSelectedChat, fetchChats } = useChat()

    const [groupName, setGroupName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState('')

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

    const handleExitGroup = async (e) => {
        e.preventDefault()


        try {
            setIsLoading(true)
            const response = await axios.post(`${basePath}/chat/exitGroup`,
                { chatId: selectedChat?._id },
                { headers: { Authorization: user?.accessToken } }
            )
            handleClose()
            fetchChats()
            setSelectedChat(null)
            toast.success('You left the group successfully')

        } catch (error) {
            console.log('error in exiting the group chat ', error)
            toast.error('something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    const handleFileChange = async (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const storageRef = ref(storage, `groupChat/${selectedChat?._id}/${file.name}`);
            setIsLoading(true)
            try {
                await uploadBytes(storageRef, file);
                const url = await getDownloadURL(storageRef);
                setImage(url);

                const response = await axios.put(`${basePath}/chat/updateGroupChat`,
                    { data: { groupPicture: url }, chatId: selectedChat?._id },
                    { headers: { Authorization: user?.accessToken } }
                )
                fetchChats()
                setSelectedChat(response?.data)
                toast.success('Group profile changed successfully')
            } catch (error) {
                console.error("Error uploading file:", error);
            } finally {
                setIsLoading(false)
            }
        }
    };

    return (
        <div className='flex flex-col justify-start items-start p-2 gap-3 mt-3'>
            {isLoading && <Spinner />}
            <div className='w-full flex flex-col'>
                <div className='flex justify-center items-center relative w-full'>
                    <img
                        src={image || selectedChat?.groupPicture || defaultImage}
                        alt="profile"
                        className="rounded-full w-20 h-20 md:w-40 md:h-40 object-cover"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="upload"
                    />
                    <label
                        htmlFor="upload"
                        // className="absolute bg-gray-500 inset-0 flex justify-center items-center bg-black bg-opacity-50 w-20 h-20 md:w-40 md:h-40 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300 left[37%] md:left-[31%]"
                        className="absolute bg-gray-500 inset-0 flex justify-center items-center bg-black bg-opacity-50 w-20 h-20 md:w-40 md:h-40 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300 "
                        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}

                    >
                        <FaCamera className="text-white text-xl" />
                    </label>
                </div>
                <div className='w-full flex flex-col gap-2 mt-3'>
                    <input
                        type='text'
                        placeholder='Rename group '
                        className='border rounded w-full h-10 px-3'
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />

                    <div className='flex justify-between mt-5'>
                        <button
                            className='p-1 bg-red-600 rounded w-2/5 text-white text-center cursor-pointer'
                            onClick={handleExitGroup}
                        >Exit Group</button>
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
