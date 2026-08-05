import { AppHeader, AppScreen, SettingsRow } from '@/shared/components';
import { Card, Divider, Text, VStack } from '@/shared/components/ui';
import { appConfig } from '@/shared/config';
import { useSessionStore } from '@/shared/stores';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

export function SettingsScreen() {
  const { t } = useTranslation();
  const logout = useSessionStore((state) => state.logout);

  return (
    <AppScreen scroll>
      <AppHeader title={t('settings.title')} />
      <VStack space="lg">
        <Card>
          {appConfig.features.profile ? (
            <>
              <SettingsRow
                icon="person-outline"
                title={t('settings.profile')}
                onPress={() => router.push('/profile')}
              />
              <Divider />
            </>
          ) : null}
          <SettingsRow
            icon="shield-checkmark-outline"
            title={t('settings.account')}
            description={t('settings.security')}
            onPress={() => router.push('/settings/account')}
          />
        </Card>

        <Card>
          <SettingsRow
            icon="contrast-outline"
            title={t('settings.appearance')}
            onPress={() => router.push('/settings/appearance')}
          />
          <Divider />
          <SettingsRow
            icon="language-outline"
            title={t('settings.language')}
            onPress={() => router.push('/settings/language')}
          />
          <Divider />
          <SettingsRow
            icon="information-circle-outline"
            title={t('settings.about')}
            onPress={() => router.push('/settings/about')}
          />
        </Card>

        <Card>
          <SettingsRow
            icon="log-out-outline"
            title={t('auth.logout')}
            destructive
            onPress={async () => {
              await logout();
              router.replace('/');
            }}
          />
        </Card>

        <Text size="xs" tone="muted" className="text-center">
          {t('common.version', {
            version: Constants.expoConfig?.version ?? '1.0.0',
          })}
        </Text>
      </VStack>
    </AppScreen>
  );
}
