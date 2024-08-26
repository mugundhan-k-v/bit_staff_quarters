
//profie.js
import React from 'react';
import PageLayout from '../component/PageLayout';
import '../css/profile.css';

const ProfilePage = () => {
  return (
    <PageLayout>
    <div className="profile-page">
      <div className="content">
        <h1>Profile Page</h1>
        <div className="details-container">
          <h2>Personal Details</h2>
          <div className="personal-details-container">
            <p><strong>Name:</strong> Mr.siva</p>
            <p><strong>Date of Birth:</strong> 23/03/1990</p>
            <p><strong>Age:</strong> 32</p>
            <p><strong>Gender:</strong> Male</p>
            <p><strong>Blood Group:</strong> B+ve</p>
            <p><strong>Faculty ID:</strong> IT2779</p>
            <p><strong>Aadhar No:</strong> 637823459087</p>
            <p><strong>Pan No: </strong>ABCTY1234D</p>
          </div>
        </div>
        <div className="details-container">
          <h2>Contact Details</h2>
          <div className="contact-details-container">
            <p><strong>Email:</strong> siva@gmail.com</p>
            <p><strong>Phone:</strong> 9442244033</p>
            <p><strong>Quarters No:</strong> B47</p>
            <p><strong>Address:</strong> 12th Main Road,Vijaya Nagar,Velacheri,Chennai-600042</p>
          </div>
        </div>
        <div className="details-container">
          <h2>Vehicle Details</h2>
          <div className="vehicle-details-container">
            <p><strong>Number of Four Wheelers:</strong> Nil</p>
            <p><strong>Number of Two Wheelers:</strong> 03</p>
          </div>
        </div>
      </div>
    </div>
    </PageLayout>
  );
};

export default ProfilePage;
