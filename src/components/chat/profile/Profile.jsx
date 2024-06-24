import React, { useState, useEffect } from 'react';
import { FaCamera } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";
import ModalWrapper from '../../../customComponents/ModalWrapper';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../../firebase/firebase';
import { useAuth } from '../../../context/AuthContext'
import { basePath } from '../../../utils/basePath'
import axios from 'axios'
import { MdOutlineModeEditOutline } from "react-icons/md";
import defaultImage from '../../../assets/singleUser.jpg'

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 1,
};

export default function Profile({ openProfile, setOpenProfile }) {

    const { user } = useAuth()
    const [image, setImage] = useState('')
    const [userDetails, setUserDetails] = useState()
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        getUserDetails()
    }, [])

    const getUserDetails = async () => {
        try {
            const response = await axios.get(`${basePath}/user/getUserDetails`,
                { headers: { Authorization: user?.accessToken } }
            )
            setUserDetails(response.data)
        } catch (error) {
            console.log('error in getting user details ', error)
        }
    }

    const handleFileChange = async (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const storageRef = ref(storage, `${user?.uid}/${file.name}`);

            try {
                await uploadBytes(storageRef, file);
                const url = await getDownloadURL(storageRef);
                setImage(url);

                await axios.put(`${basePath}/user/updateUser`,
                    { data: { picture: url } },
                    { headers: { Authorization: user?.accessToken } }
                )
                getUserDetails()
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };

    const handleNameChange = (e) => {
        const { name, value } = e.target
        setUserDetails({ ...userDetails, [name]: value })
    }

    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            try {
                await axios.put(`${basePath}/user/updateUser`,
                    { data: { name: userDetails?.name } },
                    { headers: { Authorization: user?.accessToken } }
                )
                setIsEdit(false)
                getUserDetails()
            } catch (error) {
                console.error("Error in changing name:", error);
            }
        }

    }

    return (
        <ModalWrapper open={openProfile} onClose={() => setOpenProfile(false)}>
            <div className='flex flex-col gap-3 w-full'>
                <div className='flex justify-end'>
                    <IoClose
                        size={20}
                        className='cursor-pointer'
                        onClick={() => setOpenProfile(false)}
                    />
                </div>
                <div className='flex justify-center items-center relative group w-full'>
                    <img
                        src={image || userDetails?.picture || defaultImage}
                        alt="profile"
                        className="rounded-full w-40 h-40 object-cover"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="upload"
                    />
                    <label
                        htmlFor="upload"
                        className="absolute bg-gray-500 inset-0 flex justify-center items-center bg-black bg-opacity-50 w-40 h-40 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300 left-[31.5%]"
                    >
                        <FaCamera className="text-white text-xl" />
                    </label>
                </div>
                <div className='flex flex-col m-5 '>
                    <div className='flex  items-center gap-3 text-[18px] font-sans'>
                        <span>Name :</span>
                        {isEdit ? <input
                            name="name"
                            type="text"
                            className="border-b focus"
                            value={userDetails?.name}
                            onChange={handleNameChange}
                            onKeyPress={handleKeyPress}

                        /> : <span>{userDetails?.name}</span>
                        }
                        {!isEdit &&
                            <MdOutlineModeEditOutline
                                onClick={() => setIsEdit(true)}
                                className='cursor-pointer'
                            />
                        }
                    </div>
                    <div className='flex gap-3 text-[18px] '>
                        <span>Email :</span>
                        <span>{userDetails?.email}</span>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
}
