import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaTh, FaHome, FaUser, FaSnowflake, FaInfoCircle, FaDownload, FaShare, FaChevronRight } from 'react-icons/fa';
import { IoMdOptions } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
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
    const gridRef = useRef(null);

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

    // Comprehensive cooling calculation function
    const calculateCoolingRequirements = (inputs) => {
        // Extract all input values with defaults
        const {
            roomTemperature = 30,      // °C
            targetTemperature = 24,    // °C
            roomArea = 20,             // m²
            roomHeight = 3,            // m
            humidity = 50,             // %
            heatSources = 0,           // kW
            insulationQuality = 'medium', // low/medium/high
            roomOccupancy = 2,         // people
            sunlightExposure = 'medium' // low/medium/high
        } = inputs;

        // Constants
        const AIR_DENSITY = 1.2;       // kg/m³
        const SPECIFIC_HEAT = 1.005;    // kJ/kg·K
        const PERSON_HEAT = 0.1;        // kW per person
        const SUNLIGHT_FACTOR = {
            low: 0.2,
            medium: 0.5,
            high: 0.8
        };
        const INSULATION_FACTOR = {
            low: 1.2,
            medium: 1.0,
            high: 0.8
        };

        // Calculate room volume
        const roomVolume = roomArea * roomHeight; // m³

        // Calculate temperature difference
        const deltaT = roomTemperature - targetTemperature; // °C

        // Basic cooling load (sensible heat)
        let coolingLoad = AIR_DENSITY * roomVolume * SPECIFIC_HEAT * deltaT / 3600; // kW

        // Add occupancy heat
        coolingLoad += roomOccupancy * PERSON_HEAT;

        // Add other heat sources
        coolingLoad += heatSources;

        // Apply sunlight factor
        coolingLoad *= (1 + SUNLIGHT_FACTOR[sunlightExposure]);

        // Apply insulation factor
        coolingLoad *= INSULATION_FACTOR[insulationQuality];

        // Latent heat calculation (humidity)
        const latentHeat = 0.02 * humidity * roomVolume / 1000; // kW
        coolingLoad += latentHeat;

        // Convert to BTU/h (common cooling unit)
        const coolingCapacityBTU = coolingLoad * 3412.14;

        // Determine recommended cooler type
        let recommendedType = '';
        if (coolingCapacityBTU < 8000) {
            recommendedType = 'Portable Air Cooler';
        } else if (coolingCapacityBTU < 18000) {
            recommendedType = 'Split AC (1.5 Ton)';
        } else if (coolingCapacityBTU < 24000) {
            recommendedType = 'Window AC (2 Ton)';
        } else {
            recommendedType = 'Central Cooling System';
        }

        return {
            coolingLoadKW: coolingLoad.toFixed(2),
            coolingCapacityBTU: Math.round(coolingCapacityBTU),
            recommendedType,
            calculationDetails: {
                roomVolume: `${roomVolume} m³`,
                temperatureDifference: `${deltaT} °C`,
                sensibleHeat: `${(coolingLoad - latentHeat).toFixed(2)} kW`,
                latentHeat: `${latentHeat.toFixed(2)} kW`,
                totalHeatSources: `${(roomOccupancy * PERSON_HEAT + heatSources).toFixed(2)} kW`,
                sunlightFactor: SUNLIGHT_FACTOR[sunlightExposure],
                insulationFactor: INSULATION_FACTOR[insulationQuality]
            }
        };
    };

    const handleViewDetails = (modelId) => {
        // Show loading spinner with translated texts
        Swal.fire({
            title: t('calculating'),
            text: t('pleaseWait'),
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        setTimeout(() => {
            const result = calculateCoolingRequirements(state);

            Swal.fire({
                title: t('calculationComplete'),
                html: `
                    <div class="swal-result">
                        <div class="result-icon">
                            <svg viewBox="0 0 36 36" class="circular-chart">
                                <path class="circle-bg"
                                    d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path class="circle"
                                    stroke-dasharray="${Math.min(100, (result.coolingLoadKW / 5) * 100)}, 100"
                                    d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <text x="18" y="20.5" class="percentage">${result.coolingLoadKW} kW</text>
                                <text x="18" y="25" class="label">Cooling Load</text>
                            </svg>
                        </div>
                        <div class="result-details">
                            <p><strong>Recommended:</strong> ${result.recommendedType}</p>
                            <p><strong>Capacity:</strong> ${result.coolingCapacityBTU} BTU/h</p>
                        </div>
                    </div>
                `,
                icon: 'success',
                confirmButtonText: t('viewResult'),
                customClass: {
                    popup: 'animated tada'
                }
            }).then((res) => {
                if (res.isConfirmed) {
                    navigate('/result', { state: { result } });
                }
            });
        }, 1000);
    };

    return (
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
                        {t('recommendedSolutions')}
                        <span className="animated-underline"></span>
                    </p>
                </div>

                <div className="cooler-grid" ref={gridRef}>
                    {coolerModels.map((cooler, index) => (
                        <div
                            key={cooler.id}
                            className="cooler-card"
                            style={{
                                opacity: 0,
                                transform: 'translateY(30px)',
                                transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`
                            }}
                        >
                            <div className="card-header">
                                <div className="icon-container">
                                    <FaSnowflake className="icon pulse" />
                                </div>
                                <div className="header-content">
                                    <h2>{cooler.model}</h2>
                                    <div className="rating-badge">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <span key={i} className={i < cooler.rating ? 'star filled' : 'star'}></span>
                                        ))}
                                    </div>
                                </div>
                                <span className="capacity-badge">{cooler.capacity}</span>
                            </div>

                            <div className="card-body">
                                <div className="spec-grid">
                                    {cooler.refrigerant && (
                                        <div className="spec-item">
                                            <span className="spec-icon">❄️</span>
                                            <span className="spec-label">Refrigerant:</span>
                                            <span className="spec-value">{cooler.refrigerant}</span>
                                        </div>
                                    )}
                                    {cooler.tempRange && (
                                        <div className="spec-item">
                                            <span className="spec-icon">🌡️</span>
                                            <span className="spec-label">Temp Range:</span>
                                            <span className="spec-value">{cooler.tempRange}</span>
                                        </div>
                                    )}
                                    {cooler.evaporatorTemp && (
                                        <div className="spec-item">
                                            <span className="spec-icon">🌬️</span>
                                            <span className="spec-label">Evaporator Temp:</span>
                                            <span className="spec-value">{cooler.evaporatorTemp}</span>
                                        </div>
                                    )}
                                    {cooler.airFlow && (
                                        <div className="spec-item">
                                            <span className="spec-icon">💨</span>
                                            <span className="spec-label">Air Flow:</span>
                                            <span className="spec-value">{cooler.airFlow}</span>
                                        </div>
                                    )}
                                    {cooler.numFans && (
                                        <div className="spec-item">
                                            <span className="spec-icon">🌀</span>
                                            <span className="spec-label">Number of Fans:</span>
                                            <span className="spec-value">{cooler.numFans}</span>
                                        </div>
                                    )}
                                    {cooler.fanThrow && (
                                        <div className="spec-item">
                                            <span className="spec-icon">↔️</span>
                                            <span className="spec-label">Fan Throw:</span>
                                            <span className="spec-value">{cooler.fanThrow}</span>
                                        </div>
                                    )}
                                    {cooler.dimensions && (
                                        <div className="spec-item">
                                            <span className="spec-icon">📏</span>
                                            <span className="spec-label">Dimensions:</span>
                                            <span className="spec-value">
                                                {typeof cooler.dimensions === 'string'
                                                    ? cooler.dimensions
                                                    : `L: ${cooler.dimensions.length}mm, W: ${cooler.dimensions.width}mm, H: ${cooler.dimensions.height}mm`}
                                            </span>
                                        </div>
                                    )}
                                </div>



                                <div className="features-section">
                                    <h4>✨ {t('keyFeatures')}</h4>
                                    <ul>
                                        {cooler.features && cooler.features.length > 0 && (
                                            <div className="features-section">
                                                <h4>✨ {t('keyFeatures')}</h4>
                                                <ul>
                                                    {cooler.features.map((feature, index) => (
                                                        <li key={index}>
                                                            <FaChevronRight className="feature-icon" />
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                    </ul>
                                </div>
                            </div>

                            <div className="card-footer">
                                <div className="price-tag">
                                    <span className="price">{cooler.price}</span>
                                    {cooler.discount && <span className="discount">{cooler.discount}</span>}
                                </div>
                                <div className="action-buttons">
                                    <button
                                        className="action-btn download-btn"
                                        onClick={() => handleViewDetails(cooler.id)}
                                    >
                                        <FaDownload /> {t('brochure')}
                                    </button>
                                    <button className="action-btn share-btn">
                                        <FaShare /> {t('share')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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
    );
};

export default Output;