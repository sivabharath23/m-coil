import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';


import {
    FaTimes,
    FaCheckCircle,
    FaTimesCircle,
    FaSyncAlt,
    FaArrowLeft,
    FaTh,
    FaHome,
    FaUser
} from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import './../assets/style.css';
import './Settings.css';

const Settings = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navigate = useNavigate();
    const [currentTheme, setCurrentTheme] = useState('blue'); // Default theme
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [currentCurrency, setCurrentCurrency] = useState('USD');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [pendingChange, setPendingChange] = useState({
        type: '',
        value: ''
    });

    // Load saved settings from localStorage on component mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'blue';
        const savedLanguage = localStorage.getItem('language') || 'en';
        const savedCurrency = localStorage.getItem('currency') || 'USD';

        setCurrentTheme(savedTheme);
        setCurrentLanguage(savedLanguage);
        setCurrentCurrency(savedCurrency);
    }, []);

    const handleThemeChange = (theme) => {
        setPendingChange({
            type: 'theme',
            value: theme
        });
        setShowConfirmationModal(true);
    };

    const handleLanguageChange = (e) => {
        const lang = e.target.value;
        setPendingChange({
            type: 'language',
            value: lang
        });
        setShowConfirmationModal(true);
    };

    const handleCurrencyChange = (e) => {
        const currency = e.target.value;
        setPendingChange({
            type: 'currency',
            value: currency
        });
        setShowConfirmationModal(true);
    };

    const resetThemeToDefault = () => {
        setPendingChange({
            type: 'theme',
            value: 'blue' // Your default theme
        });
        setShowConfirmationModal(true);
    };

    const confirmChange = () => {
        switch (pendingChange.type) {
            case 'theme':
                setCurrentTheme(pendingChange.value);
                localStorage.setItem('theme', pendingChange.value);
                applyTheme(pendingChange.value);
                break;
            case 'language':
                setCurrentLanguage(pendingChange.value);
                localStorage.setItem('language', pendingChange.value);
                // Here you would typically implement your language change logic
                break;
            case 'currency':
                setCurrentCurrency(pendingChange.value);
                localStorage.setItem('currency', pendingChange.value);
                break;
            default:
                break;
        }
        setShowConfirmationModal(false);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    const handleBackClick = () => {
        navigate(-1);
    };


    const applyTheme = (theme) => {
        // Remove all theme classes
        document.body.classList.remove('theme-red', 'theme-orange', 'theme-blue', 'theme-purple');

        document.body.classList.add(`theme-${theme}`);
    };

    const getSettingName = () => {
        switch (pendingChange.type) {
            case 'theme':
                return `${pendingChange.value} Theme`;
            case 'language':
                return pendingChange.value === 'en' ? 'English' :
                    pendingChange.value === 'es' ? 'Español' :
                        pendingChange.value === 'fr' ? 'Français' : 'Deutsch';
            case 'currency':
                return pendingChange.value === 'USD' ? 'USD ($)' :
                    pendingChange.value === 'EUR' ? 'EUR (€)' :
                        pendingChange.value === 'GBP' ? 'GBP (£)' : 'INR (₹)';
            default:
                return '';
        }
    };

    return (
        <div className={`app-container my-5 ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Back Button (Top Left) */}
            <button className="back-btn" id="backBtn" onClick={handleBackClick}>
                <FaArrowLeft />
            </button>

            <div className={`container`}>
                <div className="app-header mb-5">
                    <h2>Settings</h2>
                    <p>Select your preferred theme, language, and currency.</p>
                </div>



                {/* Theme Selection Form */}
                <div className="card shadow-lg rounded border-0">
                    <div className="card-body text-center">
                        <h4>Select a Theme</h4>

                        <hr />
                        <div className="theme-selector">
                            {/* Red Theme */}
                            <label className={`theme-option ${currentTheme === 'red' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    name="themeColor"
                                    value="red"
                                    checked={currentTheme === 'red'}
                                    onChange={() => handleThemeChange('red')}
                                />
                                <span className="theme-label">Red Theme</span>
                            </label>

                            {/* Orange Theme */}
                            <label className={`theme-option ${currentTheme === 'orange' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    name="themeColor"
                                    value="orange"
                                    checked={currentTheme === 'orange'}
                                    onChange={() => handleThemeChange('orange')}
                                />
                                <span className="theme-label">Orange Theme</span>
                            </label>

                            {/* Blue Theme */}
                            <label className={`theme-option ${currentTheme === 'blue' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    name="themeColor"
                                    value="blue"
                                    checked={currentTheme === 'blue'}
                                    onChange={() => handleThemeChange('blue')}
                                />
                                <span className="theme-label">Blue Theme</span>
                            </label>

                            {/* Purple Theme */}
                            <label className={`theme-option ${currentTheme === 'purple' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    name="themeColor"
                                    value="purple"
                                    checked={currentTheme === 'purple'}
                                    onChange={() => handleThemeChange('purple')}
                                />
                                <span className="theme-label">Purple Theme</span>
                            </label>
                        </div>

                        <hr />

                        <div className="mt-4">
                            <button className="btn btn-primary" onClick={resetThemeToDefault}>
                                <FaSyncAlt /> Reset to Default
                            </button>
                        </div>
                    </div>
                </div>

                {/* Language Selection */}
                <div className="card shadow-lg rounded border-0 mt-4">
                    <div className="card-body text-center">
                        <h4>Select a Language</h4>
                        <hr />
                        <div className="language-selector mt-4">
                            <select
                                id="languageSelect"
                                className="form-select"
                                value={currentLanguage}
                                onChange={handleLanguageChange}
                            >
                                <option value="en">English</option>
                                <option value="es">Español</option>
                                <option value="fr">Français</option>
                                <option value="de">Deutsch</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Currency Selection */}
                <div className="card shadow-lg rounded border-0 mt-4">
                    <div className="card-body text-center">
                        <h4>Select a Currency</h4>
                        <hr />
                        <div className="currency-selector mt-4">
                            <select
                                id="currencySelect"
                                className="form-select"
                                value={currentCurrency}
                                onChange={handleCurrencyChange}
                            >
                                <option value="USD">$ USD</option>
                                <option value="EUR">€ EUR</option>
                                <option value="GBP">£ GBP</option>
                                <option value="INR">₹ INR</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bottom-nav">
                    <button className="btn" id="menuBtn" onClick={toggleSidebar}>
                        <FaTh />
                        <span className="btn-label">Menu</span>
                    </button>
                    <Link className="btn" id="homeBtn" to="/home">
                        <FaHome />
                        <span className="btn-label">Home</span>
                    </Link>
                    <Link className="btn" id="profileBtn" to="/profile">
                        <FaUser />
                        <span className="btn-label">Profile</span>
                    </Link>
                </div>


                {/* Confirmation Modal */}
                {showConfirmationModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="modal-title">Confirm Change</h2>
                                <button
                                    type="button"
                                    className="close-btn"
                                    onClick={() => setShowConfirmationModal(false)}
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="modal-body">
                                <p className="mb-2">Are you sure you want to change this setting?</p>
                                <p className="mb-0 setting">
                                    <strong>{getSettingName()}</strong>
                                </p>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-lg w-100"
                                    onClick={() => setShowConfirmationModal(false)}
                                >
                                    <FaTimesCircle /> Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success btn-lg w-100"
                                    onClick={confirmChange}
                                >
                                    <FaCheckCircle /> Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Settings;