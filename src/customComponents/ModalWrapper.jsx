import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 450,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    p: 1,
};

export default function ModalWrapper({ open, onClose, children }) {

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 300,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md"
                >
                    {children}
                </Box>
            </Fade>
        </Modal>
    );
}
