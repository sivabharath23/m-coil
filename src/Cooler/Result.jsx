import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTh, FaHome, FaInfoCircle, FaUser, FaDownload, FaSnowflake } from 'react-icons/fa';
import { IoMdOptions } from 'react-icons/io';
import Sidebar from '../Sidebar/Sidebar';
import './../assets/style.css';
import './Cooler.css';
import logo from './../assets/logo.png';
import { useTranslation } from 'react-i18next';
import html2pdf from 'html2pdf.js';
import { useParams } from 'react-router-dom';


const Result = () => {
    const { t } = useTranslation();
    const { type } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [template, setTemplate] = useState('standard');
    const [title, setTitle] = useState('');
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const handleBackClick = () => navigate(-1);


    // useEffect(() => {
    //     const savedTemplate = localStorage.getItem('coolingTemplate') || 'standard';
    //     setTemplate(savedTemplate);
    // }, []);



    useEffect(() => {
        if (type) {

            // Set title for display
            const formattedTitle = type
                .split('-')
                .map(word => t(word.charAt(0).toUpperCase() + word.slice(1)))
                .join(' ');
            setTitle(formattedTitle);

        } else {
            setTitle(t('noTitle'));
        }
    }, [type, t]);

    const resultData = {
        model: 'MEE 3002 4D',
        capacity: '4.9 kW',
        surface: '12.5 m²',
        airFlow: '3700 m³/h',
        airThrow: '7 m',
        refrigerantType: 'R404A',
        evaporatorTemp: '+2 °C',
        dt1: '8 K',
        condenserTemp: '55 °C',
        fanDetail: '300 mm X 2',
        finSpacing: '4 MM',
        fanVoltage: '230V/1PH',
        fanCurrent: '0.84 A',
        defrostType: 'Air Defrost',
        casing: 'GI Powder coated RAL 9003',
        tubes: 'COPPER',
        fins: 'ALUMINIUM',
        width: '425 mm',
        length: '1022 mm',
        height: '474 mm',
        weight: '22 kg',
        inletConnection: '12 mm',
        outletConnection: '22 mm',
    };

    const renderTemplate = () => {
        switch (title) {
            case 'Evaporator Coil':
                return generateEvaporatorCoilTemplate();
            case 'Condensing Unit':
                return generateCondensingUnitTemplate();

            default:
                return generateDefaultTemplate();
        }
    };

    const generateCondensingUnitTemplate = () => {
        const currentDate = new Date().toLocaleString();

        return (
            <div className="template-output new-template">
                <div className="template-header">
                    <div className="template-logo">
                        <img src={logo} alt="Company Logo" className="logo-image" />
                    </div>
                </div>
                <hr className="divider" />

                {/* Model Section */}
                <div className="spec-section">
                    <h3 className="section-title">Model: MCCS-380MT</h3>
                    <p className="section-subtitle">Air Cooled Condensing Unit</p>
                </div>

                {/* Unit Specifications */}
                <div className="spec-section">
                    <h4 className="section-subtitle">Unit Specifications:</h4>
                    <table className="spec-table">
                        <tbody>
                            <tr>
                                <td>Series</td>
                                <td>Standard</td>
                            </tr>
                            <tr>
                                <td>Refrigerant</td>
                                <td>R404A</td>
                            </tr>
                            <tr>
                                <td>Evaporating SST</td>
                                <td>-5°C</td>
                            </tr>
                            <tr>
                                <td>Condensing SDT</td>
                                <td>55°C</td>
                            </tr>
                            <tr>
                                <td>Ambient Temperature</td>
                                <td>43°C</td>
                            </tr>
                            <tr>
                                <td>Suction Gas Superheat</td>
                                <td>10.0 K</td>
                            </tr>
                            <tr>
                                <td>Useful Superheat</td>
                                <td>100%</td>
                            </tr>
                            <tr>
                                <td>Operating Mode</td>
                                <td>With Sub Cooler (Bock Factory Fitted)</td>
                            </tr>
                            <tr>
                                <td>Condensing Unit Air Flow (50Hz)</td>
                                <td>9350 CMH</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Compressor Details */}
                <div className="spec-section">
                    <h4 className="section-subtitle">Compressor Details:</h4>
                    <table className="spec-table">
                        <tbody>
                            <tr>
                                <td>Compressor Type</td>
                                <td>HGX34e/380-4S (Bock)</td>
                            </tr>
                            <tr>
                                <td>Compressor Design</td>
                                <td>Semi-Hermetic Reciprocating</td>
                            </tr>
                            <tr>
                                <td>Cooling Capacity</td>
                                <td>16.70 KW</td>
                            </tr>
                            <tr>
                                <td>Capacity Steps</td>
                                <td>100%</td>
                            </tr>
                            <tr>
                                <td>Power Input</td>
                                <td>9.36 KW</td>
                            </tr>
                            <tr>
                                <td>Voltage Range</td>
                                <td>380-420 V</td>
                            </tr>
                            <tr>
                                <td>Liquid Subcooling</td>
                                <td>6 K</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Electrical Data */}
                <div className="spec-section">
                    <h4 className="section-subtitle">Electrical Data:</h4>
                    <table className="spec-table">
                        <tbody>
                            <tr>
                                <td>Power Supply</td>
                                <td>380 V - 420 V, 50 Hz, 3 Phase</td>
                            </tr>
                            <tr>
                                <td>Max. Operating Current</td>
                                <td>14.70 A</td>
                            </tr>
                            <tr>
                                <td>Max. Power Input</td>
                                <td>8.86 KW</td>
                            </tr>
                            <tr>
                                <td>Power Connection</td>
                                <td>DOL, Part Winding</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Dimensions and Connections */}
                <div className="spec-section">
                    <h4 className="section-subtitle">Dimensions and Connections:</h4>
                    <table className="spec-table">
                        <tbody>
                            <tr>
                                <td>Weight (Approx.)</td>
                                <td>210 kg</td>
                            </tr>
                            <tr>
                                <td>Total Length (L)</td>
                                <td>1250 MM</td>
                            </tr>
                            <tr>
                                <td>Total Width (W)</td>
                                <td>1000 MM</td>
                            </tr>
                            <tr>
                                <td>Total Height (H)</td>
                                <td>807 MM</td>
                            </tr>
                            <tr>
                                <td>Connection Suction Line</td>
                                <td>1-1/8"</td>
                            </tr>
                            <tr>
                                <td>Connection Liquid Line</td>
                                <td>5/8"</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Scope of Supply */}
                <div className="spec-section">
                    <h4 className="section-subtitle">Scope of Supply:</h4>
                    <ul className="supply-list">
                        <li>Compressor With Crankcase Heater and Ester Oil (Bock Factory Mounted)</li>
                        <li>Air Cooled Condenser</li>
                        <li>Axial Fans (Ø450 X 2, CE Certified, Made In EU)</li>
                        <li>Suction Accumulator (Bitzer Factory Mounted)</li>
                        <li>Liquid Sub Cooler (15 LTR, CE Certified)</li>
                        <li>Liquid Receiver</li>
                        <li>Vibration Eliminator (Danfoss Make)</li>
                        <li>Solenoid Valve (Danfoss Make)</li>
                        <li>Sight Glass (Made In EU)</li>
                        <li>Rotalock Valve (Danfoss Make)</li>
                        <li>Filter Drier (Danfoss Make Adjustable)</li>
                        <li>HP/LP Controls</li>
                        <li>Suction Line (included)</li>
                        <li>Discharge Line (included)</li>
                        <li>Liquid Line (included)</li>
                    </ul>
                </div>

                {/* Important Notes Section */}
                <div className="spec-section notes-section">
                    <h4 className="section-subtitle">Important Notes:</h4>
                    <ol className="notes-list">
                        <li>The data provided in this tech sheet is for specific conditions and it can vary with location and load.</li>
                        <li>It is advised that the unit should not be used in corrosive atmospheres.</li>
                        <li>All data is subject to change without prior notice.</li>
                        <li>The components data could change slightly depending on manufacturer design and data changes.</li>
                        <li>The capacity and power consumption can vary in +/-3% range for specific condition.</li>
                        <li>The technical and commercial information provided is property of ELECTROSPARK ENCLOUSURE PVT LTD</li>
                        <li>ELECTROSPARK condensing units are manufactured to world class standards.</li>
                        <li>For further details, please contact us at deepak@microcoils.in</li>
                    </ol>
                </div>

                {/* Footer */}
                <div className="template-footer">
                    <p>MICRO COILS AND REFRIGERATION PVT LTD</p>
                    <p>Plot No. E-41 (E-1), RIICO Industrial Area, Khushkhera, Distt. Khairthal-Tijara, Rajasthan -301707</p>
                    <p>Tel.: +91 966 9996610 | admin@micro.coil.s.lt | www.microcoils.h</p>
                </div>
            </div>
        );
    }

    const generateEvaporatorCoilTemplate = () => {
        const currentDate = new Date().toLocaleString();

        return (
            <div className="template-output new-template">
                <div className="template-header">
                    <div className="template-logo">
                        <img src={logo} alt="Company Logo" className="logo-image" />
                    </div>

                </div>
                <hr className="divider" />

                {/* Model Section */}
                <div className="spec-section">
                    <h3 className="section-title">Model: {resultData.model}</h3>
                </div>

                {/* Capacity Details */}
                <div className="spec-section">
                    <h4 className="section-subtitle">Capacity Details:</h4>
                    <table className="spec-table">
                        <tbody>
                            <tr>
                                <td>Capacity</td>
                                <td>{resultData.capacity}</td>
                            </tr>
                            <tr>
                                <td>Surface</td>
                                <td>{resultData.surface}</td>
                            </tr>
                            <tr>
                                <td>Air Flow</td>
                                <td>{resultData.airFlow}</td>
                            </tr>
                            <tr>
                                <td>Air Throw</td>
                                <td>{resultData.airThrow}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Refrigerant Details */}
                <div className="spec-section">
                    <h4 className="section-subtitle">Refrigerant Details:</h4>
                    <table className="spec-table">
                        <tbody>
                            <tr>
                                <td>Refrigerant Type</td>
                                <td>{resultData.refrigerantType}</td>
                            </tr>
                            <tr>
                                <td>Evaporator Temp.</td>
                                <td>{resultData.evaporatorTemp}</td>
                            </tr>
                            <tr>
                                <td>DT1</td>
                                <td>{resultData.dt1}</td>
                            </tr>
                            <tr>
                                <td>Condenser Temp.</td>
                                <td>{resultData.condenserTemp}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Fans Section */}
                <div className="spec-section">
                    <h4 className="section-subtitle">Fans:</h4>
                    <table className="spec-table">
                        <tbody>
                            <tr>
                                <td>Fan Detail</td>
                                <td>{resultData.fanDetail}</td>
                            </tr>
                            <tr>
                                <td>Fin Spacing</td>
                                <td>{resultData.finSpacing}</td>
                            </tr>
                            <tr>
                                <td>Fan Voltage</td>
                                <td>{resultData.fanVoltage}</td>
                            </tr>
                            <tr>
                                <td>Fan Current</td>
                                <td>{resultData.fanCurrent}</td>
                            </tr>
                            <tr>
                                <td>Defrost Type</td>
                                <td>{resultData.defrostType}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Casing Details */}
                <div className="spec-section">
                    <h4 className="section-subtitle">Casing Details:</h4>
                    <table className="spec-table">
                        <tbody>
                            <tr>
                                <td>Casing</td>
                                <td>{resultData.casing}</td>
                            </tr>
                            <tr>
                                <td>Tubes</td>
                                <td>{resultData.tubes}</td>
                            </tr>
                            <tr>
                                <td>Fins</td>
                                <td>{resultData.fins}</td>
                            </tr>
                            <tr>
                                <td>Width</td>
                                <td>{resultData.width}</td>
                            </tr>
                            <tr>
                                <td>Length</td>
                                <td>{resultData.length}</td>
                            </tr>
                            <tr>
                                <td>Height</td>
                                <td>{resultData.height}</td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>{resultData.weight}</td>
                            </tr>
                            <tr>
                                <td>Inlet Connection</td>
                                <td>{resultData.inletConnection}</td>
                            </tr>
                            <tr>
                                <td>Outlet Connection</td>
                                <td>{resultData.outletConnection}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Important Notes Section */}
                <div className="spec-section notes-section">
                    <h4 className="section-subtitle">Important Notes:</h4>
                    <ol className="notes-list">
                        <li>The actual product may vary slightly from the image and dimensions shown above</li>
                        <li>It is advised that the unit should not be used in corrosive atmospheres</li>
                        <li>The fan data could change slightly depending on manufacturer design and data changes.</li>
                        <li>The technical and commercial information provided is property of MICRO COILS & REFRIGERATION PVT LTD.</li>
                        <li>MICRO COILS heat exchangers are manufactured to world class label.</li>
                        <li>For further details please contact us at deepak@microcoils.in</li>
                    </ol>
                </div>

                {/* Footer */}
                <div className="template-footer">
                    <p>MICRO COILS AND REFRIGERATION PVT LTD.</p>
                    <p>Plot No. E-41 (E-1), RIICO Industrial Area, Khushkhera, Distt. Khairthal-Tijara, Rajasthan -301707</p>
                    <p>Tel.: +91 966 9996610 | admin@micro.coil.s.lt | www.microcoils.h</p>
                </div>
            </div>
        );
    };


    const generateDefaultTemplate = () => {
        const currentDate = new Date().toLocaleString();

        return (
            <div>
                <div className="template-output">
                    <div className="template-header">
                        <div className="template-logo">
                            <img src={logo} alt="Company Logo" className="logo-image" />
                        </div>
                        <div className="template-header-info">
                            <h4>MICRO COILS AND REFRIGERATION PVT LTD.</h4>
                            <p>Plot No. E-41 (E-1), RIICO Industrial Area, Khushkhera, Distt. Khairthal-Tijara, Rajasthan -301707</p>
                            <p>Tel.: +91 966 9996610 | admin@micro.coil.s.lt | www.microcoils.h</p>
                            <h4>Cooling Load Calculation Results</h4>
                            <p className="text-muted">Generated on {currentDate} using {template} template</p>
                        </div>
                    </div>
                    <hr />

                    {/* Standard Template Content */}
                    <div className="template-section">
                        <div className="template-row">
                            <div className="template-col">
                                <h4><span role="img" aria-label="capacity">📊</span> Capacity Details</h4>
                                <table className="template-table">
                                    <tbody>
                                        <tr>
                                            <th>Total Cooling Load</th>
                                            <td>{resultData.capacity}</td>
                                        </tr>
                                        <tr>
                                            <th>Cooling Capacity</th>
                                            <td>{resultData.capacity} kW</td>
                                        </tr>
                                        <tr>
                                            <th>Recommended System</th>
                                            <td>{resultData.model}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="template-col">
                                <h4><span role="img" aria-label="details">📝</span> Calculation Details</h4>
                                <table className="template-table">
                                    <tbody>
                                        <tr>
                                            <th>Room Volume</th>
                                            <td>{resultData.surface}</td>
                                        </tr>
                                        <tr>
                                            <th>Temperature Difference</th>
                                            <td>{resultData.dt1} K</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="template-section">
                        <h4><span role="img" aria-label="heat">📈</span> Heat Calculations</h4>
                        <table className="template-table">
                            <tbody>
                                <tr>
                                    <th>Sensible Heat</th>
                                    <td>{resultData.airFlow}</td>
                                </tr>
                                <tr>
                                    <th>Latent Heat</th>
                                    <td>{resultData.airThrow}</td>
                                </tr>
                                <tr>
                                    <th>Total Heat Sources</th>
                                    <td>{resultData.refrigerantType}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="template-section">
                        <h4><span role="img" aria-label="environment">☀️</span> Environmental Factors</h4>
                        <table className="template-table">
                            <tbody>
                                <tr>
                                    <th>Sunlight Factor</th>
                                    <td>{resultData.evaporatorTemp}</td>
                                </tr>
                                <tr>
                                    <th>Insulation Factor</th>
                                    <td>{resultData.condenserTemp}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };


    const handleDownloadPDF = () => {
        Swal.fire({
            title: t('generatingPDF'),
            text: t('preparingDownload'),
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const element = document.querySelector('.template-output');
        const fileName = title ? `${title.replace(/\s+/g, '_')}.pdf` : 'cooling-results.pdf';

        const opt = {
            margin: 10,
            filename: fileName,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            },
            pagebreak: {
                mode: ['avoid-all', 'css', 'legacy'],
                before: '.page-break-before'
            }
        };

        setTimeout(() => {
            html2pdf().set(opt).from(element).save()
                .then(() => {
                    Swal.fire({
                        title: t('downloadReady'),
                        text: t('downloadReadyText', { template }),
                        icon: 'success',
                        confirmButtonText: t('ok')
                    });
                });
        }, 1000);
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
                <div className="result-container">
                    <div className="result-header">
                        <h3 className="section-title"><FaSnowflake />  {t('coolingRequirements')}</h3>
                        <div className="template-controls">
                            <button className="download-btn" onClick={handleDownloadPDF}>
                                <FaDownload /> {t('downloadPDF')}
                            </button>
                        </div>
                    </div>

                    {/* Template Output Displayed Here */}
                    {renderTemplate()}

                    <div className="action-footer">
                        <button className="primary-btn" onClick={handleBackClick}>
                            <FaArrowLeft className="btn-icon" />
                            {t('backToCalculator')}
                        </button>
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="bottom-nav">
                    <button className="btn" id="menuBtn" onClick={toggleSidebar}>
                        <FaTh />
                        <span className="btn-label">{t('menu')}</span>
                    </button>
                    <Link className="btn" id="homeBtn" to="/home">
                        <FaHome />
                        <span className="btn-label">{t('home')}</span>
                    </Link>
                    <Link className="btn active" id="profileBtn" to="/profile">
                        <FaUser />
                        <span className="btn-label">{t('profile')}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Result;