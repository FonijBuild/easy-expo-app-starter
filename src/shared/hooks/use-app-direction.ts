import { appConfig } from '@/shared/config/app-config';
import { useLanguageStore } from '@/shared/stores/language-store';

export function useAppDirection() {
  const language = useLanguageStore((state) => state.language);
  const isRTL =
    appConfig.localization.languages.find(({ code }) => code === language)
      ?.rtl ?? false;

  return {
    language,
    isRTL,
    direction: isRTL ? ('rtl' as const) : ('ltr' as const),
  };
}
