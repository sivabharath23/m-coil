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
import logo1 from './../assets/cool.png';
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

    const evoResultData = {
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
        defrostwatts: '23 W',
        casing: 'GI Powder coated RAL 9003',
        tubes: 'COPPER',
        fins: 'ALUMINIUM',
        width: '425 mm',
        length: '1022 mm',
        height: '474 mm',
        weight: '22 kg',
        inletConnection: '12 mm',
        outletConnection: '22 mm',
        images: [
            '/assets/images/modals/m125.png',

        ],
        graph: [
            '/assets/images/modals/graph.png',
        ],
    };

    const conResultData = {
        model: "MCCS-380MT",
        description: "Air Cooled Condensing Unit",

        unitSpecifications: {
            series: "Standard",
            refrigerant: "R404A",
            evaporatingSST: "-5°C",
            condensingSDT: "55°C",
            ambientTemp: "43°C",
            suctionGasSuperheat: "10.0 K",
            usefulSuperheat: "100%",
            operatingMode: "With Sub Cooler (Bock Factory Fitted)",
            airFlow: "9350 CMH"
        },

        compressor: {
            type: "HGX34e/380-4S (Bock)",
            design: "Semi-Hermetic Reciprocating",
            capacity: "16.70 KW",
            steps: "100%",
            powerInput: "9.36 KW",
            voltageRange: "380-420 V",
            subcooling: "6 K"
        },

        electrical: {
            powerSupply: "380 V - 420 V, 50 Hz, 3 Phase",
            maxCurrent: "14.70 A",
            maxPower: "8.86 KW",
            connection: "DOL, Part Winding"
        },

        dimensions: {
            weight: "210 kg",
            length: "1250 MM",
            width: "1000 MM",
            height: "807 MM",
            suctionLine: '1-1/8"',
            liquidLine: '5/8"'
        },

        scopeOfSupply: [
            "Compressor With Crankcase Heater and Ester Oil (Bock Factory Mounted)",
            "Air Cooled Condenser",
            "Axial Fans (Ø450 X 2, CE Certified, Made In EU)",
            "Suction Accumulator (Bitzer Factory Mounted)",
            "Liquid Sub Cooler (15 LTR, CE Certified)",
            "Liquid Receiver",
            "Vibration Eliminator (Danfoss Make)",
            "Solenoid Valve (Danfoss Make)",
            "Sight Glass (Made In EU)",
            "Rotalock Valve (Danfoss Make)",
            "Filter Drier (Danfoss Make Adjustable)",
            "HP/LP Controls"
        ],

        images: [
            '/assets/images/modals/m125.png',

        ],
        graph: [
            '/assets/images/modals/graph.png',
        ],

        notes: [
            "The data provided in this tech sheet is for specific conditions and it can vary with location and load.",
            "It is advised that the unit should not be used in corrosive atmospheres.",
            "All data is subject to change without prior notice.",
            "The components data could change slightly depending on manufacturer design and data changes.",
            "The capacity and power consumption can vary in +/-3% range for specific condition.",
            "The technical and commercial information provided is property of ELECTROSPARK ENCLOUSURE PVT LTD",
            "ELECTROSPARK condensing units are manufactured to world class standards.",
            "For further details, please contact us at deepak@microcoils.in"
        ]
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
                        <img src={logo1} alt="Company Logo" className="logo-image" />

                    </div>
                </div>
                <hr className="divider" />

                {/* Model Section */}
                <div className="spec-section">
                    <h3 className="section-title">Model: {conResultData.model}</h3>
                    <p className="section-subtitle">{conResultData.description}</p>
                </div>

                {/* Unit Specifications */}
                <div className="spec-section">
                    <h4 className="section-subtitle">Unit Specifications:</h4>
                    <table className="spec-table">
                        <tbody>
                            <tr><td>Series</td><td>{conResultData.unitSpecifications.series}</td></tr>
                            <tr><td>Refrigerant</td><td>{conResultData.unitSpecifications.refrigerant}</td></tr>
                            <tr><td>Evaporating SST</td><td>{conResultData.unitSpecifications.evaporatingSST}</td></tr>
                            <tr><td>Condensing SDT</td><td>{conResultData.unitSpecifications.condensingSDT}</td></tr>
                            <tr><td>Ambient Temperature</td><td>{conResultData.unitSpecifications.ambientTemp}</td></tr>
                            <tr><td>Suction Gas Superheat</td><td>{conResultData.unitSpecifications.suctionGasSuperheat}</td></tr>
                            <tr><td>Useful Superheat</td><td>{conResultData.unitSpecifications.usefulSuperheat}</td></tr>
                            <tr><td>Operating Mode</td><td>{conResultData.unitSpecifications.operatingMode}</td></tr>
                            <tr><td>Condensing Unit Air Flow (50Hz)</td><td>{conResultData.unitSpecifications.airFlow}</td></tr>
                        </tbody>
                    </table>
                </div>

                {/* Compressor Details */}
                <div className="spec-section">
                    <h4 className="section-subtitle">Compressor Details:</h4>
                    <table className="spec-table">
                        <tbody>
                            <tr><td>Compressor Type</td><td>{conResultData.compressor.type}</td></tr>
                            <tr><td>Compressor Design</td><td>{conResultData.compressor.design}</td></tr>
                            <tr><td>Cooling Capacity</td><td>{conResultData.compressor.capacity}</td></tr>
                            <tr><td>Capacity Steps</td><td>{conResultData.compressor.steps}</td></tr>
                            <tr><td>Power Input</td><td>{conResultData.compressor.powerInput}</td></tr>
                            <tr><td>Voltage Range</td><td>{conResultData.compressor.voltageRange}</td></tr>
                            <tr><td>Liquid Subcooling</td><td>{conResultData.compressor.subcooling}</td></tr>
                        </tbody>
                    </table>
                </div>

                {/* Electrical Data */}
                <div className="spec-section">
                    <h4 className="section-subtitle">Electrical Data:</h4>
                    <table className="spec-table">
                        <tbody>
                            <tr><td>Power Supply</td><td>{conResultData.electrical.powerSupply}</td></tr>
                            <tr><td>Max. Operating Current</td><td>{conResultData.electrical.maxCurrent}</td></tr>
                            <tr><td>Max. Power Input</td><td>{conResultData.electrical.maxPower}</td></tr>
                            <tr><td>Power Connection</td><td>{conResultData.electrical.connection}</td></tr>
                        </tbody>
                    </table>
                </div>

                {/* Dimensions and Connections */}
                <div className="spec-section">
                    <h4 className="section-subtitle">Dimensions and Connections:</h4>
                    <table className="spec-table">
                        <tbody>
                            <tr><td>Weight (Approx.)</td><td>{conResultData.dimensions.weight}</td></tr>
                            <tr><td>Total Length (L)</td><td>{conResultData.dimensions.length}</td></tr>
                            <tr><td>Total Width (W)</td><td>{conResultData.dimensions.width}</td></tr>
                            <tr><td>Total Height (H)</td><td>{conResultData.dimensions.height}</td></tr>
                            <tr><td>Connection Suction Line</td><td>{conResultData.dimensions.suctionLine}</td></tr>
                            <tr><td>Connection Liquid Line</td><td>{conResultData.dimensions.liquidLine}</td></tr>
                        </tbody>
                    </table>
                </div>

                {/* Scope of Supply */}
                <div className="spec-section">
                    <h4 className="section-subtitle">Scope of Supply:</h4>
                    <ul className="supply-list">
                        {conResultData.scopeOfSupply.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Image Gallery Section */}
                <div className="images-section">
                    <div className="image-gallery">
                        {conResultData.images.map((imageUrl, index) => (
                            <div className="image-container" key={index}>
                                <img src={imageUrl} alt={`Condensing Unit ${index + 1}`} className="product-image" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="images-section">
                    <div className="image-gallery">
                        {conResultData.graph.map((imageUrl, index) => (
                            <div className="image-container" key={index}>
                                <img src={imageUrl} alt={`graph ${index + 1}`} className="product-image" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Important Notes Section */}
                <div className="spec-section notes-section">
                    <h4 className="section-subtitle">Important Notes:</h4>
                    <ol className="notes-list">
                        {conResultData.notes.map((note, idx) => (
                            <li key={idx}>{note}</li>
                        ))}
                    </ol>
                </div>

                {/* Footer */}
                <div className="template-footer">
                    <p>MICRO COILS AND REFRIGERATION PVT LTD</p>
                    <p>Plot No. E-41 (E-1), RIICO Industrial Area, Khushkhera, Distt. Khairthal-Tijara, Rajasthan -301707</p>
                    <p>Mob.: +91 971 770 9933 / +91 981 055 0100 | sales@microcoils.in | www.microcoils.in</p>
                </div>
            </div>
        );
    };


    const generateEvaporatorCoilTemplate = () => {
        const currentDate = new Date().toLocaleString();

        return (
            <div className="template-output new-template">
                <div className="template-header">
                    <div className="template-logo">
                        <img src={logo} alt="Company Logo" className="logo-image" />
                        <img src={logo1} alt="Company Logo" className="logo-image" />

                    </div>
                </div>
                <hr className="divider" />

                {/* Model Section */}
                <div className="spec-section">
                    <h3 className="section-title">Model: {evoResultData.model}</h3>
                </div>

                {/* Capacity Details */}
                <div className="spec-section">
                    <h4 className="section-subtitle">Capacity Details:</h4>
                    <table className="spec-table">
                        <tbody>
                            <tr>
                                <td>Capacity</td>
                                <td>{evoResultData.capacity}</td>
                            </tr>
                            <tr>
                                <td>Surface</td>
                                <td>{evoResultData.surface}</td>
                            </tr>
                            <tr>
                                <td>Air Flow</td>
                                <td>{evoResultData.airFlow}</td>
                            </tr>
                            <tr>
                                <td>Air Throw</td>
                                <td>{evoResultData.airThrow}</td>
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
                                <td>{evoResultData.refrigerantType}</td>
                            </tr>
                            <tr>
                                <td>Evaporator Temp.</td>
                                <td>{evoResultData.evaporatorTemp}</td>
                            </tr>
                            <tr>
                                <td>DT1</td>
                                <td>{evoResultData.dt1}</td>
                            </tr>
                            <tr>
                                <td>Condenser Temp.</td>
                                <td>{evoResultData.condenserTemp}</td>
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
                                <td>{evoResultData.fanDetail}</td>
                            </tr>
                            <tr>
                                <td>Fin Spacing</td>
                                <td>{evoResultData.finSpacing}</td>
                            </tr>
                            <tr>
                                <td>Fan Voltage</td>
                                <td>{evoResultData.fanVoltage}</td>
                            </tr>
                            <tr>
                                <td>Fan Current</td>
                                <td>{evoResultData.fanCurrent}</td>
                            </tr>
                            <tr>
                                <td>Defrost Type</td>
                                <td>{evoResultData.defrostType}</td>
                            </tr>
                            <tr>
                                <td>Defrost Power (W)</td>
                                <td>{evoResultData.defrostwatts}</td>
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
                                <td>{evoResultData.casing}</td>
                            </tr>
                            <tr>
                                <td>Tubes</td>
                                <td>{evoResultData.tubes}</td>
                            </tr>
                            <tr>
                                <td>Fins</td>
                                <td>{evoResultData.fins}</td>
                            </tr>
                            <tr>
                                <td>Width</td>
                                <td>{evoResultData.width}</td>
                            </tr>
                            <tr>
                                <td>Length</td>
                                <td>{evoResultData.length}</td>
                            </tr>
                            <tr>
                                <td>Height</td>
                                <td>{evoResultData.height}</td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>{evoResultData.weight}</td>
                            </tr>
                            <tr>
                                <td>Inlet Connection</td>
                                <td>{evoResultData.inletConnection}</td>
                            </tr>
                            <tr>
                                <td>Outlet Connection</td>
                                <td>{evoResultData.outletConnection}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Image Gallery Section */}
                <div className="images-section">
                    <div className="image-gallery">
                        {evoResultData.images.map((imageUrl, index) => (
                            <div className="image-container" key={index}>
                                <img src={imageUrl} alt={`Evaporator Coil Image ${index + 1}`} className="product-image" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Graph Section */}
                <div className="images-section">
                    <div className="image-gallery">
                        {conResultData.graph.map((imageUrl, index) => (
                            <div className="image-container" key={index}>
                                <img src={imageUrl} alt={`Graph  ${index + 1}`} className="product-image" />
                            </div>
                        ))}
                    </div>
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
                    <p>Mob.: +91 971 770 9933 / +91 981 055 0100 | sales@microcoils.in | www.microcoils.in</p>
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
                            <img src={logo1} alt="Company Logo" className="logo-image" />
                        </div>
                        <div className="template-header-info">
                            <h4>MICRO COILS AND REFRIGERATION PVT LTD.</h4>
                            <p>Plot No. E-41 (E-1), RIICO Industrial Area, Khushkhera, Distt. Khairthal-Tijara, Rajasthan -301707</p>
                            <p>Mob.: +91 971 770 9933 / +91 981 055 0100 | sales@microcoils.in | www.microcoils.in</p>
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
                                            <td>{evoResultData.capacity}</td>
                                        </tr>
                                        <tr>
                                            <th>Cooling Capacity</th>
                                            <td>{evoResultData.capacity} kW</td>
                                        </tr>
                                        <tr>
                                            <th>Recommended System</th>
                                            <td>{evoResultData.model}</td>
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
                                            <td>{evoResultData.surface}</td>
                                        </tr>
                                        <tr>
                                            <th>Temperature Difference</th>
                                            <td>{evoResultData.dt1} K</td>
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
                                    <td>{evoResultData.airFlow}</td>
                                </tr>
                                <tr>
                                    <th>Latent Heat</th>
                                    <td>{evoResultData.airThrow}</td>
                                </tr>
                                <tr>
                                    <th>Total Heat Sources</th>
                                    <td>{evoResultData.refrigerantType}</td>
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
                                    <td>{evoResultData.evaporatorTemp}</td>
                                </tr>
                                <tr>
                                    <th>Insulation Factor</th>
                                    <td>{evoResultData.condenserTemp}</td>
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
            margin: 2,
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