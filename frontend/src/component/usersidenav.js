import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineHome, AiOutlineUser, AiOutlineUsergroupAdd, AiOutlineFileAdd, AiOutlineExclamationCircle, AiOutlineLogin, AiOutlineMenuFold, AiOutlineMenuUnfold, AiOutlineNotification } from 'react-icons/ai';
import styles from './userSidebar.module.css';

const SideNav = ({ isCollapsed, onToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('facultyId');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('loginTime');
    localStorage.removeItem('userRole');
    localStorage.removeItem('sessionExpiryTime');
    navigate('/');
  };

  return (
    <nav className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div
        className={styles['toggle-btn']}
        onClick={() => onToggle(!isCollapsed)}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? <AiOutlineMenuUnfold size={30} /> : <AiOutlineMenuFold size={30} />}
      </div>
      <ul className={styles['menu-list']}>
        <MenuItem to="/homepage" icon={<AiOutlineHome size={24} />} text="Home" collapsed={isCollapsed} />
        <MenuItem to="/profile" icon={<AiOutlineUser size={24} />} text="Profile" collapsed={isCollapsed} />
        <MenuItem to="/inmatedetails" icon={<AiOutlineUsergroupAdd size={24} />} text="Inmate Details" collapsed={isCollapsed} />
        <MenuItem to="/guestdetails" icon={<AiOutlineFileAdd size={24} />} text="Guest Check-in" collapsed={isCollapsed} />
        <MenuItem to="/complaints" icon={<AiOutlineExclamationCircle size={24} />} text="Complaint Registration" collapsed={isCollapsed} />
        <MenuItem to="/inmatecheckin" icon={<AiOutlineUsergroupAdd size={24} />} text="Inmate Check-in" collapsed={isCollapsed} />
        <MenuItem to="/announcement" icon={<AiOutlineNotification size={24} />} text="Announcement" collapsed={isCollapsed} />
        <MenuItem to="/" icon={<AiOutlineLogin size={24} />} text="Logout" collapsed={isCollapsed} onClick={handleLogout} />
      </ul>
    </nav>
  );
};

const MenuItem = ({ to, icon, text, collapsed, onClick }) => (
  <li className={styles['menu-item']}>
    <Link to={to} className={styles['menu-link']} onClick={onClick}>
      <span className={styles['menu-link-icon']}>{icon}</span>
      {!collapsed && <span className={styles['menu-link-text']}>{text}</span>}
    </Link>
  </li>
);

export default SideNav;