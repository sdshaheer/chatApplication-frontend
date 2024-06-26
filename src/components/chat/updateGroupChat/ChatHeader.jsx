import React from 'react'

const baseStyle = 'flex flex-grow items-center gap-1 rounded p-1 px-2 cursor-pointer'

const ChatHeader = ({ selectedTab, setSelectedTab }) => {

    const handleClick = (id) => {
        setSelectedTab(id)
    }

    return (
        <>
            <div className={`${baseStyle} ${selectedTab == 1 ? 'bg-green-400' : 'bg-slate-200'}`} onClick={() => handleClick(1)}>
                <img
                    src='https://static.vecteezy.com/system/resources/previews/023/087/351/non_2x/add-user-icon-in-line-style-social-media-button-concept-vector.jpg'
                    className="rounded-full w-6 h-6 object-cover border-2"
                />
                <span className='text-[10px] md:text-[14px] '>Add user</span>
            </div>
            <div className={`${baseStyle} ${selectedTab == 2 ? 'bg-green-400' : 'bg-slate-200'}`} onClick={() => handleClick(2)}>
                <img
                    src='https://cdn.create.vista.com/api/media/small/400599152/stock-vector-user-icon-remove-account-vector-illustration'
                    className="rounded-full w-6 h-6 object-cover border-2"
                />
                <span className='text-[10px] md:text-[14px] ' >Remove user</span>
            </div>
            <div className={`${baseStyle} ${selectedTab == 3 ? 'bg-green-400' : 'bg-slate-200'}`} onClick={() => handleClick(3)}>
                <img
                    src="https://cdn-icons-png.freepik.com/512/7580/7580275.png"
                    className="rounded-full w-6 h-6 object-cover border-2"
                />
                <span className='text-[10px] md:text-[14px] '>Others</span>
            </div>
        </>
    )
}

export default ChatHeader
