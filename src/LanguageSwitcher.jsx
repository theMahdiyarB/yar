import React from 'react';
import { useTranslation } from 'react-i18next';

// This component provides a button to toggle between English and Persian.
export default function LanguageSwitcher() {
  // Get both the 't' function for translations and the 'i18n' object
  const { t, i18n } = useTranslation();

  // Get the current language code (e.g., 'en' or 'fa')
  const currentLanguage = i18n.language;

  /**
   * Toggles the language. If the current language is English, it switches
   * to Persian, and vice versa.
   */
  const handleLanguageChange = () => {
    const newLanguage = currentLanguage === 'en' ? 'fa' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={handleLanguageChange}
        className="flex items-center justify-center w-28 h-12 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        aria-label={`${t('languageSwitcher.switchTo')} ${currentLanguage === 'en' ? t('languageSwitcher.persian') : t('languageSwitcher.english')}`}
      >
        {currentLanguage === 'en' ? (
          <>
            <span className="text-lg mr-2">🇮🇷</span>
            {/* Use the 't' function to get text from your json file */}
            <span className="font-semibold text-gray-700">{t('languageSwitcher.persian')}</span>
          </>
        ) : (
          <>
            <span className="text-lg mr-2">🇺🇸</span>
            {/* Use the 't' function to get text from your json file */}
            <span className="font-semibold text-gray-700">{t('languageSwitcher.english')}</span>
          </>
        )}
      </button>
    </div>
  );
}
