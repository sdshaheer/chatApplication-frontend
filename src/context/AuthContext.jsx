import { React, useState, useEffect, createContext, useContext } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from 'firebase/auth'


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [isAuthLoading, setIsAuthLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser)
        return unsubscribe
    }, [])

    const initializeUser = (user) => {
        if (user) {
            const data = {
                accessToken: user?.accessToken,
                uid: user?.uid,
                email: user?.email
            }
            localStorage.setItem('user', JSON.stringify(data))
            setUser({ ...data })
            setIsUserLoggedIn(true)
        } else {
            localStorage.removeItem('user')
            setUser(null)
            setIsUserLoggedIn(false)
        }
        setIsAuthLoading(false)
    }

    const logout = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
                setIsUserLoggedIn(false);
                localStorage.removeItem('user');
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
    };


    const value = {
        user,
        isUserLoggedIn,
        isAuthLoading,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!isAuthLoading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}