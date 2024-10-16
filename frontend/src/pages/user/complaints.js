import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../component/userPageLayout';
import { FacultyContext } from '../../context/FacultyContext';

const ComplaintsDetailsPage = ({ sidebarCollapsed }) => {
  const navigate = useNavigate();
  const { facultyId } = useContext(FacultyContext);

  const [complaints, setComplaints] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Faculty ID:", facultyId);  // Check the value of facultyId
    const fetchComplaints = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/complaints?facultyId=${facultyId}`, {
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
        console.log('Fetched complaints data:', data); // Log the fetched data
        setComplaints(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching complaint data:', error);
        setError('Error fetching complaint data.');
        setLoading(false);
      }
    };
    if (facultyId) {
      fetchComplaints();
    }
  }, [facultyId]);

  const filteredComplaints = complaints.filter(complaint =>
    complaint.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClick = () => {
    navigate('/addcomplaint');
  };

  return (
    <PageLayout>
      <div className={`details-page ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="details-content">
          <h1>Complaint Details</h1>
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
                    <th>Category</th>
                    <th>Description</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComplaints.length > 0 ? (
                    filteredComplaints.map((complaint, index) => (
                      <tr key={index}>
                        <td>{complaint.category}</td>
                        <td>{complaint.description}</td>
                        <td>{complaint.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No complaints found.</td>
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

export default ComplaintsDetailsPage;