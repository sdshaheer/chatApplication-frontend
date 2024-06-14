import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import SideBar from './sidebar/SideBar';
import { Menu, Dropdown } from 'antd';
import { HiDotsVertical } from "react-icons/hi";
import Profile from './profile/Profile';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../../context/ChatContext';

const TopBar = () => {
    const { logout } = useAuth()
    const { clearChatContext } = useChat()
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState(false)

    const navigate = useNavigate()

    const handleMenuClick = (value) => {
        if (value == 'profile') {
            setOpenProfile(true)
        }
        if (value == 'logout') {
            clearChatContext()
            logout()
            navigate('/')
        }
    }


    const menu = (
        <Menu onClick={(e) => handleMenuClick(e.key)}>
            <Menu.Item key="profile" >
                Profile
            </Menu.Item>
            <Menu.Item key="logout" >
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <div className='h-full flex justify-between items-center'>
                <div
                    className='flex items-center gap-3 ml-2 py-1 px-4 border rounded cursor-pointer hover:bg-gray-100'
                    onClick={() => setDrawerOpen(true)}
                >
                    <CiSearch />
                    <span className='font-semibold'>Search User</span>
                </div>
                <div className='font-bold text-[18px]'>
                    Chat Application
                </div>
                <div className='flex justify-between items-center gap-2'>
                    <div>
                        <IoIosNotifications size={24} />
                    </div>
                    <div className='mr-2'>
                        <Dropdown overlay={menu} placement="bottomLeft" className='cursor-pointer'>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <HiDotsVertical />
                            </a>
                        </Dropdown>
                    </div>
                </div>
            </div>
            {drawerOpen &&
                <SideBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
            }
            {openProfile &&
                <Profile openProfile={openProfile} setOpenProfile={setOpenProfile} />
            }
        </>

    )
}

export default TopBar
