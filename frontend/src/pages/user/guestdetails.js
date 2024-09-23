//guest.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../component/PageLayout';

const GuestDetailsPage = ({ guests,sidebarCollapsed }) => {
    const navigate = useNavigate();

    const navigateToAddGuest = () => {
        navigate('/addguest');
    };

    return (
        <PageLayout>
        <div  className={`details-page ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <div className="details-content">
            <h1>Guest Details</h1>
                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                    <button className="add-button" onClick={navigateToAddGuest}>Add <strong>+</strong></button>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>No of Guests</th>
                                <th>From</th>
                                <th>Check-in Date</th>
                                <th>Check-out Date</th>
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

export default GuestDetailsPage;