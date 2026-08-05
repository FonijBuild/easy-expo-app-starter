import { AppLogo, AppScreen } from '@/shared/components';
import { Button, ButtonText, Card, HStack, Text, VStack } from '@/shared/components/ui';
import { appConfig } from '@/shared/config';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';

export function AuthWelcomeScreen() {
  const { t } = useTranslation();

  return (
    <AppScreen scroll contentClassName="min-h-full justify-center py-10">
      <VStack space="2xl">
        <AppLogo />
        <VStack space="md">
          {appConfig.features.emailAuth ? (
            <Link href="/(auth)/login-email" asChild>
              <Button>
                <ButtonText>{t('auth.emailLogin')}</ButtonText>
              </Button>
            </Link>
          ) : null}

          {appConfig.features.phoneAuth ? (
            <Link href="/(auth)/login-phone" asChild>
              <Button variant="outline">
                <ButtonText>{t('auth.phoneLogin')}</ButtonText>
              </Button>
            </Link>
          ) : null}

          {appConfig.features.phoneAuth && appConfig.features.registration ? (
            <Link href="/(auth)/register-phone" asChild>
              <Button variant="ghost">
                <ButtonText>{t('auth.createAccount')}</ButtonText>
              </Button>
            </Link>
          ) : null}
        </VStack>

        <Card>
          <HStack space="xs" className="flex-wrap justify-center">
            <Text size="xs" tone="muted">
              {t('auth.termsPrefix')}
            </Text>
            <Link href="/(legal)/terms">
              <Text size="xs" tone="primary">
                {t('auth.terms')}
              </Text>
            </Link>
            <Text size="xs" tone="muted">
              {t('auth.or')}
            </Text>
            <Link href="/(legal)/privacy">
              <Text size="xs" tone="primary">
                {t('auth.privacy')}
              </Text>
            </Link>
          </HStack>
        </Card>
      </VStack>
    </AppScreen>
  );
}
