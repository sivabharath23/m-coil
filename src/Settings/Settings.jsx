import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
    FaTimes, FaCheckCircle, FaTimesCircle, FaArrowLeft, FaTh,
    FaHome, FaUser, FaGlobe, FaMoneyBillWave, FaRuler,
    FaLanguage, FaEuroSign, FaPoundSign, FaRupeeSign,
    FaDollarSign, FaWeight, FaBalanceScale
} from 'react-icons/fa';

import Sidebar from '../Sidebar/Sidebar';
import './../assets/style.css';
import './Settings.css';

const Settings = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [currentCurrency, setCurrentCurrency] = useState('USD');
    const [currentUOM, setCurrentUOM] = useState('kg');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [pendingChange, setPendingChange] = useState({ type: '', value: '' });

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') || 'en';
        const savedCurrency = localStorage.getItem('currency') || 'INR';
        const savedUOM = localStorage.getItem('uom') || 'kg';

        setCurrentLanguage(savedLanguage);
        setCurrentCurrency(savedCurrency);
        setCurrentUOM(savedUOM);
        i18n.changeLanguage(savedLanguage);
    }, []);

    const handleLanguageChange = (lang) => {
        setPendingChange({ type: 'language', value: lang });
        setShowConfirmationModal(true);
    };

    const handleCurrencyChange = (currency) => {
        setPendingChange({ type: 'currency', value: currency });
        setShowConfirmationModal(true);
    };

    const handleUOMChange = (uom) => {
        setPendingChange({ type: 'uom', value: uom });
        setShowConfirmationModal(true);
    };

    const confirmChange = () => {
        switch (pendingChange.type) {
            case 'language':
                setCurrentLanguage(pendingChange.value);
                localStorage.setItem('language', pendingChange.value);
                i18n.changeLanguage(pendingChange.value);
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

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const handleBackClick = () => navigate(-1);

    const getSettingName = () => {
        switch (pendingChange.type) {
            case 'language':
                return t(pendingChange.value);
            case 'currency':
                return {
                    USD: 'USD ($)',
                    EUR: 'EUR (€)',
                    GBP: 'GBP (£)',
                    INR: 'INR (₹)',
                }[pendingChange.value];
            case 'uom':
                return t(pendingChange.value);
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
            case 'kg':
            case 'g':
                return <FaWeight />;
            case 'lb':
                return <FaBalanceScale />;
            case 'm':
                return <FaRuler />;
            default:
                return <FaRuler />;
        }
    };

    return (
        <div className={`app-container my-5 ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <button className="back-btn" onClick={handleBackClick}>
                <FaArrowLeft />
            </button>

            <div className="container">
                <div className="app-header mb-5">
                    <h2>{t('settings')}</h2>
                    <p>{t('customizePreferences')}</p>
                </div>

                {/* Language Selection */}
                <div className="card shadow-lg rounded border-0">
                    <div className="card-body">
                        <h4 className="text-center section-title"><FaLanguage /> {t('language')}</h4>
                        <hr />
                        <div className="option-grid">
                            {['en', 'es', 'fr', 'de'].map((lang) => (
                                <div
                                    key={lang}
                                    className={`option-card ${currentLanguage === lang ? 'active' : ''}`}
                                    onClick={() => handleLanguageChange(lang)}
                                >
                                    <div className="option-icon"><FaGlobe /></div>
                                    <div className="option-label">{t(lang)}</div>
                                    {currentLanguage === lang && <div className="option-check">✓</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Currency Selection */}
                <div className="card shadow-lg rounded border-0 mt-4">
                    <div className="card-body">
                        <h4 className="text-center section-title"><FaMoneyBillWave /> {t('currency')}</h4>
                        <hr />
                        <div className="option-grid">
                            {['USD', 'EUR', 'GBP', 'INR'].map((cur) => (
                                <div
                                    key={cur}
                                    className={`option-card ${currentCurrency === cur ? 'active' : ''}`}
                                    onClick={() => handleCurrencyChange(cur)}
                                >
                                    <div className="option-icon">{getCurrencyIcon(cur)}</div>
                                    <div className="option-label">{cur}</div>
                                    {currentCurrency === cur && <div className="option-check">✓</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Unit of Measurement Selection */}
                <div className="card shadow-lg rounded border-0 mt-4">
                    <div className="card-body">
                        <h4 className="text-center section-title"><FaRuler /> {t('uom')}</h4>
                        <hr />
                        <div className="option-grid">
                            {['kg', 'lb', 'g', 'm'].map((unit) => (
                                <div
                                    key={unit}
                                    className={`option-card ${currentUOM === unit ? 'active' : ''}`}
                                    onClick={() => handleUOMChange(unit)}
                                >
                                    <div className="option-icon">{getUOMIcon(unit)}</div>
                                    <div>
                                        <div className="option-label">{t(unit)}</div>
                                        <div className="option-subtext">({unit})</div>
                                    </div>
                                    {currentUOM === unit && <div className="option-check">✓</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="bottom-nav">
                    <button className="btn" onClick={toggleSidebar}>
                        <FaTh />
                        <span className="btn-label">{t('menu')}</span>
                    </button>
                    <Link className="btn" to="/home">
                        <FaHome />
                        <span className="btn-label">{t('home')}</span>
                    </Link>
                    <Link className="btn" to="/profile">
                        <FaUser />
                        <span className="btn-label">{t('profile')}</span>
                    </Link>
                </div>

                {/* Confirmation Modal */}
                {showConfirmationModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="modal-title">{t('confirmChange')}</h2>
                                <button
                                    type="button"
                                    className="close-btn"
                                    onClick={() => setShowConfirmationModal(false)}
                                >
                                    <FaTimes />
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>{t('areYouSure')}</p>
                                <p className="setting"><strong>{getSettingName()}</strong></p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-lg w-100"
                                    onClick={() => setShowConfirmationModal(false)}
                                >
                                    <FaTimesCircle /> {t('cancel')}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success btn-lg w-100"
                                    onClick={confirmChange}
                                >
                                    <FaCheckCircle /> {t('confirm')}
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
