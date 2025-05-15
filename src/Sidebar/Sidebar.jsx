import React from 'react';
import {
    FaTimes,
    FaHome,
    FaUser,
    FaCog,
    FaSignOutAlt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';  // Importing the useTranslation hook
import logo from './../assets/logo.png';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { t } = useTranslation();  // Using the translation hook

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="sidebar-logo" />
                </div>
                <button className="close-btn" onClick={toggleSidebar}>
                    <FaTimes />
                </button>
            </div>

            <ul className="sidebar-menu">
                <li>
                    <Link to="/home" onClick={toggleSidebar}>
                        <FaHome className="sidebar-icon" /> {t('sidebarHome')}  {/* Using translation key */}
                    </Link>
                </li>

                <li>
                    <Link to="/profile" onClick={toggleSidebar}>
                        <FaUser className="sidebar-icon" /> {t('sidebarProfile')}  {/* Using translation key */}
                    </Link>
                </li>

                <li>
                    <Link to="/settings" onClick={toggleSidebar}>
                        <FaCog className="sidebar-icon" /> {t('sidebarSettings')}  {/* Using translation key */}
                    </Link>
                </li>

                <li>
                    <Link to="/" onClick={toggleSidebar}>
                        <FaSignOutAlt className="sidebar-icon" /> {t('sidebarLogout')}  {/* Using translation key */}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
