import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { useChat } from '../../../context/ChatContext'
import Spinner from '../../../customComponents/Spinner'
import { basePath } from '../../../utils/basePath'
import { toast } from 'react-toastify'
import axios from 'axios'

const RemoveUser = ({ handleClose }) => {

    const { user } = useAuth()
    const { selectedChat, setSelectedChat } = useChat()

    const [searchValue, setSearchValue] = useState('')
    const [selectedUser, setSelectedUser] = useState(null)
    const [groupUsers, setGroupUsers] = useState([])
    const [isGroupLoading, setIsGroupLoading] = useState(false)

    useEffect(() => {
        setGroupUsers([...selectedChat?.users])
    }, [selectedChat])

    const handleChange = (e) => {
        const searchValue = e.target.value

        const filteredUsers = groupUsers.filter((user) =>
            user?.name?.toLowerCase().includes(searchValue?.toLowerCase()) ||
            user?.email?.toLowerCase().includes(searchValue?.toLowerCase())
        )

        setSearchValue(searchValue)
        if (searchValue == '') {
            setGroupUsers([...selectedChat?.users])
        } else {
            setGroupUsers(filteredUsers)
        }
    }

    const handleUserSelect = (user) => {
        if (selectedUser?._id === user?._id) {
            setSelectedUser(null)
        } else {
            setSelectedUser(user)
        }

    }

    const handleRemoveUser = async (e) => {
        e.preventDefault()

        const payload = {
            chatId: selectedChat?._id,
            user: selectedUser?._id
        }
        try {
            setIsGroupLoading(true)
            const response = await axios.put(`${basePath}/chat/removeUserFromGroupChat`,
                { ...payload },
                { headers: { Authorization: user?.accessToken } }
            )
            setSelectedChat(response?.data)
            handleClose()
            toast.success('User removed successfully')

        } catch (error) {
            console.log('error in removing user from group chat ', error)
            toast.error('something went wrong')
        } finally {
            setIsGroupLoading(false)
        }
    }

    return (
        <div className='flex flex-col justify-start items-start p-2 gap-3'>
            {isGroupLoading && <Spinner />}
            <div className='w-full'>
                <div className='w-full flex flex-col gap-2'>
                    <input
                        type='text'
                        placeholder='Search'
                        className='border rounded w-full h-10 px-3'
                        value={searchValue}
                        onChange={handleChange}
                    />
                    {selectedUser &&
                        <div className='w-1/4 flex items-center border rounded bg-green-500 p-1 gap-2' >
                            <img
                                src={selectedUser?.picture}
                                alt='profile picture'
                                className="rounded-full w-4 h-4 object-cover"
                            />
                            <span className='text-[10px] font-medium'>{selectedUser?.name}</span>
                        </div>
                    }
                    <div className='flex flex-col gap-2'>
                        <span>Group members</span>
                        <UserList
                            users={groupUsers}
                            selectedUser={selectedUser}
                            handleUserSelect={handleUserSelect}
                        />
                    </div>
                    {selectedUser &&
                        <div className='flex justify-end mt-3'>
                            <button
                                className='p-1 bg-green-700 rounded w-2/5 text-white text-center cursor-pointer'
                                onClick={handleRemoveUser}
                            >Remove</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default RemoveUser



const UserList = ({ users, selectedUser, handleUserSelect }) => {

    const baseStyle = 'flex justify-between items-center border rounded-md p-2 mr-1 mb-1 hover:bg-slate-100 cursor-pointer'

    const handleUserClick = (selectedUser) => {
        handleUserSelect(selectedUser)
    }


    return (
        <div className='overflow-y-auto gap-1' style={{ height: '300px' }}>
            {users.length === 0 &&
                <div className='flex justify-center items-center h-full text-[18px]'>No users found</div>
            }
            {users?.map((user) => {
                return (
                    <div className={baseStyle} key={user?._id} onClick={() => handleUserClick(user)}>
                        <div className='flex justify-center items-center gap-3'>
                            <img
                                src={user?.picture}
                                alt='profile picture'
                                className="rounded-full w-8 h-8 object-cover"
                            />
                            <div className='flex flex-col'>
                                <span className='text-[14px] font-medium'>{user?.name}</span>
                                <span className='text-[14px]'>{user?.email}</span>
                            </div>
                        </div>
                        <input
                            type='radio'
                            className='border rounded w-4 h-4 px-3 cursor-pointer'
                            checked={selectedUser?._id === user?._id}
                        // onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )
            })}
        </div>
    )
}






