import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { appConfig, type SupportedLanguage } from '@/shared/config/app-config';
import en from './locales/en.json';
import fa from './locales/fa.json';

const deviceLanguage = getLocales()[0]?.languageCode;
const supportedLanguages = new Set<string>(
  appConfig.localization.languages.map(({ code }) => code),
);

export const initialLanguage: SupportedLanguage =
  deviceLanguage && supportedLanguages.has(deviceLanguage)
    ? (deviceLanguage as SupportedLanguage)
    : appConfig.localization.defaultLanguage;

export const i18nReady = i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources: {
    en: { translation: en },
    fa: { translation: fa },
  },
  lng: initialLanguage,
  fallbackLng: appConfig.localization.defaultLanguage,
  supportedLngs: appConfig.localization.languages.map(({ code }) => code),
  interpolation: { escapeValue: false },
  returnNull: false,
});

export { i18n };
