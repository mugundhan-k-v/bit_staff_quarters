import React from 'react';
import PageLayout from '../../component/admin/PageLayout';

const AdminGuestDetailsPage = ({ guests = [], sidebarCollapsed }) => {

    return (
        <PageLayout>
        <div className={`details-page ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <div className="details-content">
                <h1>Guest Details</h1>
                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                    <button className="add-button">Search</button>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>No of Guests</th>
                                <th>From</th>
                                <th>Check-in Date</th>
                                <th>Check-out Date</th>
                                <th>Faculty ID</th> 
                                <th>Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {guests.map((guest, index) => (
                                <tr key={index}>
                                    <td>{guest.guests}</td>
                                    <td>{guest.from}</td>
                                    <td>{guest.checkIn}</td>
                                    <td>{guest.checkOut}</td>
                                    <td>{guest.facultyId}</td>
                                    <td>{guest.code}</td>
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

export default AdminGuestDetailsPage;
