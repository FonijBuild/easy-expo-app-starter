import { useTranslation } from 'react-i18next';

import { AppHeader, AppScreen } from '@/shared/components';
import { Card, Text, VStack } from '@/shared/components/ui';
import { appConfig } from '@/shared/config/app-config';
import { formatDate } from '@/shared/i18n';

export function LegalScreen({ type }: { type: 'terms' | 'privacy' }) {
  const { i18n, t } = useTranslation();
  const title = type === 'terms' ? t('legal.termsTitle') : t('legal.privacyTitle');
  const body = type === 'terms' ? t('legal.termsBody') : t('legal.privacyBody');
  const formattedDate = formatDate(
    appConfig.legal.lastUpdated,
    i18n.resolvedLanguage ?? appConfig.localization.defaultLanguage,
  );

  return (
    <AppScreen scroll>
      <AppHeader title={title} back />
      <VStack space="md">
        <Text size="sm" tone="muted">
          {t('legal.updated', { date: formattedDate })}
        </Text>
        <Card>
          <Text>{body}</Text>
        </Card>
      </VStack>
    </AppScreen>
  );
}
