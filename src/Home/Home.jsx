import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaTh, FaHome, FaUser, FaCogs, FaThermometerHalf, FaTemperatureLow, FaWind, FaBolt, FaHouseUser } from 'react-icons/fa';
import './../assets/style.css';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import categoriesData from './Categories.json';

const getIconForCategory = (categoryName) => {
    switch (categoryName) {
        case "Condenser Coils":
            return <FaCogs />;
        case "Heat Exchanger":
            return <FaThermometerHalf />;
        case "Evaporator Coils":
            return <FaTemperatureLow />;
        case "Dry Coolers":
            return <FaWind />;
        case "Telecom Units":
            return <FaBolt />;
        case "Bulk Milk Cooling Systems":
            return <FaHouseUser />;
        default:
            return <FaCogs />;
    }
};

const generateTypeFromName = (categoryName) => {
    return categoryName.toLowerCase().replace(/\s+/g, '-');
};

const apiUrl = import.meta.env.VITE_API_URL;
console.log('API URL:', apiUrl);

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        setCategories(categoriesData);
    }, []);

    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const response = await axios.get(`${apiUrl}/categories`);
    //             setCategories(response.data);
    //         } catch (error) {
    //             console.error('Error fetching categories:', error);
    //         }
    //     };

    //     fetchCategories();
    // }, [apiUrl]);

    return (
        <div className="app-container">
            {/* Sidebar Component */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Back Button (Top Left) */}
            <button className="back-btn" id="backBtn" onClick={handleBackClick}>
                <FaArrowLeft />
            </button>

            {/* Main Content Area */}
            <div className={`container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="app-header">
                    <p data-translate-key="indexappheadertext">Find the ideal air cooler for your room's unique needs.</p>
                </div>

                <div className="index-row">
                    {categories.map((category, index) => {
                        const categoryType = generateTypeFromName(category.name);
                        return (
                            <Link
                                to={`/cooler/${categoryType}`}
                                className="card-custom"
                                key={index}
                                style={{
                                    backgroundImage: `url(${category.backgroundImage})`
                                }}
                            >
                                <div className="overlay">
                                    <div className="icon">
                                        {getIconForCategory(category.name)}
                                    </div>
                                    <h5 className="title">{category.name}</h5>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Navigation Bar */}
            <div className="bottom-nav">
                <button className="btn" id="menuBtn" onClick={toggleSidebar}>
                    <FaTh />
                    <span className="btn-label">Menu</span>
                </button>
                <Link className="btn active" id="homeBtn" to="/home">
                    <FaHome />
                    <span className="btn-label">Home</span>
                </Link>
                <Link className="btn" id="profileBtn" to="/profile">
                    <FaUser />
                    <span className="btn-label">Profile</span>
                </Link>
            </div>
        </div>
    );
};

export default Home;
