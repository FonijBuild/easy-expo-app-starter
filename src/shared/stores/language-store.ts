import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { appConfig, type SupportedLanguage } from '@/shared/config/app-config';
import { i18n, i18nReady, initialLanguage } from '@/shared/i18n/i18n';

const STORAGE_KEY = 'easy-starter:language';
const supportedLanguages = new Set<string>(
  appConfig.localization.languages.map(({ code }) => code),
);
let hydrationPromise: Promise<void> | null = null;

type LanguageState = {
  language: SupportedLanguage;
  isHydrated: boolean;
  hydrate: () => Promise<void>;
  setLanguage: (language: SupportedLanguage) => Promise<void>;
};

export const useLanguageStore = create<LanguageState>((set) => ({
  language: initialLanguage,
  isHydrated: false,

  hydrate: async () => {
    if (hydrationPromise) return hydrationPromise;

    hydrationPromise = (async () => {
      let language = initialLanguage;

      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved && supportedLanguages.has(saved)) {
          language = saved as SupportedLanguage;
        }
        await i18nReady;
        await i18n.changeLanguage(language);
      } catch (error) {
        if (__DEV__) console.warn('Unable to restore language preference.', error);
      } finally {
        set({ language, isHydrated: true });
      }
    })();

    return hydrationPromise;
  },

  setLanguage: async (language) => {
    await i18nReady;
    await i18n.changeLanguage(language);
    set({ language });

    try {
      await AsyncStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      if (__DEV__) console.warn('Unable to persist language preference.', error);
    }
  },
}));
