
//PageLayout.js
import React, { useState } from 'react';
import SideNav from './usersidenav';
import './userPageLayout.css';

const PageLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="page-container">
      <SideNav isCollapsed={isCollapsed} onToggle={handleSidebarToggle} />
      <div className={`page-content ${isCollapsed ? 'collapsed' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
