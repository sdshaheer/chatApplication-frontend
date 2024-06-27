import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { basePath } from '../utils/basePath'
import { useAuth } from '../context/AuthContext'

const useSearchUsers = (searchValue, delay) => {
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState([])
    const { user } = useAuth()

    const searchUsers = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${basePath}/user/searchUsers`,
                {
                    headers: { Authorization: user?.accessToken },
                    params: { searchValue: searchValue }
                }
            )
            // setUsers([...response.data, ...response.data, ...response.data, ...response.data, ...response.data])
            setUsers([...response.data])
        } catch (error) {
            console.log('error in searching users ', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {

        let timer = setTimeout(() => {
            searchUsers()
        }, delay)

        return () => {
            clearTimeout(timer);
            setUsers([])
        };

    }, [searchValue])

    return { isLoading, users }
}

export default useSearchUsers
