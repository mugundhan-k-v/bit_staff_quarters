import React, { useState, useEffect } from 'react';
import PageLayout from '../../component/admin/PageLayout';
import UpdateComplaintModal from '../../component/admin/updateComplaintModal';
import "../../css/admin/admininmatedetails.css";

const AdminComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    // Fetch complaint data from the backend
    const fetchComplaints = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/allcomplaints');
        if (!response.ok) {
          throw new Error('Failed to fetch complaints');
        }
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredComplaints = complaints.filter(complaint =>
    (complaint.facultyId && complaint.facultyId.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (complaint.quarters && complaint.quarters.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (complaint.category && complaint.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (complaint.description && complaint.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (complaint.status && complaint.status.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleUpdateClick = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const handleCloseModal = () => {
    setSelectedComplaint(null);
  };

  const handleUpdateComplaint = async (complaintId, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/complaints/${complaintId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update complaint');
      }

      const updatedComplaint = await response.json();
      setComplaints(prevComplaints =>
        prevComplaints.map(complaint =>
          complaint._id === updatedComplaint._id ? updatedComplaint : complaint
        )
      );
      setSelectedComplaint(null);
    } catch (error) {
      console.error('Error updating complaint:', error);
    }
  };

  return (
    <PageLayout>
      <div className="details-page">
        <div className="details-content">
          <h1>Complaints</h1>
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
                  <th>Faculty ID</th>
                  <th>Quarters No</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((complaint, index) => (
                  <tr key={index}>
                    <td>{complaint.facultyId}</td>
                    <td>{complaint.quarters}</td>
                    <td>{complaint.category}</td>
                    <td>{complaint.description}</td>
                    <td>{complaint.status}</td>
                    <td>
                      <button 
                        onClick={() => handleUpdateClick(complaint)} 
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
      {selectedComplaint && (
        <UpdateComplaintModal
          complaint={selectedComplaint}
          onClose={handleCloseModal}
          onUpdate={handleUpdateComplaint}
        />
      )}
    </PageLayout>
  );
};

export default AdminComplaintsPage;