import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome,AiOutlineUser, AiOutlineUsergroupAdd, AiOutlineNotification, AiOutlineFileAdd, AiOutlineExclamationCircle, AiOutlineLogin, AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import styles from './Sidebar.module.css';

const SideNav = ({ isCollapsed, onToggle }) => {
  return (
    <nav className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div
        className={styles['toggle-btn']}
        onClick={() => onToggle(!isCollapsed)} // Toggle state on click
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? <AiOutlineMenuUnfold size={30} /> : <AiOutlineMenuFold size={30} />}
      </div>
      <ul className={styles['menu-list']}>
        <MenuItem to="/Adminhomepage" icon={<AiOutlineHome size={24} />} text="Home" collapsed={isCollapsed} />
        <MenuItem to="/Admininmatedetails" icon={<AiOutlineUsergroupAdd size={24} />} text="Inmate Details" collapsed={isCollapsed} />
        <MenuItem to="/Adminguestdetails" icon={<AiOutlineFileAdd size={24} />} text="Guest Check-in" collapsed={isCollapsed} />
        <MenuItem to="/Admincomplaints" icon={<AiOutlineExclamationCircle size={24} />} text="Complaint Registered" collapsed={isCollapsed} />
        <MenuItem to="/adminannouncement" icon={<AiOutlineNotification size={24} />} text="Announcement" collapsed={isCollapsed} />
        <MenuItem to="/adduser" icon={<AiOutlineUser size={24} />} text="Users" collapsed={isCollapsed} />
        <MenuItem to="/" icon={<AiOutlineLogin size={24} />} text="Logout" collapsed={isCollapsed} />
      </ul>
    </nav>
  );
};

const MenuItem = ({ to, icon, text, collapsed }) => (
  <li className={styles['menu-item']}>
    <Link to={to} className={styles['menu-link']}>
      <span className={styles['menu-link-icon']}>{icon}</span>
      {!collapsed && <span className={styles['menu-link-text']}>{text}</span>}
    </Link>
  </li>
);

export default SideNav;