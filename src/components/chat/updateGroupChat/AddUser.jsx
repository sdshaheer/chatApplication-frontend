import React, { useState } from 'react'
import DisplaySelectedUsers from '../../../customComponents/DisplaySelectedUsers'
import useSearchUsers from '../../../hooks/useSearchUsers'
import CustomUserList from '../../../customComponents/CustomUserList'
import { useChat } from '../../../context/ChatContext'
import { useAuth } from '../../../context/AuthContext'
import axios from 'axios'
import { basePath } from '../../../utils/basePath'
import Spinner from '../../../customComponents/Spinner'
import { toast } from 'react-toastify'

const AddUser = ({ handleClose }) => {

    const { user } = useAuth()
    const { selectedChat, setSelectedChat } = useChat()

    const [searchValue, setSearchValue] = useState('')
    const [selectedUsers, setSelectedUsers] = useState([])
    const [isGroupLoading, setIsGroupLoading] = useState(false)


    const { isLoading, users } = useSearchUsers(searchValue)

    const handleChange = (e) => {
        setSearchValue(e.target.value)
    }

    const handleUserSelect = (selectedUser) => {

        // find userId exists or not
        const userIndex = selectedUsers.findIndex((user) => user._id === selectedUser._id);

        // if existed remove it else add it
        if (userIndex !== -1) {
            const updatedUsers = [...selectedUsers];
            updatedUsers.splice(userIndex, 1);
            setSelectedUsers([...updatedUsers])
        } else {
            setSelectedUsers((pre) => [...pre, selectedUser])
        }
    }

    const handleAddUsers = async (e) => {
        e.preventDefault()

        if (selectedUsers.length === 0) {
            toast.error('please add atleast one user')
            return
        }


        const payload = {
            chatId: selectedChat?._id,
            users: selectedUsers?.map((user) => user?._id)
        }
        try {
            setIsGroupLoading(true)
            const response = await axios.put(`${basePath}/chat/addUserToGroupChat`,
                { ...payload },
                { headers: { Authorization: user?.accessToken } }
            )
            setSelectedChat(response?.data)
            handleClose()
            toast.success('Users added successfully')

        } catch (error) {
            console.log('error in adding users to group chat ', error)
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
                    {selectedUsers?.length > 0 &&
                        <div className='flex flex-col gap-2 mb-3'>
                            <div className='flex flex-wrap gap-1 p-1 border-2 rounded overflow-y-auto' style={{ maxHeight: '65px' }}>
                                <DisplaySelectedUsers users={selectedUsers} />
                            </div>
                        </div>
                    }
                    <div className='flex flex-col gap-2'>
                        <span>All users</span>
                        <CustomUserList
                            users={users}
                            isLoading={isLoading}
                            selectedUsers={selectedUsers}
                            handleUserSelect={handleUserSelect}
                            existedUsersInGroup={selectedChat?.users}
                        />
                    </div>
                    {selectedUsers?.length > 0 &&
                        <div className='flex justify-end mt-3'>
                            <button
                                className='p-1 bg-green-700 rounded w-2/5 text-white text-center cursor-pointer'
                                onClick={handleAddUsers}
                            >Add {selectedUsers.length} {selectedUsers.length === 1 ? 'person' : 'people'}</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default AddUser
