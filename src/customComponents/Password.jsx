import React, { useState } from 'react'
import { TextField, InputAdornment } from '@mui/material';
import { MdVisibilityOff } from "react-icons/md";
import { MdVisibility } from "react-icons/md";

const Password = ({ id, name, label, value, errorMessage, customHandleChange }) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <TextField
            id={id}
            name={name}
            label={label}
            type={showPassword ? 'text' : 'password'}
            size="medium"
            value={value}
            onChange={customHandleChange}
            fullWidth
            required
            error={!!errorMessage}
            helperText={errorMessage}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        {showPassword ? (
                            <MdVisibility onClick={() => setShowPassword(false)} style={{ cursor: 'pointer' }} />
                        ) : (
                            <MdVisibilityOff onClick={() => setShowPassword(true)} style={{ cursor: 'pointer' }} />
                        )}
                    </InputAdornment>
                ),
            }}
        />
    )
}

export default Password
