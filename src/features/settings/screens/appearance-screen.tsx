import { AppHeader, AppScreen, SelectionCard } from '@/shared/components';
import { VStack } from '@/shared/components/ui';
import { useThemeStore, type ThemePreference } from '@/shared/stores/theme-store';
import { useTranslation } from 'react-i18next';

const options: ThemePreference[] = ['system', 'light', 'dark'];

export function AppearanceScreen() {
  const { t } = useTranslation();
  const preference = useThemeStore((state) => state.preference);
  const setPreference = useThemeStore((state) => state.setPreference);

  return (
    <AppScreen>
      <AppHeader
        title={t('settings.themeTitle')}
        description={t('settings.themeDescription')}
        back
      />
      <VStack accessibilityRole="radiogroup" space="md">
        {options.map((value) => (
          <SelectionCard
            key={value}
            title={t(`settings.${value}`)}
            selected={preference === value}
            onPress={() => void setPreference(value)}
          />
        ))}
      </VStack>
    </AppScreen>
  );
}
