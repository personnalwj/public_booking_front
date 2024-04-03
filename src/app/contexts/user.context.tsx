"use client";

import { UserAction, UserResponse } from '@/types/user.type';
import React, { createContext, useContext, useReducer } from 'react';
import { signOut } from 'supertokens-web-js/recipe/emailpassword';



export const UserContext = createContext<UserResponse | null>(null);

export const UserDispatchContext = createContext<React.Dispatch<UserAction>| null>(null);

const userReducer = (state: UserResponse | null, action: UserAction): UserResponse | null => {
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

export const UserProvider: React.FC<{ children: React.ReactNode, value: UserResponse | null }> = ({ children, value }) => {

    const init = value ? value : initialState;
    /**
     *  react useReducer hook don't update the context value if the initial value is updated
     *  https://github.com/facebook/react/issues/22712
     * 
     * */
    const [, dispatch] = useReducer(userReducer, init);
    return (
        <UserContext.Provider value={init}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    return context;
}

export const useUserDispatch = () => {
    const context = useContext(UserDispatchContext);
    return context;
}

const initialState = null;
