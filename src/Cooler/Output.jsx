import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaTh, FaHome, FaUser, FaSnowflake, FaInfoCircle, FaDownload, FaShare, FaChevronRight } from 'react-icons/fa';
import { IoMdOptions } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { FaArrowRight, FaTimes } from 'react-icons/fa';

import Swal from 'sweetalert2';
import './Output.css';
import OutputData from './Output.json';

const Output = () => {
    const { t } = useTranslation();
    const { type } = useParams();
    const [state, setState] = useState({});
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const handleBackClick = () => navigate(-1);
    const [coolerModels, setCoolerModels] = useState([]);
    const [title, setTitle] = useState('');
    const [selectedCooler, setSelectedCooler] = useState(null);

    // Scroll animation effect
    useEffect(() => {
        const handleScroll = () => {
            const cards = document.querySelectorAll('.cooler-card');
            cards.forEach(card => {
                const cardTop = card.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (cardTop < windowHeight * 0.75) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Trigger once on load

        return () => window.removeEventListener('scroll', handleScroll);
    }, [coolerModels]);

    useEffect(() => {
        if (type) {
            // Format the title to match JSON keys
            const jsonKey = type
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            // Set title for display
            const formattedTitle = type
                .split('-')
                .map(word => t(word.charAt(0).toUpperCase() + word.slice(1)))
                .join(' ');
            setTitle(formattedTitle);

            // Set models from JSON if key exists
            if (OutputData[jsonKey]) {
                setCoolerModels(OutputData[jsonKey]);
            } else {
                setCoolerModels([]);
                console.warn(`No data found for type: ${jsonKey}`);
            }
        } else {
            setTitle(t('noTitle'));
            setCoolerModels([]);
        }
    }, [type, t]);


    const handleViewDetails = (cooler) => {
        Swal.fire({
            title: t('loading'),
            text: t('pleaseWait'),
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        setTimeout(() => {
            Swal.close();
            setSelectedCooler(cooler);
        }, 500);
    };

    const flattenObject = (obj, prefix = '') =>
        Object.keys(obj).reduce((acc, k) => {
            const pre = prefix.length ? prefix + '.' : '';
            if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
                Object.assign(acc, flattenObject(obj[k], pre + k));
            } else {
                acc[pre + k] = obj[k];
            }
            return acc;
        }, {});


    return (
        <>
            {
                selectedCooler && (
                    <div className="custom-modal-overlay">
                        <div className="custom-modal">
                            <div className="card-header">
                                <div className="icon-container">❄️</div>
                                <div className="header-content">
                                    <h2>{selectedCooler.model}</h2>
                                    <div className="rating-badge">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={i < selectedCooler.rating ? 'star filled' : 'star'}>★</span>
                                        ))}
                                    </div>
                                </div>
                                <span className="capacity-badge">{selectedCooler.capacity || '-'}</span>
                            </div>

                            <div className="card-body">
                                <div className="spec-grid">
                                    {selectedCooler.refrigerant && (
                                        <div className="spec-item"><strong>❄️ Refrigerant:</strong> {selectedCooler.refrigerant}</div>
                                    )}
                                    {selectedCooler.tempRange && (
                                        <div className="spec-item"><strong>🌡️ Temp Range:</strong> {selectedCooler.tempRange}</div>
                                    )}
                                    {selectedCooler.evaporatorTemp && (
                                        <div className="spec-item"><strong>🌬️ Evaporator Temp:</strong> {selectedCooler.evaporatorTemp}</div>
                                    )}
                                    {selectedCooler.airFlow && (
                                        <div className="spec-item"><strong>💨 Air Flow:</strong> {selectedCooler.airFlow}</div>
                                    )}
                                    {selectedCooler.numFans && (
                                        <div className="spec-item"><strong>🌀 Number of Fans:</strong> {selectedCooler.numFans}</div>
                                    )}
                                    {selectedCooler.fanThrow && (
                                        <div className="spec-item"><strong>↔️ Fan Throw:</strong> {selectedCooler.fanThrow}</div>
                                    )}
                                    {selectedCooler.dimensions && (
                                        <div className="spec-item">
                                            <strong>📏 Dimensions:</strong>{' '}
                                            {typeof selectedCooler.dimensions === 'string'
                                                ? selectedCooler.dimensions
                                                : `L: ${selectedCooler.dimensions.length}mm, W: ${selectedCooler.dimensions.width}mm, H: ${selectedCooler.dimensions.height}mm`}
                                        </div>
                                    )}
                                </div>

                                {selectedCooler.features && selectedCooler.features.length > 0 && (
                                    <div className="features-section">
                                        <h4>✨ Key Features</h4>
                                        <ul>
                                            {selectedCooler.features.map((feature, index) => (
                                                <li key={index}>➡️ {feature}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-success btn-lg w-100"
                                    onClick={() => navigate(`/result/${type}`)}
                                >
                                    <FaArrowRight style={{ marginRight: 8 }} />
                                    {t('viewResult')}
                                </button>
                                <button
                                    className="btn btn-outline-danger btn-lg w-100"
                                    onClick={() => setSelectedCooler(null)}
                                >
                                    <FaTimes style={{ marginRight: 8 }} />
                                    Close
                                </button>
                            </div>

                        </div>
                    </div>
                )
            }
            <div className="app-container">
                <div className="app-header sticky-header">
                    <button className="icon-btn" onClick={handleBackClick}>
                        <FaArrowLeft />
                    </button>
                    <h2 className='title'>{title}</h2>
                    <button className="icon-btn" onClick={toggleSidebar}>
                        <IoMdOptions />
                    </button>
                </div>

                <div className='container'>
                    <div className="header-animation">
                        <p className="subtitle">
                            <FaSnowflake /> {t('recommendedSolutions')}
                            <span className="animated-underline"></span>
                        </p>
                    </div>

                    {coolerModels.length > 0 ? (
                        <div className="specs-table-container">
                            <table className="specs-table">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        {Object.keys(flattenObject(coolerModels[0])).map((key, idx) => (
                                            <th key={idx}>
                                                {key
                                                    .replace(/\./g, ' ')
                                                    .replace(/([a-z])([A-Z])/g, '$1 $2')
                                                    .replace(/_/g, ' ')
                                                    .replace(/\b\w/g, c => c.toUpperCase())}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {coolerModels.map((cooler, index) => {
                                        const flatCooler = flattenObject(cooler);
                                        return (
                                            <tr key={cooler.id}>
                                                <td>{index + 1}</td>
                                                {Object.entries(flatCooler).map(([key, value], i) => (
                                                    <td key={i}>
                                                        {key === 'model' ? (
                                                            <button
                                                                className="model-link"
                                                                onClick={() => handleViewDetails(cooler)}
                                                            >
                                                                {value}
                                                            </button>
                                                        ) : (
                                                            typeof value === 'string' || typeof value === 'number' ? value : '-'
                                                        )}
                                                    </td>
                                                ))}

                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="no-results">
                            <div className="no-results-icon">
                                <FaInfoCircle />
                            </div>
                            <h3>{t('noResultsTitle')}</h3>
                            <p>{t('noResultsMessage')}</p>
                            <div className='nores-btn'>
                                <button
                                    className="btn-primary"
                                    onClick={handleBackClick}
                                >
                                    <FaArrowLeft /> {t('goBack')}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Floating action button */}
                <div className="floating-action">
                    <button className="fab" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        ↑
                    </button>
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
            </div>
        </>
    );
};

export default Output;