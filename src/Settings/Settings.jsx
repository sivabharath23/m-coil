import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    FaTimes,
    FaCheckCircle,
    FaTimesCircle,
    FaArrowLeft,
    FaTh,
    FaHome,
    FaUser,
    FaGlobe,
    FaMoneyBillWave,
    FaRuler,
    FaLanguage,
    FaEuroSign,
    FaPoundSign,
    FaRupeeSign,
    FaDollarSign,
    FaWeight,
    FaBalanceScale
} from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import './../assets/style.css';
import './Settings.css';

const Settings = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [currentCurrency, setCurrentCurrency] = useState('USD');
    const [currentUOM, setCurrentUOM] = useState('kg');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [pendingChange, setPendingChange] = useState({
        type: '',
        value: ''
    });

    // Load saved settings from localStorage on component mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') || 'en';
        const savedCurrency = localStorage.getItem('currency') || 'USD';
        const savedUOM = localStorage.getItem('uom') || 'kg';

        setCurrentLanguage(savedLanguage);
        setCurrentCurrency(savedCurrency);
        setCurrentUOM(savedUOM);
    }, []);

    const handleLanguageChange = (lang) => {
        setPendingChange({
            type: 'language',
            value: lang
        });
        setShowConfirmationModal(true);
    };

    const handleCurrencyChange = (currency) => {
        setPendingChange({
            type: 'currency',
            value: currency
        });
        setShowConfirmationModal(true);
    };

    const handleUOMChange = (uom) => {
        setPendingChange({
            type: 'uom',
            value: uom
        });
        setShowConfirmationModal(true);
    };

    const confirmChange = () => {
        switch (pendingChange.type) {
            case 'language':
                setCurrentLanguage(pendingChange.value);
                localStorage.setItem('language', pendingChange.value);
                break;
            case 'currency':
                setCurrentCurrency(pendingChange.value);
                localStorage.setItem('currency', pendingChange.value);
                break;
            case 'uom':
                setCurrentUOM(pendingChange.value);
                localStorage.setItem('uom', pendingChange.value);
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

    const getSettingName = () => {
        switch (pendingChange.type) {
            case 'language':
                return pendingChange.value === 'en' ? 'English' :
                    pendingChange.value === 'es' ? 'Español' :
                        pendingChange.value === 'fr' ? 'Français' : 'Deutsch';
            case 'currency':
                return pendingChange.value === 'USD' ? 'USD ($)' :
                    pendingChange.value === 'EUR' ? 'EUR (€)' :
                        pendingChange.value === 'GBP' ? 'GBP (£)' : 'INR (₹)';
            case 'uom':
                return pendingChange.value === 'kg' ? 'Kilogram (kg)' :
                    pendingChange.value === 'lb' ? 'Pound (lb)' :
                        pendingChange.value === 'g' ? 'Gram (g)' : 'Meter (m)';
            default:
                return '';
        }
    };

    const getCurrencyIcon = (currency) => {
        switch (currency) {
            case 'USD': return <FaDollarSign />;
            case 'EUR': return <FaEuroSign />;
            case 'GBP': return <FaPoundSign />;
            case 'INR': return <FaRupeeSign />;
            default: return <FaMoneyBillWave />;
        }
    };

    const getUOMIcon = (uom) => {
        switch (uom) {
            case 'kg': return <FaWeight />;
            case 'lb': return <FaBalanceScale />;
            case 'g': return <FaWeight />;
            case 'm': return <FaRuler />;
            default: return <FaRuler />;
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
                    <p>Customize your app preferences</p>
                </div>

                {/* Language Selection */}
                <div className="card shadow-lg rounded border-0">
                    <div className="card-body">
                        <h4 className="text-center section-title"><FaLanguage /> Language</h4>
                        <hr />
                        <div className="option-grid">
                            <div
                                className={`option-card ${currentLanguage === 'en' ? 'active' : ''}`}
                                onClick={() => handleLanguageChange('en')}
                            >
                                <div className="option-icon"><FaGlobe /></div>
                                <div className="option-label">English</div>
                                {currentLanguage === 'en' && <div className="option-check">✓</div>}
                            </div>

                            <div
                                className={`option-card ${currentLanguage === 'es' ? 'active' : ''}`}
                                onClick={() => handleLanguageChange('es')}
                            >
                                <div className="option-icon"><FaGlobe /></div>
                                <div className="option-label">Español</div>
                                {currentLanguage === 'es' && <div className="option-check">✓</div>}
                            </div>

                            <div
                                className={`option-card ${currentLanguage === 'fr' ? 'active' : ''}`}
                                onClick={() => handleLanguageChange('fr')}
                            >
                                <div className="option-icon"><FaGlobe /></div>
                                <div className="option-label">Français</div>
                                {currentLanguage === 'fr' && <div className="option-check">✓</div>}
                            </div>

                            <div
                                className={`option-card ${currentLanguage === 'de' ? 'active' : ''}`}
                                onClick={() => handleLanguageChange('de')}
                            >
                                <div className="option-icon"><FaGlobe /></div>
                                <div className="option-label">Deutsch</div>
                                {currentLanguage === 'de' && <div className="option-check">✓</div>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Currency Selection */}
                <div className="card shadow-lg rounded border-0 mt-4">
                    <div className="card-body">
                        <h4 className="text-center section-title"><FaMoneyBillWave /> Currency</h4>
                        <hr />
                        <div className="option-grid">
                            <div
                                className={`option-card ${currentCurrency === 'USD' ? 'active' : ''}`}
                                onClick={() => handleCurrencyChange('USD')}
                            >
                                <div className="option-icon">{getCurrencyIcon('USD')}</div>
                                <div className="option-label">USD ($)</div>
                                {currentCurrency === 'USD' && <div className="option-check">✓</div>}
                            </div>

                            <div
                                className={`option-card ${currentCurrency === 'EUR' ? 'active' : ''}`}
                                onClick={() => handleCurrencyChange('EUR')}
                            >
                                <div className="option-icon">{getCurrencyIcon('EUR')}</div>
                                <div className="option-label">EUR (€)</div>
                                {currentCurrency === 'EUR' && <div className="option-check">✓</div>}
                            </div>

                            <div
                                className={`option-card ${currentCurrency === 'GBP' ? 'active' : ''}`}
                                onClick={() => handleCurrencyChange('GBP')}
                            >
                                <div className="option-icon">{getCurrencyIcon('GBP')}</div>
                                <div className="option-label">GBP (£)</div>
                                {currentCurrency === 'GBP' && <div className="option-check">✓</div>}
                            </div>

                            <div
                                className={`option-card ${currentCurrency === 'INR' ? 'active' : ''}`}
                                onClick={() => handleCurrencyChange('INR')}
                            >
                                <div className="option-icon">{getCurrencyIcon('INR')}</div>
                                <div className="option-label">INR (₹)</div>
                                {currentCurrency === 'INR' && <div className="option-check">✓</div>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Unit of Measurement Selection */}
                <div className="card shadow-lg rounded border-0 mt-4">
                    <div className="card-body">
                        <h4 className="text-center section-title"><FaRuler /> Unit of Measurement</h4>
                        <hr />
                        <div className="option-grid">
                            <div
                                className={`option-card ${currentUOM === 'kg' ? 'active' : ''}`}
                                onClick={() => handleUOMChange('kg')}
                            >
                                <div className="option-icon">{getUOMIcon('kg')}</div>
                                <div>
                                    <div className="option-label">Kilogram</div>
                                    <div className="option-subtext">(kg)</div>
                                </div>
                                {currentUOM === 'kg' && <div className="option-check">✓</div>}
                            </div>

                            <div
                                className={`option-card ${currentUOM === 'lb' ? 'active' : ''}`}
                                onClick={() => handleUOMChange('lb')}
                            >
                                <div className="option-icon">{getUOMIcon('lb')}</div>
                                <div>
                                    <div className="option-label">Pound</div>
                                    <div className="option-subtext">(lb)</div>
                                </div>
                                {currentUOM === 'lb' && <div className="option-check">✓</div>}
                            </div>

                            <div
                                className={`option-card ${currentUOM === 'g' ? 'active' : ''}`}
                                onClick={() => handleUOMChange('g')}
                            >
                                <div className="option-icon">{getUOMIcon('g')}</div>
                                <div>
                                    <div className="option-label">Gram</div>
                                    <div className="option-subtext">(g)</div>
                                </div>
                                {currentUOM === 'g' && <div className="option-check">✓</div>}
                            </div>

                            <div
                                className={`option-card ${currentUOM === 'm' ? 'active' : ''}`}
                                onClick={() => handleUOMChange('m')}
                            >
                                <div className="option-icon">{getUOMIcon('m')}</div>
                                <div>
                                    <div className="option-label">Meter</div>
                                    <div className="option-subtext">(m)</div>
                                </div>
                                {currentUOM === 'm' && <div className="option-check">✓</div>}
                            </div>
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