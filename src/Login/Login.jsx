import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import logo from './../assets/logo.png';
import './../assets/style.css';
import './Login.css';

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
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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
  };

  const images = [
    {
      url: "https://images.unsplash.com/photo-1605152276897-4f618f831968",
      text: `<a href="#" target="_blank">Precision cooling solutions for industrial spaces</a>`,
    },
    {
      url: "https://images.pexels.com/photos/8972610/pexels-photo-8972610.jpeg",
      text: `<a href="#" target="_blank">Optimize your cooling system with M-Coil technology</a>`,
    },
    {
      url: "https://cdn.pixabay.com/photo/2017/06/20/22/14/man-2425121_1280.jpg",
      text: `<a href="#" target="_blank">Expert coolant recommendations based on your space</a>`
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm();

  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    watch,
    formState: { errors: signupErrors },
  } = useForm();

  const { visibleErrors: visibleLoginErrors, fadingErrors: fadingLoginErrors } = useAutoHideErrors(loginErrors);
  const { visibleErrors: visibleSignupErrors, fadingErrors: fadingSignupErrors } = useAutoHideErrors(signupErrors);

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
      showToast('success', 'Login successful!');
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (error) {
      showToast('error', 'Invalid credentials!');

      console.error("Login error:", error);
    }
  };

  const HandleRegister = async (data) => {
    try {
      console.log("Registration data:", data);
      showToast('success', 'Registration successful!');
      setTimeout(() => {
        setShowSignup(false);
      }, 1500);
    } catch (error) {
      showToast('error', 'Registration failed!');
      console.error("Registration error:", error);
    }
  };

  if (showWelcomeScreen) {
    return (
      <div className="welcome-container">
        <div className="welcome-card">
          <div className="welcome-content">
            <div className="welcome-text-section">
              <div className="welcome-text-container">
                <img src={logo} alt="M-Coil Logo" className="welcome-logo" />
                <h1 className="welcome-title">Welcome to</h1>
                <h2 className="welcome-subtitle">M-Coil</h2>
                <p className="welcome-description">
                  The intelligent coolant recommendation system for industrial and commercial spaces.
                  Get personalized cooling solutions based on your room measurements.
                </p>

                <div className="welcome-button-group">
                  <button
                    onClick={() => {
                      setShowWelcomeScreen(false);
                      setShowSignup(false);
                    }}
                    className="welcome-primary-btn"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      setShowWelcomeScreen(false);
                      setShowSignup(true);
                    }}
                    className="welcome-secondary-btn"
                  >
                    Register
                  </button>
                </div>

                <div className="welcome-terms">
                  <p className="terms-text">
                    By continuing, you agree to our{" "}
                    <a href="#" className="terms-link">Terms of Service</a>{" "}
                    and <a href="#" className="terms-link">Privacy Policy</a>
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
                    Log In
                  </button>
                  <button
                    className="welcome-image-btn"
                    onClick={() => {
                      setShowWelcomeScreen(false);
                      setShowSignup(true);
                    }}
                  >
                    Register
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

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Mobile Header */}
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
              Login
            </button>
            <button
              className={`mobile-auth-btn ${showSignup ? "active" : ""}`}
              onClick={() => setShowSignup(true)}
            >
              Register
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="main-content">
          {/* Form Side */}
          <div className="form-side">
            {/* Logo */}
            <div className="logo-container">
              <img src={logo} alt="M-Coil Logo" className="auth-logo" />
            </div>

            {/* Desktop Back Button */}
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
                Back
              </button>
            </div>

            {/* Login Form */}
            {(!isMobile || !showSignup) && (
              <div className={`login-form-container ${showSignup ? "hidden" : ""}`}>
                <div className="form-content">
                  <h1 className="form-title text-center">Welcome Back!</h1>
                  <p className="form-subtitle text-center">Personalized coolant insights</p>

                  <button
                    className="social-login-btn"
                    onClick={() => showToast('info', 'Google login coming soon!')}
                  >
                    <img
                      src="https://www.svgrepo.com/show/355037/google.svg"
                      alt="Google Icon"
                      className="social-icon"
                    />
                    Log in with Google
                  </button>

                  <div className="divider">
                    <div className="divider-line"></div>
                    <span className="divider-text">or</span>
                    <div className="divider-line"></div>
                  </div>

                  <form onSubmit={handleLoginSubmit(HandleLogin)} className="auth-form">
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Your username or email"
                        className="form-input"
                        {...loginRegister("identifier", { required: "Username or email is required" })}
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
                          placeholder="Password"
                          className="form-input"
                          {...loginRegister("password", {
                            required: "Password is required",
                            minLength: {
                              value: 6,
                              message: "Password must be at least 6 characters"
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
                          MySwal.fire({
                            title: 'Forgot Password?',
                            text: 'Enter your email to reset your password',
                            input: 'email',
                            inputPlaceholder: 'Your email address',
                            showCancelButton: true,
                            confirmButtonText: 'Reset Password',
                            showLoaderOnConfirm: true,
                            preConfirm: (email) => {
                              return new Promise((resolve) => {
                                setTimeout(() => {
                                  if (email) {
                                    showToast('success', 'Password reset link sent!');
                                  } else {
                                    Swal.showValidationMessage('Please enter your email');
                                  }
                                  resolve();
                                }, 1500);
                              });
                            },
                            allowOutsideClick: false
                          });
                        }}
                      >
                        Forgot password?
                      </a>
                    </div>

                    <button className="submit-btn" type="submit">
                      Log In
                    </button>
                  </form>

                  <p className="auth-switch-text">
                    Don't have an account?{" "}
                    <button
                      className="auth-switch-link"
                      onClick={() => setShowSignup(true)}
                    >
                      Register
                    </button>
                  </p>
                </div>
              </div>
            )}

            {/* Signup Form */}
            {(!isMobile || showSignup) && (
              <div className={`signup-form-container ${showSignup ? "visible" : "hidden"}`}>
                <div className="form-content">
                  <h1 className="form-title">Create M-Coil Account</h1>
                  <p className="form-subtitle text-center">Get your coolant recommendations</p>

                  <button
                    className="social-login-btn"
                    onClick={() => showToast('info', 'Google signup coming soon!')}
                  >
                    <img
                      src="https://www.svgrepo.com/show/355037/google.svg"
                      alt="Google Icon"
                      className="social-icon"
                    />
                    Sign up with Google
                  </button>

                  <div className="divider">
                    <div className="divider-line"></div>
                    <span className="divider-text">or</span>
                    <div className="divider-line"></div>
                  </div>

                  <form onSubmit={handleSignupSubmit(HandleRegister)} className="auth-form">
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Username"
                        className="form-input"
                        {...signupRegister("username", {
                          required: "Username is required",
                          minLength: {
                            value: 3,
                            message: "Username must be at least 3 characters"
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
                        placeholder="Email"
                        className="form-input"
                        {...signupRegister("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
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
                          placeholder="Password"
                          className="form-input"
                          {...signupRegister("password", {
                            required: "Password is required",
                            minLength: {
                              value: 8,
                              message: "Password must be at least 8 characters"
                            },
                            pattern: {
                              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                              message: "Password must contain at least one uppercase, one lowercase, one number and one special character"
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
                          placeholder="Re-enter Password"
                          className="form-input"
                          {...signupRegister("confirmPassword", {
                            required: "Please confirm your password",
                            validate: value =>
                              value === watch("password") || "Passwords do not match"
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
                          required: "You must accept the terms and conditions"
                        })}
                      />
                      <label htmlFor="terms-check">
                        I agree to the <a href="#" className="terms-link">Terms of Service</a> and <a href="#" className="terms-link">Privacy Policy</a>
                      </label>
                      {signupErrors.acceptTerms && visibleSignupErrors.acceptTerms && (
                        <p className={`form-error ${fadingSignupErrors.acceptTerms ? 'fade-out' : ''}`}>
                          {signupErrors.acceptTerms.message}
                        </p>
                      )}
                    </div>

                    <button className="submit-btn" type="submit">
                      Create Account
                    </button>
                  </form>

                  <p className="auth-switch-text">
                    Already have an account?{" "}
                    <button
                      className="auth-switch-link"
                      onClick={() => setShowSignup(false)}
                    >
                      Log in
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
                    Log In
                  </button>
                  <button
                    className="image-btn"
                    onClick={() => setShowSignup(true)}
                  >
                    Register
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