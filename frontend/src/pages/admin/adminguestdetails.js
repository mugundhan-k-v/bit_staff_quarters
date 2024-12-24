import React, { useState, useEffect } from 'react';
import PageLayout from '../../component/admin/PageLayout';

const AdminGuestDetailsPage = ({ sidebarCollapsed }) => {
  const [guests, setGuests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch guest data from the backend
    const fetchGuests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/allguests', {
          credentials: 'include' // Include credentials in the request
        });
        if (!response.ok) {
          throw new Error('Failed to fetch guests');
        }
        const data = await response.json();
        setGuests(data);
      } catch (error) {
        console.error('Error fetching guests:', error);
      }
    };

    fetchGuests();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredGuests = guests.filter(guest =>
    guest.guests.toString().includes(searchTerm) ||
    guest.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.checkIn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.checkOut.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.facultyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageLayout>
      <div className={`details-page ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="details-content">
          <h1>Guest Details</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
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
                {filteredGuests.map((guest, index) => (
                  <tr key={index}>
                    <td>{Array.isArray(guest.guests) ? guest.guests.join(', ') : guest.guests}</td>
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