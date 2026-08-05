import { AppScreen, EmptyState } from '@/shared/components';
import { Button, ButtonText, VStack } from '@/shared/components/ui';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function NotFoundRoute() {
  const { t } = useTranslation();

  return (
    <AppScreen>
      <VStack className="flex-1 justify-center">
        <EmptyState
          title={t('errors.notFoundTitle')}
          description={t('errors.notFoundDescription')}
        />
        <Button onPress={() => router.replace('/')}>
          <ButtonText>{t('errors.goHome')}</ButtonText>
        </Button>
      </VStack>
    </AppScreen>
  );
}
