import React from 'react';
import {
    FaTimes,
    FaHome,
    FaFan,
    FaThermometerHalf,
    FaUser,
    FaCog,
    FaSignOutAlt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from './../assets/logo.png';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out of your account',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0066cc',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                navigate('/');
                Swal.fire({
                    title: 'Logged out!',
                    text: 'You have been successfully logged out.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };
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
                {/* <li>
                    <Link to="/air-cooler" onClick={toggleSidebar}>
                        <FaFan className="sidebar-icon" /> Air Cooler Blast
                    </Link>
                </li>
                <li>
                    <Link to="/room-controller" onClick={toggleSidebar}>
                        <FaThermometerHalf className="sidebar-icon" /> Room Controller
                    </Link>
                </li> */}
                <li>
                    <Link to="/profile" onClick={toggleSidebar}>
                        <FaUser className="sidebar-icon" /> Profile
                    </Link>
                </li>
                <li>
                    <Link to="/settings" onClick={toggleSidebar}>
                        <FaCog className="sidebar-icon" /> Settings
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
