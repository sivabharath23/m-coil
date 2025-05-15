// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    // Previous translations (Settings, Units, etc.)
                    settings: "Settings",
                    customizePreferences: "Customize your preferences",
                    language: "Language",
                    currency: "Currency",
                    uom: "Unit of Measurement",
                    confirmChange: "Confirm Change",
                    areYouSure: "Are you sure you want to change the setting to:",
                    cancel: "Cancel",
                    confirm: "Confirm",
                    menu: "Menu",
                    home: "Home",
                    profile: "Profile",
                    indexappheadertext: "Ideal air cooler for your room's unique needs.",

                    // Sidebar Translations
                    sidebarHome: "Home",
                    sidebarProfile: "Profile",
                    sidebarSettings: "Settings",
                    sidebarLogout: "Logout",

                    // Languages
                    en: "English",
                    es: "Spanish",
                    fr: "French",
                    de: "German",

                    // Units
                    kg: "Kilograms",
                    lb: "Pounds",
                    g: "Grams",
                    m: "Meters",

                    // Profile page translations
                    yourProfile: "Your Profile",
                    manageProfile: "Manage your personal information and settings",
                    changePicture: "Change Picture",
                    editProfile: "Edit Profile",
                    logout: "Logout",
                    cropImage: "Crop Image",
                    fullName: "Full Name",
                    emailAddress: "Email Address",
                    enterFullName: "Enter your full name",
                    saveChanges: "Save Changes",
                    profilePicUpdated: "Profile picture updated successfully!",
                    profileUpdated: "Profile updated successfully!",
                    logoutConfirmTitle: "Are you sure?",
                    logoutConfirmText: "You will be logged out of your account",
                    logoutConfirmBtn: "Yes, logout!",
                    logoutSuccessTitle: "Logged out!",
                    logoutSuccessText: "You have been successfully logged out.",
                    onlyImagesAllowed: "Please select an image file",
                    cropFailed: "Cropping failed. Please try again.",

                    // Bottom Navigation labels (for Home page)
                    menu: "Menu",
                    home: "Home",
                    profile: "Profile",

                    // New translation keys for calculation
                    calculating: "Calculating...",
                    pleaseWait: "Please wait while we calculate your cooling needs.",
                    calculationComplete: "Calculation Complete",
                    yourCoolingNeedsCalculated: "Your cooling requirements have been calculated.",
                    viewResult: "View Result",
                    noTitle: "No Title",
                    searchCoolers: "Search Coolers",
                    calculate: "Calculate",
                    searchCoolers: "Search Coolers",
                    calculateCoolingNeeds: "Calculate Cooling Needs",

                    coolingResults: "Cooling Results",
                    coolingRequirements: "Cooling Requirements",
                    downloadPDF: "Download PDF",
                    backToCalculator: "Back to Calculator",
                    standardTemplate: "Standard Template",
                    detailedTemplate: "Detailed Template",
                    technicalTemplate: "Technical Template",

                    generatingPDF: "Generating PDF...",
                    preparingDownload: "Please wait while we prepare your download.",
                    downloadReady: "Download Ready!",
                    downloadReadyText: "Your PDF with {{template}} template is ready to download.",
                    download: "Download",

                    // Login page translations
                    login: {
                        title: "Welcome Back!",
                        subtitle: "Personalized coolant insights",
                        googleLogin: "Log in with Google",
                        googleComingSoon: "Google login coming soon!",
                        usernamePlaceholder: "Your username or email",
                        passwordPlaceholder: "Password",
                        forgotPassword: "Forgot password?",
                        noAccount: "Don't have an account?",
                        successMessage: "Login successful!",
                        errorMessage: "Invalid credentials!",
                        image1Text: '<a href="#" target="_blank">Precision cooling solutions for industrial spaces</a>',
                        image2Text: '<a href="#" target="_blank">Optimize your cooling system with M-Coil technology</a>',
                        image3Text: '<a href="#" target="_blank">Expert coolant recommendations based on your space</a>'
                    },

                    // Registration page translations
                    register: {
                        title: "Create M-Coil Account",
                        subtitle: "Get your coolant recommendations",
                        googleSignup: "Sign up with Google",
                        googleComingSoon: "Google signup coming soon!",
                        usernamePlaceholder: "Username",
                        emailPlaceholder: "Email",
                        passwordPlaceholder: "Password",
                        confirmPasswordPlaceholder: "Re-enter Password",
                        createAccount: "Create Account",
                        haveAccount: "Already have an account?",
                        agreeTerms: "I agree to the {terms} and {privacy}",
                        termsLink: "Terms of Service",
                        privacyLink: "Privacy Policy",
                        successMessage: "Registration successful!",
                        errorMessage: "Registration failed!"
                    },

                    // Forgot password translations
                    forgotPassword: {
                        title: "Forgot Password",
                        verifyTitle: "Verify Your Email",
                        resetTitle: "Reset Your Password",
                        enterEmail: "Enter your email to receive a reset code",
                        codeSent: "We sent a code to {email}",
                        createNewPassword: "Create a new password for your account",
                        codePlaceholder: "Enter 6-digit code",
                        newPasswordPlaceholder: "New Password",
                        confirmPasswordPlaceholder: "Confirm New Password",
                        sendCode: "Send Reset Code",
                        verifyCode: "Verify Code",
                        resetPassword: "Reset Password",
                        resendCode: "Resend Code",
                        newCodeSent: "New code sent to your email!",
                        rememberPassword: "Remember your password?",
                        backToLogin: "Back to Login",
                        codeVerified: "Code verified!",
                        resetSuccess: "Password reset successfully!",
                        sendFailed: "Failed to send reset code",
                        invalidCode: "Invalid verification code",
                        resetFailed: "Failed to reset password"
                    },

                    // Common translations
                    common: {
                        back: "Back",
                        login: "Login",
                        register: "Register",
                        or: "or"
                    },

                    // Validation messages
                    validation: {
                        usernameRequired: "Username or email is required",
                        emailRequired: "Email is required",
                        invalidEmail: "Invalid email address",
                        passwordRequired: "Password is required",
                        passwordMinLength: "Password must be at least {{value}} characters",
                        passwordComplexity: "Password must contain at least one uppercase, one lowercase, one number and one special character",
                        confirmPasswordRequired: "Please confirm your password",
                        passwordsDontMatch: "Passwords do not match",
                        codeRequired: "Verification code is required",
                        codeFormat: "Code must be 6 digits",
                        acceptTerms: "You must accept the terms and conditions",
                        usernameMinLength: "Username must be at least {{value}} characters"
                    },

                    //Welcom
                    welcome: {
                        title: "Welcome to M-Coil",
                        subtitle: "Your personal productivity companion",
                        description: "Join thousands of users who are already boosting their productivity with our powerful tools and features.",
                        login: "Log In",
                        register: "Create Account",
                        terms: "By continuing, you agree to our {terms} and {privacy}.",
                        termsLink: "Terms of Service",
                        privacyLink: "Privacy Policy"
                    }


                },
            },
            es: {
                translation: {
                    // Previous translations (Settings, Units, etc.)
                    settings: "Configuración",
                    customizePreferences: "Personaliza tus preferencias",
                    language: "Idioma",
                    currency: "Moneda",
                    uom: "Unidad de Medida",
                    confirmChange: "Confirmar Cambio",
                    areYouSure: "¿Estás seguro de que deseas cambiar a:",
                    cancel: "Cancelar",
                    confirm: "Confirmar",
                    menu: "Menú",
                    home: "Inicio",
                    profile: "Perfil",
                    indexappheadertext: "Enfriador de aire ideal para las necesidades únicas de tu habitación.",

                    // Sidebar Translations
                    sidebarHome: "Inicio",
                    sidebarProfile: "Perfil",
                    sidebarSettings: "Configuración",
                    sidebarLogout: "Cerrar sesión",

                    // Languages
                    en: "Inglés",
                    es: "Español",
                    fr: "Francés",
                    de: "Alemán",

                    // Units
                    kg: "Kilogramos",
                    lb: "Libras",
                    g: "Gramos",
                    m: "Metros",

                    // Profile page translations
                    yourProfile: "Tu perfil",
                    manageProfile: "Gestiona tu información personal y configuración",
                    changePicture: "Cambiar foto",
                    editProfile: "Editar perfil",
                    logout: "Cerrar sesión",
                    cropImage: "Recortar imagen",
                    fullName: "Nombre completo",
                    emailAddress: "Dirección de correo electrónico",
                    enterFullName: "Ingresa tu nombre completo",
                    saveChanges: "Guardar cambios",
                    profilePicUpdated: "¡Foto de perfil actualizada con éxito!",
                    profileUpdated: "¡Perfil actualizado con éxito!",
                    logoutConfirmTitle: "¿Estás seguro?",
                    logoutConfirmText: "Se cerrará tu sesión de tu cuenta",
                    logoutConfirmBtn: "¡Sí, cerrar sesión!",
                    logoutSuccessTitle: "¡Cerrar sesión!",
                    logoutSuccessText: "Has cerrado sesión correctamente.",
                    onlyImagesAllowed: "Por favor selecciona un archivo de imagen",
                    cropFailed: "Recorte fallido. Inténtalo de nuevo.",

                    // Bottom Navigation labels (for Home page)
                    menu: "Menú",
                    home: "Inicio",
                    profile: "Perfil",

                    // New translation keys for calculation
                    calculating: "Calculando...",
                    pleaseWait: "Por favor, espera mientras calculamos tus necesidades de enfriamiento.",
                    calculationComplete: "Cálculo completo",
                    yourCoolingNeedsCalculated: "Se han calculado tus necesidades de enfriamiento.",
                    viewResult: "Ver resultado",
                    noTitle: "Sin título",
                    searchCoolers: "Buscar enfriadores",
                    calculate: "Calcular",
                    searchCoolers: "Buscar enfriadores",
                    calculateCoolingNeeds: "Calcular necesidades de refrigeración",

                    coolingResults: "Resultados de Refrigeración",
                    coolingRequirements: "Requisitos de Refrigeración",
                    downloadPDF: "Descargar PDF",
                    backToCalculator: "Volver al Calculador",
                    standardTemplate: "Plantilla Estándar",
                    detailedTemplate: "Plantilla Detallada",
                    technicalTemplate: "Plantilla Técnica",


                    generatingPDF: "Generando PDF...",
                    preparingDownload: "Por favor espera mientras preparamos tu descarga.",
                    downloadReady: "¡Descarga Lista!",
                    downloadReadyText: "Tu PDF con la plantilla {{template}} está listo para descargar.",
                    download: "Descargar",

                    // Página de inicio de sesión
                    login: {
                        title: "¡Bienvenido de nuevo!",
                        subtitle: "Información personalizada sobre refrigerantes",
                        googleLogin: "Iniciar sesión con Google",
                        googleComingSoon: "¡Inicio de sesión con Google próximamente!",
                        usernamePlaceholder: "Tu nombre de usuario o correo electrónico",
                        passwordPlaceholder: "Contraseña",
                        forgotPassword: "¿Olvidaste tu contraseña?",
                        noAccount: "¿No tienes una cuenta?",
                        successMessage: "¡Inicio de sesión exitoso!",
                        errorMessage: "¡Credenciales inválidas!",
                        image1Text: '<a href="#" target="_blank">Soluciones de refrigeración de precisión para espacios industriales</a>',
                        image2Text: '<a href="#" target="_blank">Optimiza tu sistema de refrigeración con la tecnología M-Coil</a>',
                        image3Text: '<a href="#" target="_blank">Recomendaciones expertas de refrigerantes según tu espacio</a>'
                    },

                    // Página de registro
                    register: {
                        title: "Crea una cuenta M-Coil",
                        subtitle: "Obtén tus recomendaciones de refrigerante",
                        googleSignup: "Registrarse con Google",
                        googleComingSoon: "¡Registro con Google próximamente!",
                        usernamePlaceholder: "Nombre de usuario",
                        emailPlaceholder: "Correo electrónico",
                        passwordPlaceholder: "Contraseña",
                        confirmPasswordPlaceholder: "Reingresa la contraseña",
                        createAccount: "Crear cuenta",
                        haveAccount: "¿Ya tienes una cuenta?",
                        agreeTerms: "Acepto los {terms} y la {privacy}",
                        termsLink: "Términos del servicio",
                        privacyLink: "Política de privacidad",
                        successMessage: "¡Registro exitoso!",
                        errorMessage: "¡Error en el registro!"
                    },

                    // Página de recuperación de contraseña
                    forgotPassword: {
                        title: "Olvidé mi contraseña",
                        verifyTitle: "Verifica tu correo electrónico",
                        resetTitle: "Restablece tu contraseña",
                        enterEmail: "Ingresa tu correo electrónico para recibir un código",
                        codeSent: "Hemos enviado un código a {email}",
                        createNewPassword: "Crea una nueva contraseña para tu cuenta",
                        codePlaceholder: "Ingresa el código de 6 dígitos",
                        newPasswordPlaceholder: "Nueva contraseña",
                        confirmPasswordPlaceholder: "Confirmar nueva contraseña",
                        sendCode: "Enviar código de restablecimiento",
                        verifyCode: "Verificar código",
                        resetPassword: "Restablecer contraseña",
                        resendCode: "Reenviar código",
                        newCodeSent: "¡Nuevo código enviado a tu correo electrónico!",
                        rememberPassword: "¿Recordaste tu contraseña?",
                        backToLogin: "Volver al inicio de sesión",
                        codeVerified: "¡Código verificado!",
                        resetSuccess: "¡Contraseña restablecida exitosamente!",
                        sendFailed: "No se pudo enviar el código",
                        invalidCode: "Código de verificación inválido",
                        resetFailed: "Error al restablecer la contraseña"
                    },

                    // Traducciones comunes
                    common: {
                        back: "Atrás",
                        login: "Iniciar sesión",
                        register: "Registrarse",
                        or: "o"
                    },

                    // Mensajes de validación
                    validation: {
                        usernameRequired: "Se requiere nombre de usuario o correo electrónico",
                        emailRequired: "Se requiere correo electrónico",
                        invalidEmail: "Dirección de correo electrónico inválida",
                        passwordRequired: "Se requiere contraseña",
                        passwordMinLength: "La contraseña debe tener al menos {{value}} caracteres",
                        passwordComplexity: "La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial",
                        confirmPasswordRequired: "Por favor, confirma tu contraseña",
                        passwordsDontMatch: "Las contraseñas no coinciden",
                        codeRequired: "Se requiere el código de verificación",
                        codeFormat: "El código debe tener 6 dígitos",
                        acceptTerms: "Debes aceptar los términos y condiciones",
                        usernameMinLength: "El nombre de usuario debe tener al menos {{value}} caracteres"
                    },

                    // Pantalla de bienvenida
                    welcome: {
                        title: "Bienvenido a M-Coil",
                        subtitle: "Tu compañero personal de productividad",
                        description: "Únete a miles de usuarios que ya están mejorando su productividad con nuestras poderosas herramientas y funciones.",
                        login: "Iniciar sesión",
                        register: "Crear cuenta",
                        terms: "Al continuar, aceptas nuestros {terms} y nuestra {privacy}.",
                        termsLink: "Términos del servicio",
                        privacyLink: "Política de privacidad"
                    }


                },
            },
            fr: {
                translation: {
                    // Previous translations (Settings, Units, etc.)
                    settings: "Paramètres",
                    customizePreferences: "Personnalisez vos préférences",
                    language: "Langue",
                    currency: "Devise",
                    uom: "Unité de mesure",
                    confirmChange: "Confirmer le changement",
                    areYouSure: "Êtes-vous sûr de vouloir changer en :",
                    cancel: "Annuler",
                    confirm: "Confirmer",
                    menu: "Menu",
                    home: "Accueil",
                    profile: "Profil",
                    indexappheadertext: "Refroidisseur d'air idéal pour les besoins uniques de votre pièce.",

                    // Sidebar Translations
                    sidebarHome: "Accueil",
                    sidebarProfile: "Profil",
                    sidebarSettings: "Paramètres",
                    sidebarLogout: "Déconnexion",

                    // Languages
                    en: "Anglais",
                    es: "Espagnol",
                    fr: "Français",
                    de: "Allemand",

                    // Units
                    kg: "Kilogrammes",
                    lb: "Livres",
                    g: "Grammes",
                    m: "Mètres",

                    // Profile page translations
                    yourProfile: "Votre profil",
                    manageProfile: "Gérez vos informations personnelles et vos paramètres",
                    changePicture: "Changer de photo",
                    editProfile: "Modifier le profil",
                    logout: "Déconnexion",
                    cropImage: "Recadrer l'image",
                    fullName: "Nom complet",
                    emailAddress: "Adresse email",
                    enterFullName: "Entrez votre nom complet",
                    saveChanges: "Sauvegarder les modifications",
                    profilePicUpdated: "Photo de profil mise à jour avec succès !",
                    profileUpdated: "Profil mis à jour avec succès !",
                    logoutConfirmTitle: "Êtes-vous sûr ?",
                    logoutConfirmText: "Vous allez être déconnecté de votre compte",
                    logoutConfirmBtn: "Oui, se déconnecter!",
                    logoutSuccessTitle: "Déconnecté !",
                    logoutSuccessText: "Vous avez été déconnecté avec succès.",
                    onlyImagesAllowed: "Veuillez sélectionner un fichier image",
                    cropFailed: "Échec du recadrage. Veuillez réessayer.",

                    // Bottom Navigation labels (for Home page)
                    menu: "Menu",
                    home: "Accueil",
                    profile: "Profil",

                    // New translation keys for calculation
                    calculating: "Calcul en cours...",
                    pleaseWait: "Veuillez patienter pendant que nous calculons vos besoins en refroidissement.",
                    calculationComplete: "Calcul terminé",
                    yourCoolingNeedsCalculated: "Vos besoins en refroidissement ont été calculés.",
                    viewResult: "Voir le résultat",
                    noTitle: "Pas de titre",
                    searchCoolers: "Rechercher des refroidisseurs",
                    calculate: "Calculer",
                    searchCoolers: "Rechercher des refroidisseurs",
                    calculateCoolingNeeds: "Calculer les besoins en refroidissement",

                    coolingResults: "Resultados de Refrigeración",
                    coolingRequirements: "Requisitos de Refrigeración",
                    downloadPDF: "Descargar PDF",
                    backToCalculator: "Volver al Calculador",
                    standardTemplate: "Plantilla Estándar",
                    detailedTemplate: "Plantilla Detallada",
                    technicalTemplate: "Plantilla Técnica",

                    generatingPDF: "Génération du PDF...",
                    preparingDownload: "Veuillez patienter pendant que nous préparons votre téléchargement.",
                    downloadReady: "Téléchargement prêt !",
                    downloadReadyText: "Votre PDF avec le modèle {{template}} est prêt à être téléchargé.",
                    download: "Télécharger",

                    // Page de connexion
                    login: {
                        title: "Bon retour !",
                        subtitle: "Informations personnalisées sur les fluides de refroidissement",
                        googleLogin: "Se connecter avec Google",
                        googleComingSoon: "Connexion Google bientôt disponible !",
                        usernamePlaceholder: "Votre nom d'utilisateur ou e-mail",
                        passwordPlaceholder: "Mot de passe",
                        forgotPassword: "Mot de passe oublié ?",
                        noAccount: "Vous n'avez pas de compte ?",
                        successMessage: "Connexion réussie !",
                        errorMessage: "Identifiants invalides !",
                        image1Text: '<a href="#" target="_blank">Solutions de refroidissement de précision pour les espaces industriels</a>',
                        image2Text: '<a href="#" target="_blank">Optimisez votre système de refroidissement avec la technologie M-Coil</a>',
                        image3Text: '<a href="#" target="_blank">Recommandations expertes en fluides de refroidissement selon votre espace</a>'
                    },

                    // Page d'inscription
                    register: {
                        title: "Créer un compte M-Coil",
                        subtitle: "Obtenez vos recommandations de fluide de refroidissement",
                        googleSignup: "S'inscrire avec Google",
                        googleComingSoon: "Inscription Google bientôt disponible !",
                        usernamePlaceholder: "Nom d'utilisateur",
                        emailPlaceholder: "E-mail",
                        passwordPlaceholder: "Mot de passe",
                        confirmPasswordPlaceholder: "Confirmer le mot de passe",
                        createAccount: "Créer un compte",
                        haveAccount: "Vous avez déjà un compte ?",
                        agreeTerms: "J'accepte les {terms} et la {privacy}",
                        termsLink: "Conditions d'utilisation",
                        privacyLink: "Politique de confidentialité",
                        successMessage: "Inscription réussie !",
                        errorMessage: "Échec de l'inscription !"
                    },

                    // Page de réinitialisation du mot de passe
                    forgotPassword: {
                        title: "Mot de passe oublié",
                        verifyTitle: "Vérifiez votre e-mail",
                        resetTitle: "Réinitialisez votre mot de passe",
                        enterEmail: "Entrez votre e-mail pour recevoir un code de réinitialisation",
                        codeSent: "Nous avons envoyé un code à {email}",
                        createNewPassword: "Créez un nouveau mot de passe pour votre compte",
                        codePlaceholder: "Entrez le code à 6 chiffres",
                        newPasswordPlaceholder: "Nouveau mot de passe",
                        confirmPasswordPlaceholder: "Confirmer le nouveau mot de passe",
                        sendCode: "Envoyer le code de réinitialisation",
                        verifyCode: "Vérifier le code",
                        resetPassword: "Réinitialiser le mot de passe",
                        resendCode: "Renvoyer le code",
                        newCodeSent: "Nouveau code envoyé à votre e-mail !",
                        rememberPassword: "Vous vous souvenez de votre mot de passe ?",
                        backToLogin: "Retour à la connexion",
                        codeVerified: "Code vérifié !",
                        resetSuccess: "Mot de passe réinitialisé avec succès !",
                        sendFailed: "Échec de l'envoi du code de réinitialisation",
                        invalidCode: "Code de vérification invalide",
                        resetFailed: "Échec de la réinitialisation du mot de passe"
                    },

                    // Traductions communes
                    common: {
                        back: "Retour",
                        login: "Se connecter",
                        register: "S'inscrire",
                        or: "ou"
                    },

                    // Messages de validation
                    validation: {
                        usernameRequired: "Le nom d'utilisateur ou l'e-mail est requis",
                        emailRequired: "L'e-mail est requis",
                        invalidEmail: "Adresse e-mail invalide",
                        passwordRequired: "Le mot de passe est requis",
                        passwordMinLength: "Le mot de passe doit comporter au moins {{value}} caractères",
                        passwordComplexity: "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial",
                        confirmPasswordRequired: "Veuillez confirmer votre mot de passe",
                        passwordsDontMatch: "Les mots de passe ne correspondent pas",
                        codeRequired: "Le code de vérification est requis",
                        codeFormat: "Le code doit comporter 6 chiffres",
                        acceptTerms: "Vous devez accepter les termes et conditions",
                        usernameMinLength: "Le nom d'utilisateur doit comporter au moins {{value}} caractères"
                    },

                    // Écran de bienvenue
                    welcome: {
                        title: "Bienvenue sur M-Coil",
                        subtitle: "Votre compagnon personnel de productivité",
                        description: "Rejoignez des milliers d'utilisateurs qui augmentent déjà leur productivité avec nos outils et fonctionnalités puissants.",
                        login: "Se connecter",
                        register: "Créer un compte",
                        terms: "En continuant, vous acceptez nos {terms} et notre {privacy}.",
                        termsLink: "Conditions d'utilisation",
                        privacyLink: "Politique de confidentialité"
                    }



                },
            },
            de: {
                translation: {
                    // Previous translations (Settings, Units, etc.)
                    settings: "Einstellungen",
                    customizePreferences: "Passen Sie Ihre Einstellungen an",
                    language: "Sprache",
                    currency: "Währung",
                    uom: "Maßeinheit",
                    confirmChange: "Änderung bestätigen",
                    areYouSure: "Sind Sie sicher, dass Sie ändern möchten zu:",
                    cancel: "Abbrechen",
                    confirm: "Bestätigen",
                    menu: "Menü",
                    home: "Startseite",
                    profile: "Profil",
                    indexappheadertext: "Idealer Luftkühler für die einzigartigen Bedürfnisse Ihres Raums.",

                    // Sidebar Translations
                    sidebarHome: "Startseite",
                    sidebarProfile: "Profil",
                    sidebarSettings: "Einstellungen",
                    sidebarLogout: "Abmelden",

                    // Languages
                    en: "Englisch",
                    es: "Spanisch",
                    fr: "Französisch",
                    de: "Deutsch",

                    // Units
                    kg: "Kilogramm",
                    lb: "Pfund",
                    g: "Gramm",
                    m: "Meter",

                    // Profile page translations
                    yourProfile: "Ihr Profil",
                    manageProfile: "Verwalten Sie Ihre persönlichen Informationen und Einstellungen",
                    changePicture: "Bild ändern",
                    editProfile: "Profil bearbeiten",
                    logout: "Abmelden",
                    cropImage: "Bild zuschneiden",
                    fullName: "Vollständiger Name",
                    emailAddress: "E-Mail-Adresse",
                    enterFullName: "Geben Sie Ihren vollständigen Namen ein",
                    saveChanges: "Änderungen speichern",
                    profilePicUpdated: "Profilbild erfolgreich aktualisiert!",
                    profileUpdated: "Profil erfolgreich aktualisiert!",
                    logoutConfirmTitle: "Sind Sie sicher?",
                    logoutConfirmText: "Sie werden aus Ihrem Konto abgemeldet",
                    logoutConfirmBtn: "Ja, abmelden!",
                    logoutSuccessTitle: "Abgemeldet!",
                    logoutSuccessText: "Sie wurden erfolgreich abgemeldet.",
                    onlyImagesAllowed: "Bitte wählen Sie eine Bilddatei aus",
                    cropFailed: "Zuschneiden fehlgeschlagen. Bitte versuchen Sie es erneut.",

                    // Bottom Navigation labels (for Home page)
                    menu: "Menü",
                    home: "Startseite",
                    profile: "Profil",

                    // New translation keys for calculation
                    calculating: "Berechnung läuft...",
                    pleaseWait: "Bitte warten Sie, während wir Ihre Kühlbedürfnisse berechnen.",
                    calculationComplete: "Berechnung abgeschlossen",
                    yourCoolingNeedsCalculated: "Ihre Kühlanforderungen wurden berechnet.",
                    viewResult: "Ergebnis anzeigen",
                    noTitle: "Kein Titel",
                    searchCoolers: "Kühler suchen",
                    calculate: "Berechnen",
                    searchCoolers: "Kühler suchen",
                    calculateCoolingNeeds: "Kühlungsbedarf berechnen",

                    coolingResults: "Kühlergebnisse",
                    coolingRequirements: "Kühlungsanforderungen",
                    downloadPDF: "PDF Herunterladen",
                    backToCalculator: "Zurück zum Rechner",
                    standardTemplate: "Standardvorlage",
                    detailedTemplate: "Detaillierte Vorlage",
                    technicalTemplate: "Technische Vorlage",

                    generatingPDF: "PDF wird generiert...",
                    preparingDownload: "Bitte warten Sie, während wir Ihren Download vorbereiten.",
                    downloadReady: "Download bereit!",
                    downloadReadyText: "Ihr PDF mit der Vorlage {{template}} ist bereit zum Herunterladen.",
                    download: "Herunterladen",

                    // Anmeldeseite
                    login: {
                        title: "Willkommen zurück!",
                        subtitle: "Personalisierte Kühlmittel-Einblicke",
                        googleLogin: "Mit Google anmelden",
                        googleComingSoon: "Google-Anmeldung bald verfügbar!",
                        usernamePlaceholder: "Benutzername oder E-Mail",
                        passwordPlaceholder: "Passwort",
                        forgotPassword: "Passwort vergessen?",
                        noAccount: "Noch kein Konto?",
                        successMessage: "Anmeldung erfolgreich!",
                        errorMessage: "Ungültige Zugangsdaten!",
                        image1Text: '<a href="#" target="_blank">Präzise Kühllösungen für industrielle Räume</a>',
                        image2Text: '<a href="#" target="_blank">Optimieren Sie Ihr Kühlsystem mit M-Coil-Technologie</a>',
                        image3Text: '<a href="#" target="_blank">Expertenempfehlungen für Kühlmittel basierend auf Ihrem Raum</a>'
                    },

                    // Registrierungsseite
                    register: {
                        title: "M-Coil-Konto erstellen",
                        subtitle: "Erhalten Sie Ihre Kühlmittelempfehlungen",
                        googleSignup: "Mit Google registrieren",
                        googleComingSoon: "Google-Registrierung bald verfügbar!",
                        usernamePlaceholder: "Benutzername",
                        emailPlaceholder: "E-Mail",
                        passwordPlaceholder: "Passwort",
                        confirmPasswordPlaceholder: "Passwort wiederholen",
                        createAccount: "Konto erstellen",
                        haveAccount: "Bereits ein Konto?",
                        agreeTerms: "Ich stimme den {terms} und der {privacy} zu",
                        termsLink: "Nutzungsbedingungen",
                        privacyLink: "Datenschutzerklärung",
                        successMessage: "Registrierung erfolgreich!",
                        errorMessage: "Registrierung fehlgeschlagen!"
                    },

                    // Passwort vergessen
                    forgotPassword: {
                        title: "Passwort vergessen",
                        verifyTitle: "E-Mail bestätigen",
                        resetTitle: "Passwort zurücksetzen",
                        enterEmail: "E-Mail-Adresse eingeben, um einen Code zu erhalten",
                        codeSent: "Ein Code wurde an {email} gesendet",
                        createNewPassword: "Neues Passwort für Ihr Konto erstellen",
                        codePlaceholder: "6-stelligen Code eingeben",
                        newPasswordPlaceholder: "Neues Passwort",
                        confirmPasswordPlaceholder: "Neues Passwort bestätigen",
                        sendCode: "Code senden",
                        verifyCode: "Code überprüfen",
                        resetPassword: "Passwort zurücksetzen",
                        resendCode: "Code erneut senden",
                        newCodeSent: "Neuer Code an Ihre E-Mail gesendet!",
                        rememberPassword: "Passwort wieder eingefallen?",
                        backToLogin: "Zurück zur Anmeldung",
                        codeVerified: "Code erfolgreich verifiziert!",
                        resetSuccess: "Passwort erfolgreich zurückgesetzt!",
                        sendFailed: "Senden des Codes fehlgeschlagen",
                        invalidCode: "Ungültiger Bestätigungscode",
                        resetFailed: "Passwort konnte nicht zurückgesetzt werden"
                    },

                    // Allgemeine Texte
                    common: {
                        back: "Zurück",
                        login: "Anmelden",
                        register: "Registrieren",
                        or: "oder"
                    },

                    // Validierungsnachrichten
                    validation: {
                        usernameRequired: "Benutzername oder E-Mail ist erforderlich",
                        emailRequired: "E-Mail ist erforderlich",
                        invalidEmail: "Ungültige E-Mail-Adresse",
                        passwordRequired: "Passwort ist erforderlich",
                        passwordMinLength: "Passwort muss mindestens {{value}} Zeichen lang sein",
                        passwordComplexity: "Passwort muss mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten",
                        confirmPasswordRequired: "Bitte bestätigen Sie Ihr Passwort",
                        passwordsDontMatch: "Passwörter stimmen nicht überein",
                        codeRequired: "Bestätigungscode ist erforderlich",
                        codeFormat: "Code muss 6-stellig sein",
                        acceptTerms: "Sie müssen die Bedingungen akzeptieren",
                        usernameMinLength: "Benutzername muss mindestens {{value}} Zeichen lang sein"
                    },

                    // Willkommensseite
                    welcome: {
                        title: "Willkommen bei M-Coil",
                        subtitle: "Ihr persönlicher Produktivitätsbegleiter",
                        description: "Schließen Sie sich Tausenden von Nutzern an, die ihre Produktivität bereits mit unseren leistungsstarken Tools steigern.",
                        login: "Anmelden",
                        register: "Konto erstellen",
                        terms: "Durch die Fortsetzung stimmen Sie unseren {terms} und unserer {privacy} zu.",
                        termsLink: "Nutzungsbedingungen",
                        privacyLink: "Datenschutzerklärung"
                    }

                },
            },
        },
    });

export default i18n;
