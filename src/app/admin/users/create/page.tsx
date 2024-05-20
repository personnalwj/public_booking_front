'use client';

import UserForm from '@/forms/user.form';
import React, { useState } from 'react';

interface User {
    name: string;
    email: string;
}

const CreateUserForm: React.FC = () => {
    const [user, setUser] = useState<User>({
        name: '',
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Here you can perform any logic to create the user
        console.log(user);
        // Reset the form
        setUser({
            name: '',
            email: '',
        });
    };

    return (
        <div className='mx-auto my-2'>
            <h2 className='text-xl font-bold text-center m-4'>Ajouter un membre à votre assemblée</h2>
            <UserForm />
        </div>
    );
};

export default CreateUserForm;