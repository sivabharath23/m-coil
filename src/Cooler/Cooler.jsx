import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    FaArrowLeft, FaTh, FaHome, FaUser, FaSearch, FaCalculator,
    FaFan, FaTemperatureLow, FaTemperatureHigh, FaSnowflake, FaTint, FaMountain
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';


import { IoMdOptions } from 'react-icons/io';
import Sidebar from '../Sidebar/Sidebar';
import './../assets/style.css';
import './Cooler.css';

import fieldsData from './fieldsData.json';

const Cooler = () => {
    const { t } = useTranslation();

    const { type } = useParams();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('search');
    const navigate = useNavigate();
    const [state, setState] = useState({});
    const [calculationResult, setCalculationResult] = useState(null);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const handleBackClick = () => navigate(-1);

    const [title, setTitle] = useState('');
    const [fields, setFields] = useState([]);

    const handleChange = (name, value) => {

        const field = fields.find(f => f.name === name);

        if (field?.type === 'number') {
            const min = field.min ?? -Infinity;
            const max = field.max ?? Infinity;
            value = Math.max(min, Math.min(max, value)); // clamp the value
        }
        setState(prevState => ({
            ...prevState,
            [name]: value,
        }));


    };

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

    const applyFieldConstraints = (fields) => {
        return fields.map(field => {
            if (field.type === 'number') {
                switch (field.name) {
                    case 'evapTemp':
                        return { ...field, min: -40, max: 10, step: 0.5 };
                    case 'condTemp':
                        return { ...field, min: 10, max: 60, step: 0.5 };
                    case 'capacity':
                        return { ...field, min: 1, max: 100, step: 1 };
                    default:
                        return field;
                }
            }
            return field;
        });
    };


    const handleCalculate = () => {
        // Show loading spinner with translated texts
        Swal.fire({
            title: t('calculating'), // Using t() to translate "Calculating..."
            text: t('pleaseWait'), // Using t() to translate "Please wait while we calculate your cooling needs."
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Simulate calculation delay (optional)
        setTimeout(() => {
            const result = calculateCoolingRequirements(state);

            Swal.fire({
                title: t('calculationComplete'),
                text: t('yourCoolingNeedsCalculated'),
                icon: 'success',
                confirmButtonText: t('viewResult')
            }).then((res) => {
                if (res.isConfirmed) {
                    navigate('/result', { state: { result } });
                }
            });
        }, 1000);
    };


    useEffect(() => {
        if (type) {
            const formattedTitle = type
                .split('-')
                .map(word => {
                    const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
                    return t(capitalizedWord);
                })
                .join(' ');

            setTitle(formattedTitle);
        } else {
            setTitle(t('noTitle'));
        }
    }, [type, t]);

    useEffect(() => {
        if (title && fieldsData[title]) {
            const fieldsForType = fieldsData[title];
            const constrainedFields = applyFieldConstraints(fieldsForType);
            setFields(constrainedFields);
            const defaultState = constrainedFields.reduce((acc, field) => {
                acc[field.name] = field.default;
                return acc;
            }, {});
            setState(defaultState);
        }
    }, [title]);


    const groupFieldsBySection = (fieldsArray) => {
        const grouped = {};
        fieldsArray.forEach(field => {
            if (!grouped[field.section]) {
                grouped[field.section] = [];
            }
            grouped[field.section].push(field);
        });
        return grouped;
    };

    return (
        <div className="app-container">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="app-header sticky-header">
                <button className="icon-btn" onClick={handleBackClick}>
                    <FaArrowLeft />
                </button>
                <h2 className='title'>{title}</h2>
                <button className="icon-btn" onClick={toggleSidebar}>
                    <IoMdOptions />
                </button>
            </div>

            <div className={`container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                {/* Mode Selection Tabs */}
                <div className="mode-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'search' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab('search');
                        }}
                    >
                        <FaSearch className="tab-icon" />
                        <span>{t('searchCoolers')}</span> {/* Translates 'Search Coolers' */}
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'calculate' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab('calculate');
                        }}
                    >
                        <FaCalculator className="tab-icon" />
                        <span>{t('calculate')}</span> {/* Translates 'Calculate' */}
                    </button>
                </div>

                {(
                    <div className='field-container'>
                        {Object.entries(groupFieldsBySection(fields)).map(([sectionTitle, sectionFields]) => (
                            <div className="card-section" key={sectionTitle}>
                                <h3 className="section-title">
                                    {sectionTitle === 'Temperature' && <FaTemperatureHigh className="section-icon" />}
                                    {sectionTitle === 'Humidity' && <FaTint className="section-icon" />}
                                    {sectionTitle === 'Room' && <FaHome className="section-icon" />}
                                    {sectionTitle === 'Environment' && <FaMountain className="section-icon" />}
                                    {sectionTitle !== 'Temperature' && sectionTitle !== 'Humidity' && sectionTitle !== 'Room' && sectionTitle !== 'Environment' && <FaSnowflake className="section-icon" />}
                                    <span>{sectionTitle}</span>
                                </h3>


                                {sectionFields.map(({ name, type, options, min, max, step, unit }) => {
                                    const label = name
                                        .replace(/([A-Z])/g, ' $1')
                                        .replace(/^./, str => str.toUpperCase());

                                    if (type === 'number') {
                                        return (
                                            <div className="input-group" key={name}>
                                                <label>
                                                    {label} {unit && `(${unit})`}
                                                </label>
                                                <input
                                                    type="number"
                                                    value={state[name] || ''}
                                                    onChange={(e) => handleChange(name, +e.target.value)}
                                                    min={min}
                                                    max={max}
                                                    step={step || 1}
                                                />

                                            </div>
                                        );
                                    }

                                    if (type === 'checkbox') {
                                        return (
                                            <div className="checkbox-group" key={name}>
                                                <input
                                                    type="checkbox"
                                                    id={name}
                                                    checked={state[name] || false}
                                                    onChange={(e) => handleChange(name, e.target.checked)}
                                                />
                                                <label htmlFor={name}>{label}</label>
                                            </div>
                                        );
                                    }

                                    if (type === 'select(button)') {
                                        return (
                                            <div className="input-group" key={name}>
                                                <label>{label}</label>
                                                <div className="icon-selector">
                                                    {options?.map((option) => (
                                                        <button
                                                            key={option.value}
                                                            className={`icon-option ${state[name] === option.value ? 'active' : ''}`}
                                                            onClick={() => handleChange(name, option.value)}
                                                        >
                                                            <FaSnowflake />
                                                            <span>{option.label}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    }

                                    if (type === 'select(normal)') {
                                        return (
                                            <div className="input-group" key={name}>
                                                <label htmlFor={name}>{label}</label>
                                                <select
                                                    id={name}
                                                    name={name}
                                                    value={state[name] || ''}
                                                    onChange={(e) => handleChange(name, e.target.value)}
                                                >
                                                    <option value="" disabled>Select an option</option>
                                                    {options?.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        );
                                    }

                                    if (type === 'radio') {
                                        return (
                                            <div className="input-group" key={name}>
                                                <label>{label}</label>
                                                <div className="radio-group">
                                                    {options?.map((option) => (
                                                        <label key={option.value} className="radio-option">
                                                            <input
                                                                type="radio"
                                                                name={name}
                                                                value={option.value}
                                                                checked={state[name] === option.value}
                                                                onChange={() => handleChange(name, option.value)}
                                                            />
                                                            <span>{option.label}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    }

                                    return null;
                                })}
                            </div>
                        ))}

                        {/* Action Button */}
                        <div className="action-footer">
                            <button
                                className="primary-btn"
                                onClick={handleCalculate}
                                disabled={!Object.keys(state).length} // Disable button if state is empty
                            >
                                {activeTab === 'search' ? (
                                    <>
                                        <FaSearch className="btn-icon" />
                                        {t('searchCoolers')} {/* Translates 'Search Coolers' */}
                                    </>
                                ) : (
                                    <>
                                        <FaCalculator className="btn-icon" />
                                        {t('calculateCoolingNeeds')} {/* Translates 'Calculate Cooling Needs' */}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}

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
                    <Link className="btn active" to="/profile">
                        <FaUser />
                        <span className="btn-label">{t('profile')}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cooler;