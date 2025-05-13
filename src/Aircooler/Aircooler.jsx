import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';


import {

    FaArrowLeft,
    FaTh,
    FaHome,
    FaUser
} from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import './../assets/style.css';
import './Aircooler.css';

const AirCooler = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    const handleBackClick = () => {
        navigate(-1);
    };


    return (

        <div className="app-container">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <button className="back-btn" id="backBtn" onClick={handleBackClick}>
                <FaArrowLeft />
            </button>

            <div className={`container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="app-header mb-5">
                    <h2 className="mb-4">Air Cooler</h2>
                    <p>Set air cooler fluid, temperature, and air settings.</p>
                </div>

                {/* Air Cooler Section */}
                <div className="card p-4 mb-4">
                    <div className='card-body'>
                        <h4>Air cooler</h4>
                        <div className="form-check">
                            <input type="radio" className="form-check-input" name="coolerOption" checked readOnly />
                            <label className="form-check-label">Search air coolers</label>
                        </div>
                        <div className="form-check mb-2">
                            <input type="radio" className="form-check-input" name="coolerOption" />
                            <label className="form-check-label">Calculate specific air cooler</label>
                        </div>

                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control"
                                placeholder=" "
                                value={capacity}
                                onChange={(e) => setCapacity(+e.target.value)}
                            />
                            <label className="form-label">Capacity (kW)</label>
                        </div>

                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={withCorrosionProtection}
                                onChange={(e) => setWithCorrosionProtection(e.target.checked)}
                            />
                            <label className="form-check-label">With corrosion protection</label>
                        </div>
                    </div>
                </div>

                {/* Fluid Section */}
                <div className="card p-4 mb-4">
                    <div className='card-body'>
                        <h4>Fluid</h4>

                        <div className="form-group">
                            <select
                                className="form-control"
                                placeholder=" "
                                value={fluidType}
                                onChange={(e) => setFluidType(e.target.value)}
                            >
                                <option value="R513A">A1 (HFC) - R513A</option>
                                <option value="R744">CO₂ (R744)</option>
                                <option value="A2L">A2L/A3</option>
                            </select>
                            <label className="form-label">Fluid Type</label>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder=" "
                                        value={evapTemp}
                                        onChange={(e) => setEvapTemp(+e.target.value)}
                                    />
                                    <label className="form-label">Evaporation Temp (°C)</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder=" "
                                        value={condTemp}
                                        onChange={(e) => setCondTemp(+e.target.value)}
                                    />
                                    <label className="form-label">Condensation Temp (°C)</label>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder=" "
                                        value={superheating}
                                        onChange={(e) => setSuperheating(+e.target.value)}
                                    />
                                    <label className="form-label">Superheating (K)</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder=" "
                                        value={subcooling}
                                        onChange={(e) => setSubcooling(+e.target.value)}
                                    />
                                    <label className="form-label">Subcooling (K)</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Air Section */}
                <div className="card p-4 mb-4">
                    <div className='card-body'>
                        <h4>Air</h4>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder=" "
                                        value={inletTemp}
                                        onChange={(e) => setInletTemp(+e.target.value)}
                                    />
                                    <label className="form-label">Inlet Temperature (°C)</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder=" "
                                        value={humidity}
                                        onChange={(e) => setHumidity(+e.target.value)}
                                    />
                                    <label className="form-label">Humidity at Inlet (%)</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder=" "
                                value={elevation}
                                onChange={(e) => setElevation(+e.target.value)}
                            />
                            <label className="form-label">Elevation (m)</label>
                        </div>
                    </div>
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
                    <Link className="btn" id="profileBtn" to="/profile">
                        <FaUser />
                        <span className="btn-label">Profile</span>
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default AirCooler;
