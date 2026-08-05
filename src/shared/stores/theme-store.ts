import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

export type ThemePreference = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'easy-starter:theme';
const allowed = new Set<ThemePreference>(['system', 'light', 'dark']);
let hydrationPromise: Promise<void> | null = null;

type ThemeState = {
  preference: ThemePreference;
  isHydrated: boolean;
  hydrate: () => Promise<void>;
  setPreference: (value: ThemePreference) => Promise<void>;
};

export const useThemeStore = create<ThemeState>((set) => ({
  preference: 'system',
  isHydrated: false,

  hydrate: async () => {
    if (hydrationPromise) return hydrationPromise;

    hydrationPromise = (async () => {
      let preference: ThemePreference = 'system';

      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved && allowed.has(saved as ThemePreference)) {
          preference = saved as ThemePreference;
        }
      } catch (error) {
        if (__DEV__) {
          console.warn('Unable to restore theme preference.', error);
        }
      } finally {
        set({ preference, isHydrated: true });
      }
    })();

    return hydrationPromise;
  },

  setPreference: async (preference) => {
    set({ preference });

    try {
      await AsyncStorage.setItem(STORAGE_KEY, preference);
    } catch (error) {
      if (__DEV__) {
        console.warn('Unable to persist theme preference.', error);
      }
    }
  },
}));
