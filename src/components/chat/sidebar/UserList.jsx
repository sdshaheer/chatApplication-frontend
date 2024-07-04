import React, { useState } from 'react'
import './SideBar.css'
import { useAuth } from '../../../context/AuthContext'
import { useChat } from '../../../context/ChatContext'
import axios from 'axios'
import { basePath } from '../../../utils/basePath'
import Spinner from '../../../customComponents/Spinner'

const UserList = ({ users, setDrawerOpen }) => {
    const { user } = useAuth()
    const { chats, setChats, setSelectedChat } = useChat()
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = async (userId) => {

        try {
            setIsLoading(true)
            const response = await axios.post(`${basePath}/chat/accessChat`,
                { userId: userId },
                { headers: { Authorization: user?.accessToken } },
            )

            // check if chat id already presents in chatContext 
            // add chat to chatContext if it was not present
            const tempChats = [...chats]
            const findedChat = tempChats.find((chat) => chat?._id == response.data?._id)
            if (!findedChat) {
                setChats((prevChats) => [response.data, ...prevChats]);
            }

            setSelectedChat(response?.data)
            setDrawerOpen(false)
        } catch (error) {
            console.log('error in accessing chat ', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {isLoading && <Spinner />}
            <div className='user-list flex flex-col gap-2 h-full overflow-auto'>
                {users.map((user) => {
                    return (
                        <div
                            className='flex items-center rounded-md gap-3 p-2 mr-1 cursor-pointer bg-slate-100 hover:bg-slate-300'
                            key={user?._id}
                            onClick={() => handleClick(user?._id)}
                        >
                            <div>
                                <img
                                    src={user?.picture}
                                    alt='profile picture'
                                    className="rounded-full w-10 h-10 object-cover"
                                />
                            </div>
                            <div>
                                <div className='font-semibold '>{user?.name ?? ''}</div>
                                <div className='flex gap-1'>
                                    <span className="">{user.email?.length > 23 ? `${user?.email.substring(0, 23)} ...` : user?.email}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default UserList
