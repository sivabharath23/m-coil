import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTh, FaHome, FaUser, FaDownload } from 'react-icons/fa';
import { IoMdOptions } from 'react-icons/io';
import Sidebar from '../Sidebar/Sidebar';
import './../assets/style.css';
import './Cooler.css';


const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const result = location.state?.result;

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const handleBackClick = () => navigate(-1);

    const handleDownloadPDF = () => {
        Swal.fire({
            title: 'Generating PDF...',
            text: 'Please wait while we prepare your download.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        setTimeout(() => {
            Swal.fire({
                title: 'Download Ready!',
                text: 'Your PDF is ready to download.',
                icon: 'success',
                confirmButtonText: 'Download'
            });
        }, 2000);
    };


    if (!result) {
        return (
            <div className="app-container">
                <div className="container">
                    <h3>No results found</h3>
                    <button onClick={handleBackClick}>Go Back</button>
                </div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="app-header sticky-header">
                <button className="icon-btn" onClick={handleBackClick}>
                    <FaArrowLeft />
                </button>
                <h2 className='title '>Cooling Results</h2>
                <button className="icon-btn" onClick={toggleSidebar}>
                    <IoMdOptions />
                </button>
            </div>

            <div className={`container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="result-container">
                    <div className="result-header">
                        <h3 className="section-title">Cooling Requirements</h3>
                        <button
                            className="download-btn"
                            onClick={handleDownloadPDF}
                        >
                            <FaDownload /> Download PDF
                        </button>
                    </div>

                    <div className="result-summary">
                        <div className="result-card primary">
                            <h4 className='section-title'>Total Cooling Load</h4>
                            <p className="result-value">{result.coolingLoadKW} kW</p>
                            <p className="result-subtext">{result.coolingCapacityBTU} BTU/h</p>
                        </div>

                        <div className="result-card secondary">
                            <h4 className='section-title'> Recommended System</h4>
                            <p className="result-value">{result.recommendedType}</p>
                        </div>
                    </div>

                    <div className="result-details">
                        <h4 className='section-title'>Calculation Details</h4>
                        <ul>
                            <li>Room Volume: <span>{result.calculationDetails.roomVolume}</span></li>
                            <li>Temperature Difference: <span>{result.calculationDetails.temperatureDifference}</span></li>
                            <li>Sensible Heat: <span>{result.calculationDetails.sensibleHeat}</span></li>
                            <li>Latent Heat: <span>{result.calculationDetails.latentHeat}</span></li>
                            <li>Total Heat Sources: <span>{result.calculationDetails.totalHeatSources}</span></li>
                            <li>Sunlight Factor: <span>{result.calculationDetails.sunlightFactor}x</span></li>
                            <li>Insulation Factor: <span>{result.calculationDetails.insulationFactor}x</span></li>
                        </ul>
                    </div>

                    <div className="action-footer">
                        <button
                            className="primary-btn"
                            onClick={handleBackClick}
                        >
                            <FaArrowLeft className="btn-icon" />
                            Back to Calculator
                        </button>
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
                    <Link className="btn active" id="profileBtn" to="/profile">
                        <FaUser />
                        <span className="btn-label">Profile</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Result;