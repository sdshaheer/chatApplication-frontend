import React, { useState } from 'react'
import { TextField, Button, Grid } from '@mui/material';
import { doSignUpWithEmailAndPassword } from '../../firebase/auth';
import Password from '../../customComponents/Password';
import { toast } from 'react-toastify';
import Spinner from '../../customComponents/Spinner';
import { basePath } from '../../utils/basePath';
import axios from 'axios';

const SignUp = ({ setIsLoginPage }) => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [formErrors, setFormErrors] = useState({})

    const handleChange = (e) => {
        let { name, value } = e.target

        if (formErrors[name]) {
            setFormErrors({ ...formErrors, [name]: '' })
        }
        setData({ ...data, [name]: value })
    }

    const validateData = () => {
        let errors = {}
        Object.entries(data).forEach(([key, value]) => {
            if (value == '') {
                errors[key] = 'This field is required'
            }
        });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (data.email && !emailRegex.test(data.email)) {
            errors.email = "Email is not valid.";
        }

        if ((data.password && data.confirmPassword) && data.password !== data.confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }

        setFormErrors({ ...errors })
        return Object.keys(errors).length !== 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isErrorFound = validateData()

        if (isErrorFound) {
            return
        }

        try {
            setIsLoading(true)
            const firebaseResponse = await doSignUpWithEmailAndPassword(data.email, data.password)
            console.log('sign up with email and password', firebaseResponse)
            const dataViaGmailLogin = {
                uuid: firebaseResponse?.user?.uid,
                name: data?.name,
                email: firebaseResponse?.user?.email
            }
            const mongoResponse = await axios.post(`${basePath}/userAuth/createUser`, { ...dataViaGmailLogin })
            setIsLoginPage(true)
            toast.success('Account created successfully')

        } catch (error) {
            console.error('error in logging with email and password', error.message)
            toast.error(error?.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            {isLoading && <Spinner />}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        id="name"
                        name="name"
                        label="Name"
                        size="medium"
                        value={data.name}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!formErrors.name}
                        helperText={formErrors.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        size="medium"
                        value={data.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    {/* <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        size="medium"
                        value={data.password}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!formErrors.password}
                        helperText={formErrors.password}
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
                    /> */}
                    <Password
                        id="password"
                        name="password"
                        label="Password"
                        value={data.password}
                        customHandleChange={handleChange}
                        errorMessage={formErrors.password}
                    />
                </Grid>
                <Grid item xs={12}>
                    {/* <TextField
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        size="medium"
                        value={data.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!formErrors.confirmPassword}
                        helperText={formErrors.confirmPassword}
                    /> */}
                    <Password
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        value={data.confirmPassword}
                        customHandleChange={handleChange}
                        errorMessage={formErrors.confirmPassword}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        sx={{ width: '100%', backgroundColor: '#1d28f5' }}
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default SignUp
