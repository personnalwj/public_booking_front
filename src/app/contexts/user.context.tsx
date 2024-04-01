"use client";

import React, { createContext, useContext, useReducer } from 'react';
import { signOut } from 'supertokens-web-js/recipe/emailpassword';

interface UserContext {
    firstName: string;
    lastName: string;
    email: string;
}
interface UserAction {
    type: 'add' | 'remove';
    payload: UserContext;
}
export const UserContext = createContext<UserContext | undefined>(undefined);

const UserDispatchContext = createContext<React.Dispatch<UserAction>| undefined>(undefined);

const userReducer = (state: UserContext, action: UserAction): UserContext => {
    switch (action.type) {
        case 'add':
            return { ...state, ...action.payload };
        case 'remove':
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
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

export const useUserDispatch = () => {
    const context = useContext(UserDispatchContext);
    if (context === undefined) {
        throw new Error('useUserDispatch must be used within a UserProvider');
    }
    return context;
}

const initialState: UserContext = {
    firstName: 'willy',
    lastName: 'NYANTCHOU',
    email: 'noubissiew@local.com'
}
