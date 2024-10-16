import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../component/userPageLayout';
import '../../css/user/addcomplaint.css';
import { FacultyContext } from '../../context/FacultyContext';

const AddComplaintPage = () => {
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [quarters, setQuarters] = useState('');
    const [status] = useState('Pending');
    const navigate = useNavigate();
    const { facultyId } = useContext(FacultyContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const complaint = { category, description, status, quarters, facultyId };
        try {
            const response = await fetch('http://localhost:5000/api/complaints', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(complaint)
            });
            if (response.ok) {
                navigate('/complaints');
            } else {
                const errorData = await response.json();
                console.error('Error adding complaint:', errorData.message);
            }
        } catch (error) {
            console.error('Error adding complaint:', error.message);
        }
    };

    const handleCancel = () => {
        navigate('/complaints');
    };

    return (
        <PageLayout>
            <div className="add-page">
                <div className="content">
                    <form onSubmit={handleSubmit}>
                        <h1>Add New Complaint</h1>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                            <option value="">Select category</option>
                            <option value="Plumbing">Plumbing</option>
                            <option value="Carpentry">Carpentry</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Gardening">Gardening</option>
                            <option value="Others">Others</option>
                        </select>
                        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                        <input type="text" placeholder="Quarters No" value={quarters} onChange={(e) => setQuarters(e.target.value)} required />
                        <button type="button" onClick={handleCancel}>Cancel</button>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </PageLayout>
    );
};

export default AddComplaintPage;