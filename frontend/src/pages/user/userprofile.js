import React, { useState, useEffect, useContext } from 'react';
import PageLayout from '../../component/userPageLayout';
import { FacultyContext } from '../../context/FacultyContext';
import '../../css/user/userprofile.css';

const ProfilePage = () => {
  const { facultyId } = useContext(FacultyContext);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    dob: '',
    age: '',
    gender: '',
    bloodGroup: '',
    facultyId: '',
    aadharNo: '',
    panNo: '',
    email: '',
    phone: '',
    quartersNo: '',
    address: '',
    fourWheelers: '',
    twoWheelers: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/profile?facultyId=${facultyId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setProfileData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Error fetching profile');
        setLoading(false);
      }
    };
    if (facultyId) {
      fetchProfile();
    }
  }, [facultyId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const toggleEditMode = async () => {
    if (isEditing) {
      try {
        const response = await fetch(`http://localhost:5000/api/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ facultyId, ...profileData })
        });
        if (!response.ok) {
          throw new Error('Failed to update profile');
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error updating profile:', error);
        setError('Error updating profile');
      }
    }
    setIsEditing(!isEditing);
  };

  return (
    <PageLayout>
      <div className="profile-page">
        <div className="contents">
          <div className="header-container">
            <h1>Profile Page</h1>
            <button className="edit-button" onClick={toggleEditMode}>
              {isEditing ? (
                <i className="fas fa-save"></i> // Save icon
              ) : (
                <i className="fas fa-edit"></i> // Edit icon
              )}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {/* Personal Details Section */}
              <div className="details-container">
                <h2>Personal Details</h2>
                <div className="personal-details-container">
                  <p>
                    <strong>Name:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profileData.name
                    )}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="dob"
                        value={profileData.dob}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profileData.dob
                    )}
                  </p>
                  <p>
                    <strong>Age:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="age"
                        value={profileData.age}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profileData.age
                    )}
                  </p>
                  <p>
                    <strong>Gender:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="gender"
                        value={profileData.gender}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profileData.gender
                    )}
                  </p>
                  <p>
                    <strong>Blood Group:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="bloodGroup"
                        value={profileData.bloodGroup}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profileData.bloodGroup
                    )}
                  </p>
                  <p>
                    <strong>Faculty ID:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="facultyId"
                        value={profileData.facultyId}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profileData.facultyId
                    )}
                  </p>
                  <p>
                    <strong>Aadhar No:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="aadharNo"
                        value={profileData.aadharNo}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profileData.aadharNo
                    )}
                  </p>
                  <p>
                    <strong>Pan No:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="panNo"
                        value={profileData.panNo}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profileData.panNo
                    )}
                  </p>
                </div>
              </div>

              {/* Contact Details Section */}
              <div className="details-container">
                <h2>Contact Details</h2>
                <div className="contact-details-container">
                  <p>
                    <strong>Email:</strong>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profileData.email
                    )}
                  </p>
                  <p>
                    <strong>Phone:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profileData.phone
                    )}
                  </p>
                  <p>
                    <strong>Quarters No:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="quartersNo"
                        value={profileData.quartersNo}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profileData.quartersNo
                    )}
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={profileData.address}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profileData.address
                    )}
                  </p>
                </div>
              </div>

              {/* Vehicle Details Section */}
              <div className="details-container">
                <h2>Vehicle Details</h2>
                <div className="vehicle-details-container">
                  <p>
                    <strong>Number of Four Wheelers:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="fourWheelers"
                        value={profileData.fourWheelers}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profileData.fourWheelers
                    )}
                  </p>
                  <p>
                    <strong>Number of Two Wheelers:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="twoWheelers"
                        value={profileData.twoWheelers}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profileData.twoWheelers
                    )}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ProfilePage;