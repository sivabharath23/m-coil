import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTh, FaHome, FaUser, FaDownload } from 'react-icons/fa';
import { IoMdOptions } from 'react-icons/io';
import Sidebar from '../Sidebar/Sidebar';
import './../assets/style.css';
import './Cooler.css';
import logo from './../assets/logo.png';
import { useTranslation } from 'react-i18next';
import html2pdf from 'html2pdf.js';


const Result = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [template, setTemplate] = useState('standard');
    const result = location.state?.result;

    useEffect(() => {
        const savedTemplate = localStorage.getItem('coolingTemplate') || 'standard';
        setTemplate(savedTemplate);
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const handleBackClick = () => navigate(-1);

    const generateTemplateOutput = () => {
        const currentDate = new Date().toLocaleString();

        return (
            <div className="template-output">
                <div className="template-header">
                    <div className="template-logo">
                        <img src={logo} alt="Company Logo" className="logo-image" />
                    </div>
                    <div className="template-header-info">
                        <h4>MICRO COILS AND REFRIGERATION PVT LTD.</h4>
                        <p>4-1 ETS. MICRO INDUSTRIAL AREA, REVARANDRIA, DIRECT JOURNAL (BALT) 2022/07</p>
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
                                        <td>{result.coolingLoadKW} kW</td>
                                    </tr>
                                    <tr>
                                        <th>Cooling Capacity</th>
                                        <td>{result.coolingCapacityBTU} BTU/h</td>
                                    </tr>
                                    <tr>
                                        <th>Recommended System</th>
                                        <td>{result.recommendedType}</td>
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
                                        <td>{result.calculationDetails.roomVolume}</td>
                                    </tr>
                                    <tr>
                                        <th>Temperature Difference</th>
                                        <td>{result.calculationDetails.temperatureDifference}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Additional sections for detailed/technical templates */}
                {(template === 'detailed' || template === 'technical') && (
                    <>
                        <div className="template-section">
                            <h4><span role="img" aria-label="heat">📈</span> Heat Calculations</h4>
                            <table className="template-table">
                                <tbody>
                                    <tr>
                                        <th>Sensible Heat</th>
                                        <td>{result.calculationDetails.sensibleHeat}</td>
                                    </tr>
                                    <tr>
                                        <th>Latent Heat</th>
                                        <td>{result.calculationDetails.latentHeat}</td>
                                    </tr>
                                    <tr>
                                        <th>Total Heat Sources</th>
                                        <td>{result.calculationDetails.totalHeatSources}</td>
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
                                        <td>{result.calculationDetails.sunlightFactor}x</td>
                                    </tr>
                                    <tr>
                                        <th>Insulation Factor</th>
                                        <td>{result.calculationDetails.insulationFactor}x</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
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

        setTimeout(() => {
            Swal.fire({
                title: t('downloadReady'),
                text: t('downloadReadyText', { template }),
                icon: 'success',
                confirmButtonText: t('download')
            }).then(() => {
                const element = document.querySelector('.template-output');
                html2pdf().from(element).save('cooling-results.pdf');
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
                <h2 className='title'>{t('coolingResults')}</h2>
                <button className="icon-btn" onClick={toggleSidebar}>
                    <IoMdOptions />
                </button>
            </div>

            <div className={`container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="result-container">
                    <div className="result-header">
                        <h3 className="section-title">{t('coolingRequirements')}</h3>
                        <div className="template-controls">
                            {/* If enabling templates later, localize option labels as well */}
                            {/* <select
                value={template}
                onChange={(e) => {
                  setTemplate(e.target.value);
                  localStorage.setItem('coolingTemplate', e.target.value);
                }}
                className="template-select"
              >
                <option value="standard">{t('standardTemplate')}</option>
                <option value="detailed">{t('detailedTemplate')}</option>
                <option value="technical">{t('technicalTemplate')}</option>
              </select> */}
                            <button className="download-btn" onClick={handleDownloadPDF}>
                                <FaDownload /> {t('downloadPDF')}
                            </button>
                        </div>
                    </div>

                    {/* Template Output Displayed Here */}
                    {generateTemplateOutput()}

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