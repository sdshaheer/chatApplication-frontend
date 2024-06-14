import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IoClose } from "react-icons/io5";
import ModalWrapper from '../../../customComponents/ModalWrapper';


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

    return (
        <ModalWrapper open={openProfile} onClose={() => setOpenProfile(false)}>
            <div className='flex flex-col gap-3'>
                <div className='flex justify-end'>
                    <IoClose
                        size={20}
                        className='cursor-pointer'
                        onClick={() => setOpenProfile(false)}
                    />
                </div>
                <div className='flex justify-center items-center'>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHeAauIUsBhsM3QVZ2exTI1mQar3guK7QOwyalTAq9-rXvd0tjoAempPbN8H8tbIK5I8w&usqp=CAU"
                        className="rounded-full w-40 h-40 object-cover"
                    />
                </div>
                <div className='flex flex-col m-5 '>
                    <div className='flex gap-3 text-[18px] font-sans'>
                        <span>Name :</span>
                        <span>shaheer</span>
                    </div>
                    <div className='flex gap-3 text-[18px] '>
                        <span>Email :</span>
                        <span>sdshaheer786@gmail.com</span>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
}
