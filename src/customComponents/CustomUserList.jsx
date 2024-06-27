import React from 'react'
import './scrollBar.css'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const baseStyle = 'flex justify-between items-center border rounded-md p-2 mr-1 mb-1 hover:bg-slate-100 cursor-pointer'

// existedUsersInGroup used for adding of users
const CustomUserList = ({ users, isLoading, selectedUsers, handleUserSelect, existedUsersInGroup }) => {

    const checkUserExistsInGroup = (selectedUser) => {
        const user = existedUsersInGroup?.find((user) => user._id === selectedUser._id);
        if (user) {
            return true
        }
        return false
    }

    const handleUserClick = (selectedUser) => {
        if (existedUsersInGroup) {
            const isUserExists = checkUserExistsInGroup(selectedUser)
            if (isUserExists) {
                return
            }
        }

        handleUserSelect(selectedUser)
    }

    const isInputChecked = (userId) => {
        return selectedUsers?.find((user) => user?._id === userId) || false
    }

    return (
        <div className='overflow-y-auto gap-1' style={{ height: '300px' }}>
            {isLoading &&
                <div className='flex justify-center items-center h-full'>
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                </div>
            }
            {!isLoading && users.length === 0 &&
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
                            type='checkbox'
                            className='border rounded w-4 h-4 px-3 cursor-pointer'
                            checked={isInputChecked(user?._id) || checkUserExistsInGroup(user)}
                            disabled={checkUserExistsInGroup(user)}
                        // onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default CustomUserList
