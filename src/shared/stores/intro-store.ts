import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

const STORAGE_KEY = 'easy-starter:intro-seen';
let hydrationPromise: Promise<void> | null = null;

type IntroState = {
  hasSeenIntro: boolean;
  isHydrated: boolean;
  hydrate: () => Promise<void>;
  complete: () => Promise<void>;
  reset: () => Promise<void>;
};

export const useIntroStore = create<IntroState>((set) => ({
  hasSeenIntro: false,
  isHydrated: false,

  hydrate: async () => {
    if (hydrationPromise) return hydrationPromise;

    hydrationPromise = (async () => {
      let hasSeenIntro = false;
      try {
        hasSeenIntro = (await AsyncStorage.getItem(STORAGE_KEY)) === 'true';
      } catch (error) {
        if (__DEV__) console.warn('Unable to restore intro state.', error);
      } finally {
        set({ hasSeenIntro, isHydrated: true });
      }
    })();

    return hydrationPromise;
  },

  complete: async () => {
    set({ hasSeenIntro: true });
    try {
      await AsyncStorage.setItem(STORAGE_KEY, 'true');
    } catch (error) {
      if (__DEV__) console.warn('Unable to persist intro state.', error);
    }
  },

  reset: async () => {
    set({ hasSeenIntro: false });
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      if (__DEV__) console.warn('Unable to reset intro state.', error);
    }
  },
}));
