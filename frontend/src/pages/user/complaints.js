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
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/complaints?facultyId=${facultyId}`,
          {
            headers: {
              'Cache-Control': 'no-cache',
              Pragma: 'no-cache',
              Expires: '0',
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Invalid response: ${errorText}`);
        }

        const data = await response.json();
        setComplaints(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching complaints:', err);
        setError('Failed to fetch complaints. Please try again later.');
        setLoading(false);
      }
    };

    if (facultyId) {
      fetchComplaints();
    }
  }, [facultyId]);

  const filteredComplaints = complaints.filter((complaint) =>
    complaint.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClick = () => {
    navigate('/addcomplaint');
  };

  const handleViewClick = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const handleCloseModal = () => {
    setSelectedComplaint(null);
  };

  return (
    <PageLayout>
      <div
        className={`details-page ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}
      >
        <div className="details-content">
          <h1>Complaint Details</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComplaints.length > 0 ? (
                    filteredComplaints.map((complaint, index) => (
                      <tr key={index}>
                        <td>{complaint.category}</td>
                        <td>{complaint.description}</td>
                        <td>{complaint.status}</td>
                        <td>
                          <button
                            onClick={() => handleViewClick(complaint)}
                          >
                            View
                          </button>
                        </td>
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

      {selectedComplaint && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Complaint Details</h2>
            <p>
              <strong>Category:</strong> {selectedComplaint.category}
            </p>
            <p>
              <strong>Description:</strong> {selectedComplaint.description}
            </p>
            <p>
              <strong>Status:</strong> {selectedComplaint.status}
            </p>
            {selectedComplaint.proof && (
              <div>
                <h3>Proof:</h3>
                {selectedComplaint.proof.contentType.startsWith('image/') ? (
                  <img
                    src={`data:${selectedComplaint.proof.contentType};base64,${selectedComplaint.proof.data}`}
                    alt="Proof"
                    style={{ maxWidth: '100%', maxHeight: '300px' }}
                  />
                ) : selectedComplaint.proof.contentType.startsWith('video/') ? (
                  <video
                    controls
                    style={{ maxWidth: '100%' }}
                  >
                    <source
                      src={`data:${selectedComplaint.proof.contentType};base64,${selectedComplaint.proof.data}`}
                      type={selectedComplaint.proof.contentType}
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <a
                    href={`data:${selectedComplaint.proof.contentType};base64,${selectedComplaint.proof.data}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Proof
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default ComplaintsDetailsPage;
