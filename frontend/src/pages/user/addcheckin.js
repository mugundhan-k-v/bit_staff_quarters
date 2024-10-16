import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../component/userPageLayout';
import { FacultyContext } from '../../context/FacultyContext';

const AddCheckinPage = () => {
    const [name, setName] = useState('');
    const [checkinTime, setCheckinTime] = useState('');
    const [checkoutTime, setCheckoutTime] = useState('');
    const navigate = useNavigate();
    const { facultyId } = useContext(FacultyContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/inmatecheckins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, checkinTime, checkoutTime, facultyId })
            });
            if (!response.ok) {
                throw new Error('Failed to add check-in detail');
            }
            navigate('/inmatecheckin');
        } catch (error) {
            console.error('Error adding check-in detail:', error);
        }
    };

    const handleCancel = () => {
        navigate('/inmatecheckin');
    };

    return (
        <PageLayout>
            <div className="add-page">
                <div className="content">
                    <form onSubmit={handleSubmit}>
                        <h1>Add Check-in Details</h1>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="datetime-local"
                            placeholder="Check-in Time"
                            value={checkinTime}
                            onChange={(e) => setCheckinTime(e.target.value)}
                            required
                        />
                        <input
                            type="datetime-local"
                            placeholder="Check-out Time"
                            value={checkoutTime}
                            onChange={(e) => setCheckoutTime(e.target.value)}
                        />
                        <button type="button" onClick={handleCancel}>Cancel</button>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </PageLayout>
    );
};

export default AddCheckinPage;