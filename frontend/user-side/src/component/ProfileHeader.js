// ProfileHeader.js
import React, { useState } from 'react';
import './ProfileHeader.css'; // Import the CSS file

const ProfileHeader = ({ isCollapsed }) => {
  const [profileName] = useState('MUGUNDHAN K V'); 
  const [avatarUrl] = useState('/avatar.png');

  return (
    <div className={`profile-header ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="profile-info">
        <span className="profile-title">BIT STAFF QUARTERS PORTAL</span>
      </div>
      <div className="profile-actions">
        <i className="icon-sun"></i>
        <i className="icon-bell"></i>
        <div className="profile-avatar">
          <img src={avatarUrl} alt="Profile Avatar" /> 
          <span>{profileName}</span> 
          <i className="icon-chevron-down"></i> 
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
