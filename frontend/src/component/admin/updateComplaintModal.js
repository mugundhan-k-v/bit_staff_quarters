import React, { useState } from 'react';
import "../../css/admin/updateComplaintModal.css";

const UpdateComplaintModal = ({ complaint, onClose, onUpdate }) => {
  const [status, setStatus] = useState(complaint.status);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = () => {
    onUpdate(complaint._id, status);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Update Complaint</h2>
        <div className="complaint-details">
          <p><strong>Faculty ID:</strong> {complaint.facultyId}</p>
          <p><strong>Quarters No:</strong> {complaint.quarters}</p>
          <p><strong>Category:</strong> {complaint.category}</p>
          <p><strong>Description:</strong> {complaint.description}</p>
          {complaint.proof && (
            <div>
              <h3>Proof:</h3>
              {complaint.proof.contentType.startsWith('image/') ? (
                <img
                  src={`data:${complaint.proof.contentType};base64,${complaint.proof.data}`}
                  alt="Proof"
                  style={{ maxWidth: '100%', maxHeight: '300px' }}
                />
              ) : complaint.proof.contentType.startsWith('video/') ? (
                <video
                  controls
                  style={{ maxWidth: '100%' }}
                >
                  <source
                    src={`data:${complaint.proof.contentType};base64,${complaint.proof.data}`}
                    type={complaint.proof.contentType}
                  />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <a
                  href={`data:${complaint.proof.contentType};base64,${complaint.proof.data}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Proof
                </a>
              )}
            </div>
          )}
        </div>
        <div className="update-status">
          <label htmlFor="status">Status:</label>
          <select id="status" value={status} onChange={handleStatusChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
        <div className="modal-actions">
          <button onClick={handleSubmit} className="add-button">Update</button>
          <button onClick={onClose} className="add-button">Close</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateComplaintModal;