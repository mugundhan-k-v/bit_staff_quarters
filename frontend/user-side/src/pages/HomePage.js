// src/pages/HomePage.js
import React from 'react';
import PageLayout from '../component/PageLayout'; // Ensure the correct path to PageLayout
import '../css/homepage.css';

const HomePage = () => {
  return (
    <PageLayout>
      <div className="home-container">
        <div className="welcome-message">
          <h1>Welcome to BIT Staff Quarters Portal</h1>
        </div>
        <div className="thought-of-the-day">
          <h2>Thought of the Day</h2>
          <p>"The best way to predict the future is to create it." - Peter Drucker</p>
        </div>
        <div className="emergency-contact">
          <h2>Emergency Contact Information</h2>
          <p>Security: 1234567890, 2345678901</p>
          <p>Maintenance: 1234567890, 2345678901</p>
        </div>
      </div>
    </PageLayout>
  );
};

export default HomePage;
