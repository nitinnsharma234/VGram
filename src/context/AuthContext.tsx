import { getCurrentUser } from '@/lib/appwrite/api';
import { IUser } from '@/types';
import { log } from 'console';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export type IContextType = {
    user: IUser,
    isLoading: boolean,
    isAuthenticated: boolean,
    setUser: React.Dispatch<React.SetStateAction<IUser>>,
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    checkAuthUser: () => Promise<boolean>
}

export const INITIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: '',

};
const INTIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => { },
    setIsAuthenticated: () => { },
    checkAuthUser: async () => false as boolean,
}
const AuthContext = createContext<IContextType>(INTIAL_STATE);


const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate =useNavigate();
    const checkAuthUser = async () => {
        try {
            const currAccount = await getCurrentUser();
            if (currAccount) {
                setUser({
                    id: currAccount.$id,
                    name: currAccount.name,
                    username: currAccount.username,
                    email: currAccount.email,
                    imageUrl: currAccount.imageUrl,
                    bio: currAccount.bio,
                })
                setIsAuthenticated(true);
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        if (localStorage.getItem('cookieFallback') === '[]') navigate('/sign-in')

        checkAuthUser();
    }, [])
    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useUserContext=()=>useContext(AuthContext);