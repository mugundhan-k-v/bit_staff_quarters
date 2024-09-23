import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../component/admin/PageLayout';
import "../../css/admin/admininmatedetails.css"

// Sample data
const sampleComplaints = [
    { id: 'C001',quartersno:'QA003', category: 'Gardening', description: 'Over grown grass in lane', status: 'Pending' },
    { id: 'C002',quartersno:'QA013', category: 'Electrical', description: 'Fan is not working', status: 'Completed' },
    { id: 'C003',quartersno:'QB043', category: 'Plumbing', description: 'water is not available in kitchen', status: 'In Progress' },
    { id: 'C004',quartersno:'QA302', category: 'Carpentary', description: 'Window is broken', status: 'Pending' },
];

const AdminComplaintsPage = () => {
    const navigate = useNavigate();

    const handleUpdateClick = (complaintId) => {
        navigate(`/updatecomplaint`);
    };

    return (
        <PageLayout>
            <div className="details-page">
                <div className="details-content">
                    <h1>Complaints</h1>
                    <div className="search-bar">
                        <input type="text" placeholder="Search..." />
                        <button className="add-button">Search</button>
                    </div>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Complaint ID</th>
                                    <th>Quarters No</th>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sampleComplaints.map((complaint, index) => (
                                    <tr key={index}>
                                        <td>{complaint.id}</td>
                                        <td>{complaint.quartersno}</td>
                                        <td>{complaint.category}</td>
                                        <td>{complaint.description}</td>
                                        <td>{complaint.status}</td>
                                        <td>
                                            <button 
                                                onClick={() => handleUpdateClick(complaint.id)} 
                                                className="add-button"
                                            >
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default AdminComplaintsPage;
