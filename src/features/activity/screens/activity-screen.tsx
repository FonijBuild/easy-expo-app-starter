import { AppHeader, AppScreen, EmptyState } from '@/shared/components';
import { VStack } from '@/shared/components/ui';
import { useTranslation } from 'react-i18next';

export function ActivityScreen() {
  const { t } = useTranslation();

  return (
    <AppScreen>
      <VStack className="flex-1">
        <AppHeader title={t('activity.title')} description={t('activity.description')} />
        <EmptyState
          title={t('activity.emptyTitle')}
          description={t('activity.emptyDescription')}
        />
      </VStack>
    </AppScreen>
  );
}
