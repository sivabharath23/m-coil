import React, { useEffect, useState } from 'react';
import {
    FaArrowLeft, FaWind, FaCogs, FaRulerCombined,
    FaHouseUser, FaThermometerHalf, FaTemperatureLow,
    FaBolt, FaTh, FaHome, FaUser
} from 'react-icons/fa';
import './../assets/style.css';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

const apiUrl = import.meta.env.VITE_API_URL;
console.log('API URL:', apiUrl);

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Add ripple effect to buttons
    useEffect(() => {
        const createRipple = (event) => {
            const button = event.currentTarget;
            const circle = document.createElement("span");
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
            circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
            circle.classList.add("ripple");

            const ripple = button.getElementsByClassName("ripple")[0];
            if (ripple) ripple.remove();

            button.appendChild(circle);
        };

        const buttons = document.querySelectorAll(".btn, .card-custom");
        buttons.forEach(button => {
            button.addEventListener("click", createRipple);
        });

        return () => {
            buttons.forEach(button => {
                button.removeEventListener("click", createRipple);
            });
        };
    }, []);

    return (
        <div className="app-container">
            {/* Sidebar Component */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Back Button (Top Left) */}
            <button className="btn back-btn" id="backBtn" onClick={handleBackClick}>
                <FaArrowLeft />
            </button>

            {/* Main Content Area */}
            <div className={`container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="app-header">
                    <p data-translate-key="indexappheadertext">Find the ideal air cooler for your room's unique needs.</p>
                </div>

                {/* Cards Section */}
                <div className="index-row">
                    {/* Category 1 - Air Cooler Blast */}
                    <a href="air-cooler.html" className="card-custom">
                        <div className="card-body menu">
                            <FaWind className="mb-3" />
                            <h5 className="card-title" data-translate-key="airCoolerBlast">Air Cooler Blast</h5>
                        </div>
                    </a>

                    {/* Category 2 - Room Controller */}
                    <div className="card-custom">
                        <div className="card-body menu">
                            <FaCogs className="mb-3" />
                            <h5 className="card-title" data-translate-key="roomController">Room Controller</h5>
                        </div>
                    </div>

                    {/* Category 3 - Room Size */}
                    <div className="card-custom">
                        <div className="card-body menu">
                            <FaRulerCombined className="mb-3" />
                            <h5 className="card-title" data-translate-key="roomSize">Room Size</h5>
                        </div>
                    </div>

                    {/* Category 4 - Insulation Level */}
                    <div className="card-custom">
                        <div className="card-body menu">
                            <FaHouseUser className="mb-3" />
                            <h5 className="card-title" data-translate-key="insulationLevel">Insulation Level</h5>
                        </div>
                    </div>

                    {/* Category 5 - Current Temperature */}
                    <div className="card-custom">
                        <div className="card-body menu">
                            <FaThermometerHalf className="mb-3" />
                            <h5 className="card-title" data-translate-key="currentTemperature">Current Temperature</h5>
                        </div>
                    </div>

                    {/* Category 6 - Desired Temperature */}
                    <div className="card-custom">
                        <div className="card-body menu">
                            <FaTemperatureLow className="mb-3" />
                            <h5 className="card-title" data-translate-key="desiredTemperature">Desired Temperature</h5>
                        </div>
                    </div>

                    {/* Category 7 - Energy Efficiency */}
                    <div className="card-custom">
                        <div className="card-body menu">
                            <FaBolt className="mb-3" />
                            <h5 className="card-title" data-translate-key="energyEfficiency">Energy Efficiency</h5>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation Bar */}
            <div className="bottom-nav">
                <button className="btn" id="menuBtn" onClick={toggleSidebar}>
                    <FaTh />
                    <span className="btn-label">Menu</span>
                </button>
                <button className="btn active" id="homeBtn">
                    <FaHome />
                    <span className="btn-label">Home</span>
                </button>
                <button className="btn" id="profileBtn">
                    <FaUser />
                    <span className="btn-label">Profile</span>
                </button>
            </div>
        </div>
    );
};

export default Home;