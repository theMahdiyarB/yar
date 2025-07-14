import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n
  // Use the i18next-http-backend plugin to load translations from a folder
  .use(HttpApi)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    // The default language to use
    fallbackLng: 'en',
    
    // Supported languages
    supportedLngs: ['en', 'fa'],

    // Enable debug mode for development
    // You can see logs in the browser console
    debug: true,

    // Options for react-i18next
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },

    // Configuration for the backend plugin
    backend: {
      // Path to your translation files.
      // {{lng}} will be replaced with the current language (e.g., 'en')
      // {{ns}} will be replaced with the namespace (we use 'translation' by default)
      // This will look for files like /locales/en/translation.json
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

export default i18n;
