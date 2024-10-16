import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../component/userPageLayout';
import { FacultyContext } from '../../context/FacultyContext';

const InmateCheckinPage = () => {
  const navigate = useNavigate();
  const { facultyId } = useContext(FacultyContext);
  const [search, setSearch] = useState('');
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckinDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/inmatecheckins?facultyId=${facultyId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch check-in details');
        }
        const data = await response.json();
        setDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching check-in details:', error);
        setError('Error fetching check-in details.');
        setLoading(false);
      }
    };

    if (facultyId) {
      fetchCheckinDetails();
    }
  }, [facultyId]);

  const handleAddClick = () => {
    navigate('/addcheckin');
  };

  const filteredDetails = details.filter(detail =>
    detail.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageLayout>
      <div className="details-page">
        <div className="details-content">
          <h1>Inmate Check-in Details</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
                    <th>Name</th>
                    <th>Check-in Time</th>
                    <th>Check-out Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDetails.length > 0 ? (
                    filteredDetails.map((detail, index) => (
                      <tr key={index}>
                        <td>{detail.name}</td>
                        <td>{new Date(detail.checkinTime).toLocaleString()}</td>
                        <td>{detail.checkoutTime ? new Date(detail.checkoutTime).toLocaleString() : 'N/A'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No check-in details found.</td>
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

export default InmateCheckinPage;