
//addcomplaint.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../component/PageLayout';
import '../../css/user/addcomplaint.css'

const AddComplaintPage = ({ addComplaint }) => {
    const [id] = useState(generateId());
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [status] = useState('Pending');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addComplaint({ id, category, description, status });
        navigate('/complaints');
    };

    const handleCancel = () => {
        navigate('/complaints');
    };

    // Function to generate a 4-digit alphanumeric ID
    function generateId() {
        return Math.random().toString(36).substr(2, 4).toUpperCase();
    }

    return (
        <PageLayout>
        <div className="add-page">
            <div className="content">
                <h1>Add New Complaint</h1>
                <form onSubmit={handleSubmit}>
                    {/* <input type="text" placeholder="Complaint ID" value={id} onChange={(e) => setId(e.target.value)} required /> */}
                    <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="">Select category</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Carpentry">Carpentry</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Gardening">Gardening</option>
                        <option value="others">others</option>
                    </select>
                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    {/* <input type="text" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} required /> */}
                    <button type="button" onClick={handleCancel}>Cancel</button>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
        </PageLayout>
    );
};

export default AddComplaintPage;