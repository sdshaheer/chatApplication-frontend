import React, { useState } from 'react'
import { Drawer } from '@mui/material';
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import useSearchUsers from '../../../hooks/useSearchUsers';
import UserList from './UserList';
import Skeleton from 'react-loading-skeleton';
import './SideBar.css'
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';


const SideBar = ({ drawerOpen, setDrawerOpen }) => {
    const { user } = useAuth()
    const [searchValue, setSearchValue] = useState('')
    const { isLoading, users } = useSearchUsers(searchValue, 500)

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setDrawerOpen(open);
    };

    return (
        <div>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                className='h-screen'
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 300, // Custom width
                        transition: 'width 0.5s ease', // Smooth transition
                        overflow: 'hidden'
                    },
                }}
            >
                <div className='h-full m-2 flex flex-col'>
                    <div className='flex items-center relative mb-5'>
                        <CiSearch className='absolute right-2' />
                        <input
                            type="text"
                            placeholder='Search here'
                            className='w-full p-2 rounded-md border-2'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                    <div className='flex-grow overflow-hidden mb-3'>
                        {isLoading ?
                            (Array.from(new Array(15)).map((_, index) => (
                                <div key={index} style={{ marginBottom: '5px' }}>
                                    <Skeleton height={50} />
                                </div>))) :
                            <UserList
                                users={users}
                                setDrawerOpen={setDrawerOpen}
                            />
                        }
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default SideBar

