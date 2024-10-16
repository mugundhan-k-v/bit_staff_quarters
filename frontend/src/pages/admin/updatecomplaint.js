import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageLayout from '../../component/admin/PageLayout';
import "../../css/admin/updatecomplaint.css";

const UpdateComplaintPage = () => {
  const [complaint, setComplaint] = useState(null);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const { complaintId } = useParams();

  useEffect(() => {
    // Fetch complaint details based on complaintId
    const fetchComplaint = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/complaints/${complaintId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch complaint details');
        }
        const data = await response.json();
        setComplaint(data);
        setStatus(data.status);
      } catch (error) {
        console.error('Error fetching complaint details:', error);
      }
    };

    fetchComplaint();
  }, [complaintId]);

  const handleCancel = () => {
    navigate('/admincomplaints');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/complaints/${complaintId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error('Failed to update complaint status');
      }
      navigate('/admincomplaints');
    } catch (error) {
      console.error('Error updating complaint status:', error);
    }
  };

  return (
    <PageLayout>
      <div className="add-page">
        <div className="content">
          <form onSubmit={handleSubmit}>
            <h1>Update Status</h1>
            {complaint && (
              <>
                <p>Complaint ID: {complaint.id}</p>
                <p>Category: {complaint.category}</p>
                <p>Description: {complaint.description}</p>
                <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                  <option value="">Select Status</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Completed">Completed</option>
                </select>
              </>
            )}
            <button type="button" onClick={handleCancel}>Cancel</button>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default UpdateComplaintPage;