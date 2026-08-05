import { AppHeader, AppScreen, SelectionCard } from '@/shared/components';
import { VStack } from '@/shared/components/ui';
import { appConfig } from '@/shared/config';
import { useLanguageStore } from '@/shared/stores';
import { useTranslation } from 'react-i18next';

export function LanguageScreen() {
  const { t } = useTranslation();
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  return (
    <AppScreen>
      <AppHeader
        title={t('settings.languageTitle')}
        description={t('settings.languageDescription')}
        back
      />
      <VStack accessibilityRole="radiogroup" space="md">
        {appConfig.localization.languages.map((option) => (
          <SelectionCard
            key={option.code}
            title={t(option.labelKey)}
            description={option.nativeLabel}
            selected={language === option.code}
            onPress={() => void setLanguage(option.code)}
          />
        ))}
      </VStack>
    </AppScreen>
  );
}
