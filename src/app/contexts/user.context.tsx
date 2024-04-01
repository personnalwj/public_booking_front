"use client";

import { UserAction, UserMetadata } from '@/types/user.type';
import React, { createContext, useContext, useReducer } from 'react';
import { signOut } from 'supertokens-web-js/recipe/emailpassword';


export const UserContext = createContext<UserMetadata | null>(null);

const UserDispatchContext = createContext<React.Dispatch<UserAction>| null>(null);

const userReducer = (state: UserMetadata | null, action: UserAction): UserMetadata | null => {
    switch (action.type) {
        case 'added':
            return { ...state, ...action.payload };
        case 'removed':
            signOut();
            return initialState;
        default:
            return initialState;
    }
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, dispatch] = useReducer(userReducer, initialState)
    return (
        <UserContext.Provider value={user}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === null) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

export const useUserDispatch = () => {
    const context = useContext(UserDispatchContext);
    if (context === null) {
        throw new Error('useUserDispatch must be used within a UserProvider');
    }
    return context;
}

const initialState: UserMetadata = {
    email: '',
    first_name: '',
    last_name: '',
    id: '',   
};
