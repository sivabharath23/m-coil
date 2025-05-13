// Sidebar.js
import React from 'react';
import { FaTimes, FaHome, FaFan, FaThermometerHalf, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import logo from './../assets/logo.png';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
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
                        <FaHome className="sidebar-icon" /> Home
                    </Link>
                </li>
                <li>
                    <Link to="/air-cooler" onClick={toggleSidebar}>
                        <FaFan className="sidebar-icon" /> Air Cooler Blast
                    </Link>
                </li>
                <li>
                    <Link to="/room-controller" onClick={toggleSidebar}>
                        <FaThermometerHalf className="sidebar-icon" /> Room Controller
                    </Link>
                </li>
                <li>
                    <Link to="/profile" onClick={toggleSidebar}>
                        <FaUser className="sidebar-icon" /> Profile
                    </Link>
                </li>
                <li>
                    <Link to="/" onClick={toggleSidebar}>
                        <FaSignOutAlt className="sidebar-icon" /> Logout
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
