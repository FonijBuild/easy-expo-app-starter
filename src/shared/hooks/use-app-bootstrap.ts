import { useEffect, useRef } from 'react';
import {
  useIntroStore,
  useLanguageStore,
  useSessionStore,
  useThemeStore,
} from '@/shared/stores';

export function useAppBootstrap() {
  const started = useRef(false);
  const sessionReady = useSessionStore((state) => state.isHydrated);
  const introReady = useIntroStore((state) => state.isHydrated);
  const themeReady = useThemeStore((state) => state.isHydrated);
  const languageReady = useLanguageStore((state) => state.isHydrated);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    void Promise.all([
      useSessionStore.getState().hydrate(),
      useIntroStore.getState().hydrate(),
      useThemeStore.getState().hydrate(),
      useLanguageStore.getState().hydrate(),
    ]);
  }, []);

  return sessionReady && introReady && themeReady && languageReady;
}
