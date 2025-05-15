import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cropper from 'cropperjs';
import Swal from 'sweetalert2';

import {
    FaEnvelope,
    FaTh,
    FaHome,
    FaUser,
    FaImage,
    FaEdit,
    FaCog,
    FaSignOutAlt,
    FaTimes,
    FaTimesCircle,
    FaCheckCircle,
    FaArrowLeft
} from 'react-icons/fa';

import Sidebar from '../Sidebar/Sidebar';
import './../assets/style.css';
import './Profile.css';

import profileimg from './../assets/logo.png';

const Profile = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [user, setUser] = useState({
        name: 'Sivabharath',
        email: 'siva@example.com',
        profileImage: profileimg
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const imageRef = useRef(null);
    const cropperRef = useRef(null);
    const fileInputRef = useRef(null);
    const [cropperModalOpen, setCropperModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [previewSrc, setPreviewSrc] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', email: '' });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setEditForm({
                name: parsedUser.name,
                email: parsedUser.email
            });
        }
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLogout = () => {
        Swal.fire({
            title: t('logoutConfirmTitle'),
            text: t('logoutConfirmText'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0066cc',
            cancelButtonColor: '#d33',
            confirmButtonText: t('logoutConfirmBtn')
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                navigate('/');
                Swal.fire({
                    title: t('logoutSuccessTitle'),
                    text: t('logoutSuccessText'),
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    const showToast = (message, type = 'info') => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        Toast.fire({ icon: type, title: message });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.match('image.*')) {
            showToast(t('onlyImagesAllowed'), 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            setPreviewSrc(event.target.result);
            setCropperModalOpen(true);

            setTimeout(() => {
                if (imageRef.current && !cropperRef.current) {
                    cropperRef.current = new Cropper(imageRef.current, {
                        aspectRatio: 1,
                        viewMode: 1,
                        autoCropArea: 0.8,
                        responsive: true,
                        guides: true,
                        center: true,
                        highlight: true,
                        cropBoxResizable: true,
                        cropBoxMovable: true,
                        toggleDragModeOnDblclick: false
                    });
                }
            }, 200);
        };
        reader.readAsDataURL(file);
    };

    const handleCrop = () => {
        if (cropperRef.current) {
            const croppedCanvas = cropperRef.current.getCroppedCanvas();
            if (!croppedCanvas) {
                showToast(t('cropFailed'), 'error');
                return;
            }

            const croppedImage = croppedCanvas.toDataURL('image/jpeg');

            const updatedUser = { ...user, profileImage: croppedImage };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

            cropperRef.current.destroy();
            cropperRef.current = null;
            setCropperModalOpen(false);
            setPreviewSrc(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            showToast(t('profilePicUpdated'), 'success');
        }
    };

    const closeCropper = () => {
        if (cropperRef.current) {
            cropperRef.current.destroy();
            cropperRef.current = null;
        }
        setCropperModalOpen(false);
        setPreviewSrc(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleEditClick = () => setEditModalOpen(true);

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedUser = {
            ...user,
            name: editForm.name,
            email: editForm.email
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setEditModalOpen(false);
        showToast(t('profileUpdated'), 'success');
    };

    const handleBackClick = () => navigate(-1);

    return (
        <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <button className="back-btn" onClick={handleBackClick}>
                <FaArrowLeft />
            </button>

            <div className="profile-content">
                <div className="app-header">
                    <h2>{t('yourProfile')}</h2>
                    <p>{t('manageProfile')}</p>
                </div>

                <div className="profile-card">
                    <div className="profile-img-container">
                        <img src={user.profileImage} alt="Profile" className="profile-img" />
                        <label htmlFor="fileInput" className="change-pic-btn">
                            <FaImage /> {t('changePicture')}
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </div>

                    <div className="profile-info">
                        <h3><FaUser className="icon-badge" /> {user.name}</h3>
                        <p className="profile-email"><FaEnvelope className="icon-badge" /> {user.email}</p>
                    </div>

                    <div className="profile-actions">
                        <button className="btn-primary" onClick={handleEditClick}>
                            <FaEdit /> {t('editProfile')}
                        </button>
                        <button className="btn-secondary" onClick={() => navigate('/settings')}>
                            <FaCog /> {t('settings')}
                        </button>
                        <button className="btn-danger" onClick={handleLogout}>
                            <FaSignOutAlt /> {t('logout')}
                        </button>
                    </div>
                </div>
            </div>

            <div className="bottom-nav">
                <button className="btn" onClick={toggleSidebar}>
                    <FaTh />
                    <span className="btn-label">{t('menu')}</span>
                </button>
                <Link className="btn" to="/home">
                    <FaHome />
                    <span className="btn-label">{t('home')}</span>
                </Link>
                <Link className="btn active" to="/profile">
                    <FaUser />
                    <span className="btn-label">{t('profile')}</span>
                </Link>
            </div>

            {/* Crop Modal */}
            {cropperModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>{t('cropImage')}</h3>
                            <button className="close-btn" onClick={closeCropper}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="img-container">
                                {previewSrc && <img ref={imageRef} src={previewSrc} alt="Crop preview" />}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-outline-danger btn-lg w-100" onClick={closeCropper}>
                                <FaTimesCircle /> {t('cancel')}
                            </button>
                            <button className="btn btn-success btn-lg w-100" onClick={handleCrop}>
                                <FaCheckCircle /> {t('crop')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content animate-fadeIn">
                        <div className="modal-header">
                            <h2>{t('editProfile')}</h2>
                            <button className="close-btn" onClick={() => setEditModalOpen(false)}>
                                <FaTimes size={18} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleEditSubmit} className="edit-form">
                                <div className="input-group">
                                    <label><FaUser /> {t('fullName')}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editForm.name}
                                        onChange={handleEditFormChange}
                                        placeholder={t('enterFullName')}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="input-group">
                                    <label><FaEnvelope /> {t('emailAddress')}</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={editForm.email}
                                        onChange={handleEditFormChange}
                                        placeholder="example@email.com"
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-danger btn-lg w-100" onClick={() => setEditModalOpen(false)}>
                                        <FaTimesCircle /> {t('cancel')}
                                    </button>
                                    <button type="submit" className="btn btn-success btn-lg w-100">
                                        <FaCheckCircle /> {t('saveChanges')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
