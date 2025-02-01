import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import language files
import en from './locales/en.json';
import hi from './locales/hi.json';
import kn from './locales/kn.json';
import ur from './locales/ur.json';
import mr from './locales/mr.json';
import ta from './locales/ta.json';
import te from './locales/te.json';
// Add more languages as needed

const resources = {
  en: {translation: en},
  hi: {translation: hi},
  ur: {translation: ur},
  mr: {translation: mr},
  kn: {translation: kn},
  ta: {translation: ta},
  te: {translation: te},
  // Add more languages dynamically here
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already does escaping
  },
});

export const setLanguage = async languageCode => {
  try {
    await AsyncStorage.setItem('language', languageCode);
    await i18n.changeLanguage(languageCode);
  } catch (error) {
    console.error('Error setting language:', error);
  }
};

export const getLanguage = async () => {
  try {
    const language = await AsyncStorage.getItem('language');
    return language || 'en'; // Default to English if not found
  } catch (error) {
    console.error('Error getting language:', error);
    return 'en'; // Default fallback
  }
};

export default i18n;
