import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [isSignedIn, setIsSignedIn] = useState(false)

    const checkAuthStatus = async () => {
        try {
            const { data } = await axios.get(
                'http://localhost:3000/api/users/google-authorize',
                { withCredentials: true },
            )

            getUser(data._id)
            setIsSignedIn(true)
        } catch (error) {
            setCurrentUser(null)
            setIsSignedIn(false)
        }
    }

    useEffect(() => {
        checkAuthStatus()
    }, []);

    const login = async (tokenId) => {

        try {

            const response = await axios.post(
                'http://localhost:3000/api/users/google-login',
                { token: tokenId },
                { withCredentials: true },
            )
            if (response.data) {
                setCurrentUser(response.data.user);
                setIsSignedIn(true);
            }
        } catch (error) {
            console.error('Server error during login:', error)
        }
    }

    const logout = async () => {
        try {
            console.log('logout tiggers!');
            const response = await axios.post(
                'http://localhost:3000/api/users/google-logout',
                null,
                { withCredentials: true },
            )
            if (response.status === 204) {
                setCurrentUser(null)
                setIsSignedIn(false)
            }
        } catch (error) {
            console.error('Server error during logout:', error)
        }
    }

    const getUser = async (userId) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/users/user/${userId}`,
            )

            setCurrentUser(response.data)
        } catch (error) {
            console.error('Error fetching user:', error)
        }
    }

    return (
        <UserContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                isSignedIn,
                setIsSignedIn,
                login,
                logout,
                checkAuthStatus,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)
