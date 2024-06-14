import React from 'react'

const DisplaySelectedUsers = ({ users }) => {
    return (
        <>
            {users?.map((user) => {
                return (
                    <div className='flex items-center border rounded bg-green-500 p-1 gap-2' key={user?._id}>
                        <img
                            src={user?.picture}
                            alt='profile picture'
                            className="rounded-full w-4 h-4 object-cover"
                        />
                        <span className='text-[10px] font-medium'>{user?.name}</span>
                    </div>
                )
            })}
        </>
    )
}

export default DisplaySelectedUsers
