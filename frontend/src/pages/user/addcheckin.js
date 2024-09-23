
//addcheckin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../component/PageLayout';
// import "./inmatecheckin.css"

const AddCheckinPage = ({ addCheckin }) => {
    const [name, setName] = useState('');
    const [checkinTime, setCheckinTime] = useState('');
    const [checkoutTime, setCheckoutTime] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addCheckin({ name, checkinTime, checkoutTime });
        navigate('/inmatecheckin');
    };

    const handleCancel = () => {
        navigate('/inmatecheckin');
    };

    return (
        <PageLayout>
        <div className="add-page">
            <div className="content">
                <h1>Add Check-in Details</h1>
                <form  onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="datetime-local" placeholder="Check-in Time" value={checkinTime} onChange={(e) => setCheckinTime(e.target.value)} required />
                    <input type="datetime-local" placeholder="Check-out Time" value={checkoutTime} onChange={(e) => setCheckoutTime(e.target.value)} required />
                    <button type="button" onClick={handleCancel}>Cancel</button>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
        </PageLayout>
    );
};

export default AddCheckinPage;