import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../component/userPageLayout';
import { FacultyContext } from '../../context/FacultyContext';

const GuestsDetailsPage = ({ sidebarCollapsed }) => {
  const navigate = useNavigate();
  const { facultyId } = useContext(FacultyContext);

  const [guests, setGuests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Faculty ID:", facultyId);  // Check the value of facultyId
    const fetchGuests = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/guests?facultyId=${facultyId}`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        const contentType = response.headers.get("content-type");
        console.log('Response content type:', contentType); // Log the content type
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Invalid response: ${errorText}`);
        }
        if (!contentType.includes("application/json")) {
          throw new Error("Invalid response: Expected JSON but received HTML");
        }
        const data = await response.json();
        setGuests(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching guest data:', error);
        setError('Error fetching guest data.');
        setLoading(false);
      }
    };
    if (facultyId) {
      fetchGuests();
    }
  }, [facultyId]);

  const filteredGuests = guests.filter(guest =>
    guest.guests && guest.guests.some(name => name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddClick = () => {
    navigate('/addguests');
  };

  return (
    <PageLayout>
      <div className={`details-page ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="details-content">
          <h1>Guest Details</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button className="add-button" onClick={handleAddClick}>
              Add <strong>+</strong>
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Names</th>
                    <th>From</th>
                    <th>Check-In</th>
                    <th>Check-Out</th>
                    <th>Code</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGuests.length > 0 ? (
                    filteredGuests.map((guest, index) => (
                      <tr key={index}>
                        <td>{guest.guests.join(', ') || 'Unknown'}</td>
                        <td>{guest.from || 'N/A'}</td>
                        <td>{guest.checkIn ? new Date(guest.checkIn).toLocaleString() : 'N/A'}</td>
                        <td>{guest.checkOut ? new Date(guest.checkOut).toLocaleString() : 'N/A'}</td>
                        <td>{guest.code || 'N/A'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No guests found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default GuestsDetailsPage;