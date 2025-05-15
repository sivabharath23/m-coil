import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import logo from './../assets/logo.png';
import './../assets/style.css';
import './Login.css';
import { useTranslation } from 'react-i18next';

const MySwal = withReactContent(Swal);

// Custom hook for auto-hiding errors
const useAutoHideErrors = (errors, delay = 5000) => {
  const [visibleErrors, setVisibleErrors] = useState({});
  const [fadingErrors, setFadingErrors] = useState({});

  useEffect(() => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      const newVisibleErrors = { ...visibleErrors };
      errorKeys.forEach(key => {
        newVisibleErrors[key] = true;
      });
      setVisibleErrors(newVisibleErrors);

      // Start fading out before hiding
      const fadeTimer = setTimeout(() => {
        setFadingErrors({ ...errors });
      }, delay - 300);

      const hideTimer = setTimeout(() => {
        setVisibleErrors({});
        setFadingErrors({});
      }, delay);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [errors]);

  return { visibleErrors, fadingErrors };
};

export default function Login() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(0);
  const [resetEmail, setResetEmail] = useState('');

  const showToast = (icon, title) => {
    const Toast = MySwal.mixin({
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

    Toast.fire({
      icon,
      title
    });
  };

  const showLogin = () => {
    setShowSignup(false);
    setShowWelcomeScreen(false);
    setForgotPasswordStep(0);
  };

  const images = [
    {
      url: "https://images.unsplash.com/photo-1605152276897-4f618f831968",
      text: t('login.image1Text'),
    },
    {
      url: "https://images.pexels.com/photos/8972610/pexels-photo-8972610.jpeg",
      text: t('login.image2Text'),
    },
    {
      url: "https://cdn.pixabay.com/photo/2017/06/20/22/14/man-2425121_1280.jpg",
      text: t('login.image3Text')
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLoginForm
  } = useForm();

  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    watch: watchSignup,
    formState: { errors: signupErrors },
    reset: resetSignupForm
  } = useForm();

  const {
    register: forgotPasswordRegister,
    handleSubmit: handleForgotPasswordSubmit,
    watch: watchForgotPassword,
    formState: { errors: forgotPasswordErrors },
    reset: resetForgotPasswordForm
  } = useForm();

  const { visibleErrors: visibleLoginErrors, fadingErrors: fadingLoginErrors } = useAutoHideErrors(loginErrors);
  const { visibleErrors: visibleSignupErrors, fadingErrors: fadingSignupErrors } = useAutoHideErrors(signupErrors);
  const { visibleErrors: visibleForgotPasswordErrors, fadingErrors: fadingForgotPasswordErrors } = useAutoHideErrors(forgotPasswordErrors);

  // Check screen size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Image carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const HandleLogin = async (data) => {
    try {
      console.log("Login data:", data);
      showToast('success', t('login.successMessage'));
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (error) {
      showToast('error', t('login.errorMessage'));
      console.error("Login error:", error);
    }
  };

  const HandleRegister = async (data) => {
    try {
      console.log("Registration data:", data);
      showToast('success', t('register.successMessage'));
      setTimeout(() => {
        setShowSignup(false);
        resetSignupForm();
      }, 1500);
    } catch (error) {
      showToast('error', t('register.errorMessage'));
      console.error("Registration error:", error);
    }
  };

  const handleForgotPassword = async (data) => {
    if (forgotPasswordStep === 1) {
      // Step 1: Submit email
      try {
        console.log("Forgot password email:", data.email);
        setResetEmail(data.email);
        showToast('success', t('forgotPassword.codeSent'));
        setForgotPasswordStep(2);
        resetForgotPasswordForm();
      } catch (error) {
        showToast('error', t('forgotPassword.sendFailed'));
        console.error("Forgot password error:", error);
      }
    } else if (forgotPasswordStep === 2) {
      // Step 2: Verify code
      try {
        console.log("Verification code:", data.code);
        showToast('success', t('forgotPassword.codeVerified'));
        setForgotPasswordStep(3);
        resetForgotPasswordForm();
      } catch (error) {
        showToast('error', t('forgotPassword.invalidCode'));
        console.error("Code verification error:", error);
      }
    } else if (forgotPasswordStep === 3) {
      // Step 3: Reset password
      try {
        console.log("New password for", resetEmail, ":", data.newPassword);
        showToast('success', t('forgotPassword.resetSuccess'));
        setForgotPasswordStep(0);
        resetForgotPasswordForm();
        setShowSignup(false);
      } catch (error) {
        showToast('error', t('forgotPassword.resetFailed'));
        console.error("Password reset error:", error);
      }
    }
  };

  const handleResendCode = () => {
    showToast('info', t('forgotPassword.newCodeSent'));
  };

  if (showWelcomeScreen) {
    return (
      <div className="welcome-container">
        <div className="welcome-card">
          <div className="welcome-content">
            <div className="welcome-text-section">
              <div className="welcome-text-container">
                <img src={logo} alt="M-Coil Logo" className="welcome-logo" />
                <h1 className="welcome-title">{t('welcome.title')}</h1>
                <h2 className="welcome-subtitle">{t('welcome.subtitle')}</h2>
                <p className="welcome-description">
                  {t('welcome.description')}
                </p>

                <div className="welcome-button-group">
                  <button
                    onClick={() => {
                      setShowWelcomeScreen(false);
                      setShowSignup(false);
                      setForgotPasswordStep(0);
                    }}
                    className="welcome-primary-btn"
                  >
                    {t('welcome.login')}
                  </button>
                  <button
                    onClick={() => {
                      setShowWelcomeScreen(false);
                      setShowSignup(true);
                      setForgotPasswordStep(0);
                    }}
                    className="welcome-secondary-btn"
                  >
                    {t('welcome.register')}
                  </button>
                </div>

                <div className="welcome-terms">
                  <p className="terms-text">
                    {t('welcome.terms', {
                      terms: `<a href="#" className="terms-link">${t('welcome.termsLink')}</a>`,
                      privacy: `<a href="#" className="terms-link">${t('welcome.privacyLink')}</a>`
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="welcome-image-section"
              style={{ backgroundImage: `url(${images[currentImageIndex].url})` }}
            >
              <div className="welcome-image-content">
                <div className="welcome-image-buttons">
                  <button onClick={showLogin} className="welcome-image-btn">
                    {t('welcome.login')}
                  </button>
                  <button
                    className="welcome-image-btn"
                    onClick={() => {
                      setShowWelcomeScreen(false);
                      setShowSignup(true);
                    }}
                  >
                    {t('welcome.register')}
                  </button>
                </div>
                <div>
                  <h2
                    className="welcome-image-text"
                    dangerouslySetInnerHTML={{ __html: images[currentImageIndex].text }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Forgot Password Screen
  if (forgotPasswordStep > 0) {
    return (
      <div className="login-container">
        <div className="login-card">
          {/* Mobile Header */}
          {isMobile && (
            <div className="mobile-header">
              <button onClick={() => setForgotPasswordStep(0)} className="mobile-back-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="back-icon"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
                {t('common.back')}
              </button>
              <div className="mobile-auth-buttons">
                <button className="mobile-auth-btn active">
                  {t('forgotPassword.title')}
                </button>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="main-content">
            {/* Form Side */}
            <div className="form-side">
              {/* Logo */}
              <div className="logo-container">
                <img src={logo} alt="M-Coil Logo" className="auth-logo" />
              </div>

              {/* Desktop Back Button */}
              {!isMobile && (
                <div className="desktop-back-btn-container">
                  <button
                    onClick={() => setForgotPasswordStep(0)}
                    className="desktop-back-btn"
                    aria-label="Back to login"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="back-icon"
                    >
                      <path d="m12 19-7-7 7-7" />
                      <path d="M19 12H5" />
                    </svg>
                    {t('forgotPassword.backToLogin')}
                  </button>
                </div>
              )}

              <div className="forgot-password-form-container">
                <div className="form-content">
                  <h1 className="form-title">
                    {forgotPasswordStep === 1 && t('forgotPassword.title')}
                    {forgotPasswordStep === 2 && t('forgotPassword.verifyTitle')}
                    {forgotPasswordStep === 3 && t('forgotPassword.resetTitle')}
                  </h1>

                  <p className="form-subtitle text-center">
                    {forgotPasswordStep === 1 && t('forgotPassword.enterEmail')}
                    {forgotPasswordStep === 2 && t('forgotPassword.codeSent', { email: resetEmail })}
                    {forgotPasswordStep === 3 && t('forgotPassword.createNewPassword')}
                  </p>

                  <form onSubmit={handleForgotPasswordSubmit(handleForgotPassword)} className="auth-form">
                    {forgotPasswordStep === 1 && (
                      <div className="form-group">
                        <input
                          type="email"
                          placeholder={t('forgotPassword.emailPlaceholder')}
                          className="form-input"
                          {...forgotPasswordRegister("email", {
                            required: t('validation.emailRequired'),
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: t('validation.invalidEmail')
                            }
                          })}
                        />
                        {forgotPasswordErrors.email && visibleForgotPasswordErrors.email && (
                          <p className={`form-error ${fadingForgotPasswordErrors.email ? 'fade-out' : ''}`}>
                            {forgotPasswordErrors.email.message}
                          </p>
                        )}
                      </div>
                    )}

                    {forgotPasswordStep === 2 && (
                      <>
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder={t('forgotPassword.codePlaceholder')}
                            className="form-input"
                            {...forgotPasswordRegister("code", {
                              required: t('validation.codeRequired'),
                              pattern: {
                                value: /^\d{6}$/,
                                message: t('validation.codeFormat')
                              }
                            })}
                          />
                          {forgotPasswordErrors.code && visibleForgotPasswordErrors.code && (
                            <p className={`form-error ${fadingForgotPasswordErrors.code ? 'fade-out' : ''}`}>
                              {forgotPasswordErrors.code.message}
                            </p>
                          )}
                        </div>
                        <div className="forgot-password-resend">
                          <button
                            type="button"
                            onClick={handleResendCode}
                            className="forgot-password-resend-link"
                          >
                            {t('forgotPassword.resendCode')}
                          </button>
                        </div>
                      </>
                    )}

                    {forgotPasswordStep === 3 && (
                      <>
                        <div className="form-group">
                          <div className="password-input-container">
                            <input
                              type={showLoginPassword ? "text" : "password"}
                              placeholder={t('forgotPassword.newPasswordPlaceholder')}
                              className="form-input"
                              {...forgotPasswordRegister("newPassword", {
                                required: t('validation.passwordRequired'),
                                minLength: {
                                  value: 8,
                                  message: t('validation.passwordMinLength')
                                },
                                pattern: {
                                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                  message: t('validation.passwordComplexity')
                                }
                              })}
                            />
                            <button
                              type="button"
                              onClick={() => setShowLoginPassword(!showLoginPassword)}
                              className="password-toggle"
                            >
                              {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                          {forgotPasswordErrors.newPassword && visibleForgotPasswordErrors.newPassword && (
                            <p className={`form-error ${fadingForgotPasswordErrors.newPassword ? 'fade-out' : ''}`}>
                              {forgotPasswordErrors.newPassword.message}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <div className="password-input-container">
                            <input
                              type={showLoginPassword ? "text" : "password"}
                              placeholder={t('forgotPassword.confirmPasswordPlaceholder')}
                              className="form-input"
                              {...forgotPasswordRegister("confirmPassword", {
                                required: t('validation.confirmPasswordRequired'),
                                validate: value =>
                                  value === watchForgotPassword("newPassword") || t('validation.passwordsDontMatch')
                              })}
                            />
                            <button
                              type="button"
                              onClick={() => setShowLoginPassword(!showLoginPassword)}
                              className="password-toggle"
                            >
                              {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                          {forgotPasswordErrors.confirmPassword && visibleForgotPasswordErrors.confirmPassword && (
                            <p className={`form-error ${fadingForgotPasswordErrors.confirmPassword ? 'fade-out' : ''}`}>
                              {forgotPasswordErrors.confirmPassword.message}
                            </p>
                          )}
                        </div>
                      </>
                    )}

                    <button className="submit-btn" type="submit">
                      {forgotPasswordStep === 1 && t('forgotPassword.sendCode')}
                      {forgotPasswordStep === 2 && t('forgotPassword.verifyCode')}
                      {forgotPasswordStep === 3 && t('forgotPassword.resetPassword')}
                    </button>
                  </form>

                  <p className="auth-switch-text">
                    {t('forgotPassword.rememberPassword')}{" "}
                    <button
                      className="auth-switch-link"
                      onClick={() => setForgotPasswordStep(0)}
                    >
                      {t('common.login')}
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* Image Side */}
            {!isMobile && (
              <div
                className="image-side"
                style={{ backgroundImage: `url(${images[currentImageIndex].url})` }}
              >
                <div className="image-content">
                  <div className="image-buttons">
                    <button onClick={showLogin} className="image-btn">
                      {t('common.login')}
                    </button>
                    <button
                      className="image-btn"
                      onClick={() => setShowSignup(true)}
                    >
                      {t('common.register')}
                    </button>
                  </div>
                  <div>
                    <h2
                      className="image-text"
                      dangerouslySetInnerHTML={{ __html: images[currentImageIndex].text }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Mobile Header */}
        {isMobile && (
          <div className="mobile-header">
            <button onClick={() => setShowWelcomeScreen(true)} className="mobile-back-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="back-icon"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              M-Coil
            </button>
            <div className="mobile-auth-buttons">
              <button
                className={`mobile-auth-btn ${!showSignup ? "active" : ""}`}
                onClick={() => setShowSignup(false)}
              >
                {t('common.login')}
              </button>
              <button
                className={`mobile-auth-btn ${showSignup ? "active" : ""}`}
                onClick={() => setShowSignup(true)}
              >
                {t('common.register')}
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="main-content">
          {/* Form Side */}
          <div className="form-side">
            {/* Logo */}
            <div className="logo-container">
              <img src={logo} alt="M-Coil Logo" className="auth-logo" />
            </div>

            {/* Desktop Back Button */}
            {!isMobile && (
              <div className="desktop-back-btn-container">
                <button
                  onClick={() => setShowWelcomeScreen(true)}
                  className="desktop-back-btn"
                  aria-label="Back to welcome screen"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="back-icon"
                  >
                    <path d="m12 19-7-7 7-7" />
                    <path d="M19 12H5" />
                  </svg>
                  {t('common.back')}
                </button>
              </div>
            )}

            {/* Login Form */}
            {(!isMobile || !showSignup) && (
              <div className={`login-form-container ${showSignup ? "hidden" : ""}`}>
                <div className="form-content">
                  <h1 className="form-title text-center">{t('login.title')}</h1>
                  <p className="form-subtitle text-center">{t('login.subtitle')}</p>

                  <button
                    className="social-login-btn"
                    onClick={() => showToast('info', t('login.googleComingSoon'))}
                  >
                    <img
                      src="https://www.svgrepo.com/show/355037/google.svg"
                      alt="Google Icon"
                      className="social-icon"
                    />
                    {t('login.googleLogin')}
                  </button>

                  <div className="divider">
                    <div className="divider-line"></div>
                    <span className="divider-text">{t('common.or')}</span>
                    <div className="divider-line"></div>
                  </div>

                  <form onSubmit={handleLoginSubmit(HandleLogin)} className="auth-form">
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder={t('login.usernamePlaceholder')}
                        className="form-input"
                        {...loginRegister("identifier", { required: t('validation.usernameRequired') })}
                      />
                      {loginErrors.identifier && visibleLoginErrors.identifier && (
                        <p className={`form-error ${fadingLoginErrors.identifier ? 'fade-out' : ''}`}>
                          {loginErrors.identifier.message}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <div className="password-input-container">
                        <input
                          type={showLoginPassword ? "text" : "password"}
                          placeholder={t('login.passwordPlaceholder')}
                          className="form-input"
                          {...loginRegister("password", {
                            required: t('validation.passwordRequired'),
                            minLength: {
                              value: 6,
                              message: t('validation.passwordMinLength')
                            }
                          })}
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="password-toggle"
                        >
                          {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {loginErrors.password && visibleLoginErrors.password && (
                        <p className={`form-error ${fadingLoginErrors.password ? 'fade-out' : ''}`}>
                          {loginErrors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="forgot-password">
                      <a
                        href="#"
                        className="forgot-password-link"
                        onClick={(e) => {
                          e.preventDefault();
                          setForgotPasswordStep(1);
                        }}
                      >
                        {t('login.forgotPassword')}
                      </a>
                    </div>

                    <button className="submit-btn" type="submit">
                      {t('common.login')}
                    </button>
                  </form>

                  <p className="auth-switch-text">
                    {t('login.noAccount')}{" "}
                    <button
                      className="auth-switch-link"
                      onClick={() => setShowSignup(true)}
                    >
                      {t('common.register')}
                    </button>
                  </p>
                </div>
              </div>
            )}

            {/* Signup Form */}
            {(!isMobile || showSignup) && (
              <div className={`signup-form-container ${showSignup ? "visible" : "hidden"}`}>
                <div className="form-content">
                  <h1 className="form-title">{t('register.title')}</h1>
                  <p className="form-subtitle text-center">{t('register.subtitle')}</p>

                  <button
                    className="social-login-btn"
                    onClick={() => showToast('info', t('register.googleComingSoon'))}
                  >
                    <img
                      src="https://www.svgrepo.com/show/355037/google.svg"
                      alt="Google Icon"
                      className="social-icon"
                    />
                    {t('register.googleSignup')}
                  </button>

                  <div className="divider">
                    <div className="divider-line"></div>
                    <span className="divider-text">{t('common.or')}</span>
                    <div className="divider-line"></div>
                  </div>

                  <form onSubmit={handleSignupSubmit(HandleRegister)} className="auth-form">
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder={t('register.usernamePlaceholder')}
                        className="form-input"
                        {...signupRegister("username", {
                          required: t('validation.usernameRequired'),
                          minLength: {
                            value: 3,
                            message: t('validation.usernameMinLength')
                          }
                        })}
                      />
                      {signupErrors.username && visibleSignupErrors.username && (
                        <p className={`form-error ${fadingSignupErrors.username ? 'fade-out' : ''}`}>
                          {signupErrors.username.message}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <input
                        type="email"
                        placeholder={t('register.emailPlaceholder')}
                        className="form-input"
                        {...signupRegister("email", {
                          required: t('validation.emailRequired'),
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: t('validation.invalidEmail')
                          }
                        })}
                      />
                      {signupErrors.email && visibleSignupErrors.email && (
                        <p className={`form-error ${fadingSignupErrors.email ? 'fade-out' : ''}`}>
                          {signupErrors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <div className="password-input-container">
                        <input
                          type={showSignupPassword ? "text" : "password"}
                          placeholder={t('register.passwordPlaceholder')}
                          className="form-input"
                          {...signupRegister("password", {
                            required: t('validation.passwordRequired'),
                            minLength: {
                              value: 8,
                              message: t('validation.passwordMinLength')
                            },
                            pattern: {
                              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                              message: t('validation.passwordComplexity')
                            }
                          })}
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                          className="password-toggle"
                        >
                          {showSignupPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {signupErrors.password && visibleSignupErrors.password && (
                        <p className={`form-error ${fadingSignupErrors.password ? 'fade-out' : ''}`}>
                          {signupErrors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <div className="password-input-container">
                        <input
                          type={showSignupPassword ? "text" : "password"}
                          placeholder={t('register.confirmPasswordPlaceholder')}
                          className="form-input"
                          {...signupRegister("confirmPassword", {
                            required: t('validation.confirmPasswordRequired'),
                            validate: value =>
                              value === watchSignup("password") || t('validation.passwordsDontMatch')
                          })}
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                          className="password-toggle"
                        >
                          {showSignupPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {signupErrors.confirmPassword && visibleSignupErrors.confirmPassword && (
                        <p className={`form-error ${fadingSignupErrors.confirmPassword ? 'fade-out' : ''}`}>
                          {signupErrors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <div className="form-checkbox">
                      <input
                        type="checkbox"
                        id="terms-check"
                        {...signupRegister("acceptTerms", {
                          required: t('validation.acceptTerms')
                        })}
                      />
                      <label htmlFor="terms-check">
                        {t('register.agreeTerms', {
                          terms: `<a href="#" className="terms-link">${t('register.termsLink')}</a>`,
                          privacy: `<a href="#" className="terms-link">${t('register.privacyLink')}</a>`
                        })}
                      </label>
                      {signupErrors.acceptTerms && visibleSignupErrors.acceptTerms && (
                        <p className={`form-error ${fadingSignupErrors.acceptTerms ? 'fade-out' : ''}`}>
                          {signupErrors.acceptTerms.message}
                        </p>
                      )}
                    </div>

                    <button className="submit-btn" type="submit">
                      {t('register.createAccount')}
                    </button>
                  </form>

                  <p className="auth-switch-text">
                    {t('register.haveAccount')}{" "}
                    <button
                      className="auth-switch-link"
                      onClick={() => setShowSignup(false)}
                    >
                      {t('common.login')}
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Image Side */}
          {!isMobile && (
            <div
              className="image-side"
              style={{ backgroundImage: `url(${images[currentImageIndex].url})` }}
            >
              <div className="image-content">
                <div className="image-buttons">
                  <button onClick={showLogin} className="image-btn">
                    {t('common.login')}
                  </button>
                  <button
                    className="image-btn"
                    onClick={() => setShowSignup(true)}
                  >
                    {t('common.register')}
                  </button>
                </div>
                <div>
                  <h2
                    className="image-text"
                    dangerouslySetInnerHTML={{ __html: images[currentImageIndex].text }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}