import { AppHeader, AppLogo, AppScreen } from '@/shared/components';
import { Card, Text, VStack } from '@/shared/components/ui';
import { appConfig } from '@/shared/config';
import Constants from 'expo-constants';
import { useTranslation } from 'react-i18next';

export function AboutScreen() {
  const { t } = useTranslation();

  return (
    <AppScreen>
      <AppHeader
        title={t('settings.aboutTitle', { appName: appConfig.brand.name })}
        back
      />
      <VStack space="xl" className="items-center">
        <AppLogo />
        <Card className="w-full">
          <Text tone="muted" className="text-center">
            {t('settings.aboutDescription')}
          </Text>
        </Card>
        <Text size="xs" tone="muted">
          {t('common.version', {
            version: Constants.expoConfig?.version ?? '1.0.0',
          })}
        </Text>
      </VStack>
    </AppScreen>
  );
}
