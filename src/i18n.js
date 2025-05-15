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
                },
            },
        },
    });

export default i18n;
