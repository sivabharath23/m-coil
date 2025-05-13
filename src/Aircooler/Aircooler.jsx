import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    FaArrowLeft,
    FaTh,
    FaHome,
    FaUser,
    FaSearch,
    FaCalculator,
    FaSnowflake,
    FaFan,
    FaTemperatureLow,
    FaTemperatureHigh,
    FaTint,
    FaMountain
} from 'react-icons/fa';
import { IoMdOptions } from 'react-icons/io';
import Sidebar from '../Sidebar/Sidebar';
import './../assets/style.css';
import './Aircooler.css';

const AirCooler = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('search'); // 'search' or 'calculate'
    const navigate = useNavigate();

    const [capacity, setCapacity] = useState(5);
    const [withCorrosionProtection, setWithCorrosionProtection] = useState(false);
    const [fluidType, setFluidType] = useState('R513A');
    const [evapTemp, setEvapTemp] = useState(-8);
    const [condTemp, setCondTemp] = useState(32);
    const [superheating, setSuperheating] = useState(5.2);
    const [subcooling, setSubcooling] = useState(2);
    const [inletTemp, setInletTemp] = useState(0);
    const [humidity, setHumidity] = useState(85);
    const [elevation, setElevation] = useState(0);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const handleBackClick = () => navigate(-1);

    const fluidOptions = [
        { value: 'R513A', label: 'R513A', icon: <FaSnowflake /> },
        { value: 'R744', label: 'R744', icon: <FaSnowflake /> },
        { value: 'A2L', label: 'A2L/A3', icon: <FaSnowflake /> }
    ];

    return (
        <div className="app-container">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="app-header sticky-header">
                <button className="icon-btn" onClick={handleBackClick}>
                    <FaArrowLeft />
                </button>
                <h2 className='title'>Air Cooler</h2>
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

                {/* Air Cooler Section */}
                <div className="card-section">
                    <h3 className="section-title">
                        <FaFan className="section-icon" />
                        <span>Air Cooler Settings</span>
                    </h3>

                    <div className="input-group">
                        <label>Capacity (kW)</label>
                        <div className="input-with-icon">
                            <input
                                type="number"
                                value={capacity}
                                onChange={(e) => setCapacity(+e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="corrosionProtection"
                            checked={withCorrosionProtection}
                            onChange={(e) => setWithCorrosionProtection(e.target.checked)}
                        />
                        <label htmlFor="corrosionProtection">
                            With corrosion protection
                        </label>
                    </div>
                </div>

                {/* Fluid Section */}
                <div className="card-section">
                    <h3 className="section-title">
                        <FaSnowflake className="section-icon" />
                        <span>Fluid Settings</span>
                    </h3>

                    <div className="input-group">
                        <label>Fluid Type</label>
                        <div className="icon-selector">
                            {fluidOptions.map(option => (
                                <button
                                    key={option.value}
                                    className={`icon-option ${fluidType === option.value ? 'active' : ''}`}
                                    onClick={() => setFluidType(option.value)}
                                >
                                    {option.icon}
                                    <span>{option.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="dual-input-group">
                        <div className="input-group">
                            <label>
                                <FaTemperatureLow className="input-icon" />
                                Evaporation (°C)
                            </label>
                            <input
                                type="number"
                                value={evapTemp}
                                onChange={(e) => setEvapTemp(+e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>
                                <FaTemperatureHigh className="input-icon" />
                                Condensation (°C)
                            </label>
                            <input
                                type="number"
                                value={condTemp}
                                onChange={(e) => setCondTemp(+e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="dual-input-group">
                        <div className="input-group">
                            <label>Superheating (K)</label>
                            <input
                                type="number"
                                value={superheating}
                                onChange={(e) => setSuperheating(+e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>Subcooling (K)</label>
                            <input
                                type="number"
                                value={subcooling}
                                onChange={(e) => setSubcooling(+e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Air Section */}
                <div className="card-section">
                    <h3 className="section-title">
                        <FaFan className="section-icon" />
                        <span>Air Settings</span>
                    </h3>

                    <div className="dual-input-group">
                        <div className="input-group">
                            <label>
                                <FaTemperatureLow className="input-icon" />
                                Inlet Temp (°C)
                            </label>
                            <input
                                type="number"
                                value={inletTemp}
                                onChange={(e) => setInletTemp(+e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>
                                <FaTint className="input-icon" />
                                Humidity (%)
                            </label>
                            <input
                                type="number"
                                value={humidity}
                                onChange={(e) => setHumidity(+e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>
                            <FaMountain className="input-icon" />
                            Elevation (m)
                        </label>
                        <input
                            type="number"
                            value={elevation}
                            onChange={(e) => setElevation(+e.target.value)}
                        />
                    </div>
                </div>

                {/* Action Button */}
                <div className="action-footer">
                    <button className="primary-btn">
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

export default AirCooler;