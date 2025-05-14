import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    FaArrowLeft, FaTh, FaHome, FaUser, FaSearch, FaCalculator,
    FaFan, FaTemperatureLow, FaTemperatureHigh, FaSnowflake, FaTint, FaMountain
} from 'react-icons/fa';
import Swal from 'sweetalert2';

import { IoMdOptions } from 'react-icons/io';
import Sidebar from '../Sidebar/Sidebar';
import './../assets/style.css';
import './Cooler.css';

import fieldsData from './fieldsData.json';

const Cooler = () => {
    const { type } = useParams();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('search');
    const navigate = useNavigate();
    const [state, setState] = useState({});
    const [calculationResult, setCalculationResult] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const handleBackClick = () => navigate(-1);

    const [title, setTitle] = useState('');
    const [fields, setFields] = useState([]);

    const handleChange = (name, value) => {
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

    const handleCalculate = () => {
        // Show loading spinner
        Swal.fire({
            title: 'Calculating...',
            text: 'Please wait while we calculate your cooling needs.',
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
                title: 'Calculation Complete',
                text: 'Your cooling requirements have been calculated.',
                icon: 'success',
                confirmButtonText: 'View Result'
            }).then((res) => {
                if (res.isConfirmed) {
                    navigate('/result', { state: { result } });
                }
            });
        }, 1000); // 1 second delay – you can remove this if calculation is instant
    };

    useEffect(() => {
        if (type) {
            const formattedTitle = type
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            setTitle(formattedTitle);
        } else {
            setTitle('No Title');
        }
    }, [type]);

    useEffect(() => {
        if (title && fieldsData[title]) {
            const fieldsForType = fieldsData[title];
            setFields(fieldsForType);
            const defaultState = fieldsForType.reduce((acc, field) => {
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
                            setShowResult(false);
                        }}
                    >
                        <FaSearch className="tab-icon" />
                        <span>Search Coolers</span>
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'calculate' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab('calculate');
                            setShowResult(false);
                        }}
                    >
                        <FaCalculator className="tab-icon" />
                        <span>Calculate</span>
                    </button>
                </div>

                {showResult ? (
                    <div className="result-container">
                        <h3 className="result-title">Cooling Requirements</h3>

                        <div className="result-summary">
                            <div className="result-card primary">
                                <h4>Total Cooling Load</h4>
                                <p className="result-value">{calculationResult.coolingLoadKW} kW</p>
                                <p className="result-subtext">{calculationResult.coolingCapacityBTU} BTU/h</p>
                            </div>

                            <div className="result-card secondary">
                                <h4>Recommended System</h4>
                                <p className="result-value">{calculationResult.recommendedType}</p>
                            </div>
                        </div>

                        <div className="result-details">
                            <h4>Calculation Details</h4>
                            <ul>
                                <li>Room Volume: <span>{calculationResult.calculationDetails.roomVolume}</span></li>
                                <li>Temperature Difference: <span>{calculationResult.calculationDetails.temperatureDifference}</span></li>
                                <li>Sensible Heat: <span>{calculationResult.calculationDetails.sensibleHeat}</span></li>
                                <li>Latent Heat: <span>{calculationResult.calculationDetails.latentHeat}</span></li>
                                <li>Total Heat Sources: <span>{calculationResult.calculationDetails.totalHeatSources}</span></li>
                                <li>Sunlight Factor: <span>{calculationResult.calculationDetails.sunlightFactor}x</span></li>
                                <li>Insulation Factor: <span>{calculationResult.calculationDetails.insulationFactor}x</span></li>
                            </ul>
                        </div>

                        <button
                            className="primary-btn"
                            onClick={() => setShowResult(false)}
                        >
                            Back to Input
                        </button>
                    </div>
                ) : (
                    <div className='field-container'>
                        {Object.entries(groupFieldsBySection(fields)).map(([sectionTitle, sectionFields]) => (
                            <div className="card-section" key={sectionTitle}>
                                <h3 className="section-title">
                                    {sectionTitle === 'Temperature' && <FaTemperatureHigh className="section-icon" />}
                                    {sectionTitle === 'Humidity' && <FaTint className="section-icon" />}
                                    {sectionTitle === 'Room' && <FaHome className="section-icon" />}
                                    {sectionTitle === 'Environment' && <FaMountain className="section-icon" />}
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

                                    if (type === 'select') {
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
                                disabled={!Object.keys(state).length}
                            >
                                {activeTab === 'search' ? (
                                    <>
                                        <FaSearch className="btn-icon" />
                                        Search Coolers
                                    </>
                                ) : (
                                    <>
                                        <FaCalculator className="btn-icon" />
                                        Calculate Cooling Needs
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* Bottom Navigation */}
                <div className="bottom-nav">
                    <button className="btn" id="menuBtn" onClick={toggleSidebar}>
                        <FaTh />
                        <span className="btn-label">Menu</span>
                    </button>
                    <Link className="btn" id="homeBtn" to="/home">
                        <FaHome />
                        <span className="btn-label">Home</span>
                    </Link>
                    <Link className="btn active" id="profileBtn" to="/profile">
                        <FaUser />
                        <span className="btn-label">Profile</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cooler;