import React, { useState } from 'react'
import Login from '../components/authentication/Login';
import SignUp from '../components/authentication/SignUp';

const baseStyle = 'border rounded-full p-1 px-10 flex-grow text-center cursor-pointer'
const HomePage = () => {
    const [isLoginPage, setIsLoginPage] = useState(true)

    const handleChange = (value) => {
        if (value === 'login') {
            setIsLoginPage(true)
        } else {
            setIsLoginPage(false)
        }
    }

    return (
        <div className='flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center bg-white p-8 border rounded-lg sm:w-3/6 md:w-2/6 mt-20 gap-10'>
                <div className='w-full flex flex-col md:flex md:flex-row gap-2'>
                    <div className={`${baseStyle} ${isLoginPage ? 'bg-blue-100' : ''}`} onClick={() => handleChange('login')}>Login</div>
                    <div className={`${baseStyle} ${!isLoginPage ? 'bg-blue-100' : ''}`} onClick={() => handleChange('signUp')}>Sign Up</div>
                </div>
                <div className='w-full'>
                    {isLoginPage ? <Login /> : <SignUp setIsLoginPage={setIsLoginPage} />}
                </div>
            </div>
        </div>
    )
}

export default HomePage
