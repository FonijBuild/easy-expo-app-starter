import { AppHeader, AppScreen, SettingsRow } from '@/shared/components';
import { Card, Text, VStack } from '@/shared/components/ui';
import { useTranslation } from 'react-i18next';

export function AccountScreen() {
  const { t } = useTranslation();

  return (
    <AppScreen scroll>
      <AppHeader
        title={t('settings.account')}
        description={t('settings.security')}
        back
      />
      <VStack space="lg">
        <Card>
          <SettingsRow
            icon="key-outline"
            title={t('auth.password')}
            description={t('auth.forgotDescription')}
          />
        </Card>
        <VStack space="sm">
          <Text weight="semibold" tone="danger">
            {t('settings.dangerZone')}
          </Text>
          <Card>
            <SettingsRow
              icon="trash-outline"
              title={t('settings.deleteAccount')}
              description={t('settings.deletePlaceholder')}
              destructive
            />
          </Card>
        </VStack>
      </VStack>
    </AppScreen>
  );
}
