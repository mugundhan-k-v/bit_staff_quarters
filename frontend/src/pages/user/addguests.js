import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../component/userPageLayout';
import { FacultyContext } from '../../context/FacultyContext';

const AddGuestPage = () => {
    const { facultyId } = useContext(FacultyContext); // Get facultyId from context
    const [guestCount, setGuestCount] = useState('');
    const [from, setFrom] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guestNames, setGuestNames] = useState([]);
    const navigate = useNavigate();

    const generateCode = () => {
        let code = '';
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        for (let i = 0; i < 8; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const guests = guestNames.filter(name => name.trim() !== ''); // Remove any empty names
        const guestData = { guests, from, checkIn, checkOut, code: generateCode(), facultyId }; // Include facultyId

        try {
            const response = await fetch('http://localhost:5000/api/guests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(guestData),
            });

            if (!response.ok) {
                throw new Error('Failed to add guest');
            }

            navigate('/guestdetails');
        } catch (error) {
            console.error('Error adding guest:', error);
        }
    };

    const handleCancel = () => {
        navigate('/guestdetails');
    };

    const handleGuestCountChange = (e) => {
        const count = parseInt(e.target.value, 10);
        setGuestCount(count);
        if (!isNaN(count)) {
            setGuestNames(Array.from({ length: count }, () => ''));
        } else {
            setGuestNames([]);
        }
    };

    const handleGuestNameChange = (index, name) => {
        const updatedNames = [...guestNames];
        updatedNames[index] = name;
        setGuestNames(updatedNames);
    };

    return (
        <PageLayout>
            <div className="add-page">
                <div className="content">
                    <form onSubmit={handleSubmit}>
                        <h1>Add New Guest</h1>
                        <input type="number" placeholder="No of Guests" value={guestCount} onChange={handleGuestCountChange} />
                        {guestNames.map((guestName, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder={`Guest ${index + 1} Name`}
                                value={guestName}
                                onChange={(e) => handleGuestNameChange(index, e.target.value)}
                            />
                        ))}
                        <input type="text" placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)} />
                        <input type="datetime-local" placeholder="Check-in" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                        <input type="datetime-local" placeholder="Check-out" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                        <button type="button" onClick={handleCancel}>Cancel</button>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </PageLayout>
    );
};

export default AddGuestPage;