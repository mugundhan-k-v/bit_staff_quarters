import React, { useState } from 'react';
import PageLayout from '../component/PageLayout';
import '../css/profile.css';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Mr. Siva',
    dob: '23/03/1990',
    age: '32',
    gender: 'Male',
    bloodGroup: 'B+ve',
    facultyId: 'IT2779',
    aadharNo: '637823459087',
    panNo: 'ABCTY1234D',
    email: 'siva@gmail.com',
    phone: '9442244033',
    quartersNo: 'B47',
    address: '12th Main Road, Vijaya Nagar, Velacheri, Chennai-600042',
    fourWheelers: 'Nil',
    twoWheelers: '03',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <PageLayout>
      <div className="profile-page">
        <div className="content">
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
        </div>
      </div>
    </PageLayout>
  );
};

export default ProfilePage;
