// import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../component/admin/PageLayout';
import "../../css/admin/updatecomplaint.css"

const UpdateComplaintPage = ({ addComplaint }) => {
    // const [id] = useState(generateId());
    // const [category, setCategory] = useState('');
    // const [description, setDescription] = useState('');
    // const [status] = useState('Pending');
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/admincomplaints');
    };

    return (
        <PageLayout>
        <div className="add-page">
            <div className="content">
                
                <form >
                <h1>Update Status</h1>
                    {/* <input type="text" placeholder="Complaint ID" value={id} onChange={(e) => setId(e.target.value)} required /> */}
                    <select  required>
                        <option value="">Select Status</option>
                        <option value="Category 1">Accepted</option>
                        <option value="Category 2">Rejected</option>
                        <option value="Category 3">Completed</option>
                    </select>
                    {/* <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required /> */}
                    {/* <input type="text" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} required /> */}
                    <button type="button" onClick={handleCancel}>Cancel</button>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
        </PageLayout>
    );
};

export default UpdateComplaintPage;