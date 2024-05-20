'use client';
import React, { useState } from 'react';

interface BookingFormProps {
    onSubmit: (bookingData: BookingData) => void;
}

interface BookingData {
    name: string;
    date: string;
    // Add more fields as needed
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const bookingData: BookingData = {
            name,
            date,
            // Set other fields here
        };
        onSubmit(bookingData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Date:
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
            {/* Add more input fields for other booking details */}
            <button type="submit">Create Booking</button>
        </form>
    );
};

export default BookingForm;