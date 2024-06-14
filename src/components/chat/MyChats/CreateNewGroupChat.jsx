import React from 'react'
import ModalWrapper from '../../../customComponents/ModalWrapper'
import { useState, useEffect } from 'react'
import useSearchUsers from '../../../hooks/useSearchUsers'
import CustomUserList from '../../../customComponents/CustomUserList'
import { useAuth } from '../../../context/AuthContext'
import { useChat } from '../../../context/ChatContext'
import { basePath } from '../../../utils/basePath'
import { toast } from 'react-toastify'
import axios from 'axios'
import Spinner from '../../../customComponents/Spinner'
import DisplaySelectedUsers from '../../../customComponents/DisplaySelectedUsers'

const CreateNewGroupChat = ({ openNewGroupForm, setOpenNewGroupForm }) => {
    const { user } = useAuth()
    const { setChats } = useChat()

    const [groupName, setGroupName] = useState('')
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

    const handleCreateGroup = async (e) => {
        e.preventDefault()
        if (groupName.trim == '') {
            toast.error('please enter Group name')
            return
        }
        if (selectedUsers?.length === 0) {
            toast.error('please add atleast one user')
            return
        }

        const payload = {
            groupName: groupName,
            users: [...selectedUsers]
        }
        try {
            setIsGroupLoading(true)
            const response = await axios.post(`${basePath}/chat/createGroupChat`,
                { ...payload },
                { headers: { Authorization: user?.accessToken } }
            )
            setChats((prevChats) => [response?.data, ...prevChats])
            setOpenNewGroupForm(false)
            toast.success('group chat created successfully')

        } catch (error) {
            console.log('error in creating groupChat ', error)
            toast.error('something went wrong')
        } finally {
            setIsGroupLoading(false)
        }
    }


    return (
        <ModalWrapper open={openNewGroupForm} onClose={() => setOpenNewGroupForm(false)}>
            {isGroupLoading && <Spinner />}
            <div className='flex flex-col justify-start items-start p-2 gap-3'>
                <div className='text-[20px] font-bold'>Create New Group</div>
                <div className='w-full'>
                    <div className='w-full flex flex-col gap-2'>
                        <input
                            type='text'
                            placeholder='Group name'
                            className='border rounded w-full h-10 px-3'
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
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
                            />
                        </div>
                        {selectedUsers?.length > 0 &&
                            <div className='flex justify-end mt-3'>
                                <button
                                    className='p-1 bg-green-700 rounded w-1/4 text-white text-center cursor-pointer'
                                    onClick={handleCreateGroup}
                                >Create</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </ModalWrapper>
    )
}

export default CreateNewGroupChat


