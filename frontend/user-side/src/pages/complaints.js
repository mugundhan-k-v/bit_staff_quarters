
//complaints.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../component/PageLayout';

const ComplaintsPage = ({ complaints }) => {
    const navigate = useNavigate();

    const navigateToAddComplaint = () => {
        navigate('/addcomplaint');
    };

    return (
        <PageLayout>
        <div className="details-page">
            <div className="content">
                <h1>Complaints</h1>
                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                    <button className="add-button" onClick={navigateToAddComplaint}>Add <strong>+</strong></button>
                </div>
                <div className="table-container">
                <table>
                <thead>
                    <tr>
                        <th>Complaint ID</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Status</th>
                     </tr>
                </thead>
                <tbody>
                    {complaints.map((complaint, index) => (
                    <tr key={index}>
                        <td>{complaint.id}</td>
                        <td>{complaint.category}</td>
                        <td>{complaint.description}</td>
                        <td>{complaint.status}</td>
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

export default ComplaintsPage;