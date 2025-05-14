import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    FaArrowLeft, FaTh, FaHome, FaUser, FaSearch, FaCalculator,
    FaFan, FaTemperatureLow, FaTemperatureHigh, FaSnowflake, FaTint, FaMountain
} from 'react-icons/fa';
import { IoMdOptions } from 'react-icons/io';
import Sidebar from '../Sidebar/Sidebar';
import './../assets/style.css';
import './Cooler.css';

import fieldsData from './fieldsData.json';

const Cooler = () => {
    const { type } = useParams();  // Get the type of cooler from URL parameters
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('search');
    const navigate = useNavigate();

    const [state, setState] = useState({});

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const handleBackClick = () => navigate(-1);

    const [title, setTitle] = useState('');
    const [fields, setFields] = useState([]);

    const handleChange = (name, value) => {
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const calculateResult = (state) => {
        // You can access the fields in state to perform your calculation
        const { temperature, humidity, otherField } = state;

        // Example calculation: you can replace this with your actual logic
        const result = temperature * humidity * (otherField || 1); // Just a sample calculation

        return result;
    };


    const handleCalculate = () => {
        // Calculate the result based on your state values
        const result = calculateResult(state); // Your custom calculation logic

        // Pass the result to the next component using navigate state
        navigate('/result', { state: { result } });
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
                        onClick={() => setActiveTab('search')}
                    >
                        <FaSearch className="tab-icon" />
                        <span>Search Coolers</span>
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'calculate' ? 'active' : ''}`}
                        onClick={() => setActiveTab('calculate')}
                    >
                        <FaCalculator className="tab-icon" />
                        <span>Calculate</span>
                    </button>
                </div>

                <div className='field-container'>
                    {Object.entries(groupFieldsBySection(fields)).map(([sectionTitle, sectionFields]) => (
                        <div className="card-section" key={sectionTitle}>
                            <h3 className="section-title">
                                <FaFan className="section-icon" />
                                <span>{sectionTitle}</span>
                            </h3>

                            {sectionFields.map(({ name, type, options }) => {
                                const label = name
                                    .replace(/([A-Z])/g, ' $1')
                                    .replace(/^./, str => str.toUpperCase());

                                if (type === 'number') {
                                    return (
                                        <div className="input-group" key={name}>
                                            <label>{label}</label>
                                            <input
                                                type="number"
                                                value={state[name] || ''}
                                                onChange={(e) => handleChange(name, +e.target.value)}
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

                                return null;
                            })}
                        </div>
                    ))}
                </div>

                {/* Action Button */}
                <div className="action-footer">
                    <button className="primary-btn" onClick={handleCalculate}>
                        {activeTab === 'search' ? 'Search Coolers' : 'Calculate'}
                    </button>
                </div>
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
