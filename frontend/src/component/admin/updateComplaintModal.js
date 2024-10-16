import React, { useState } from 'react';
import '../../css/admin/updateComplaintModal.css';

const UpdateComplaintModal = ({ complaint, onClose, onUpdate }) => {
  const [status, setStatus] = useState(complaint.status);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdateClick = () => {
    onUpdate(complaint._id, status);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Update Complaint Status</h2>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" value={status} onChange={handleStatusChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
        <div className="modal-actions">
          <button onClick={handleUpdateClick} className="update-button">Update</button>
          <button onClick={onClose} className="close-button">Close</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateComplaintModal;