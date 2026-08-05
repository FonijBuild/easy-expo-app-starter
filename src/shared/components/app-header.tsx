import { Heading, HStack, Pressable, Text, VStack } from '@/shared/components/ui';
import { useAppDirection, useResolvedTheme } from '@/shared/hooks';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type AppHeaderProps = {
  title: string;
  description?: string;
  back?: boolean;
  action?: ReactNode;
};

export function AppHeader({ title, description, back = false, action }: AppHeaderProps) {
  const { t } = useTranslation();
  const { colors } = useResolvedTheme();
  const { isRTL } = useAppDirection();

  return (
    <HStack space="md" className="mb-6 items-start justify-between">
      <HStack space="md" className="min-w-0 flex-1 items-start">
        {back ? (
          <Pressable
            accessibilityLabel={t('common.back')}
            accessibilityRole="button"
            className="h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface"
            hitSlop={10}
            onPress={() => router.back()}
          >
            <Ionicons
              color={colors.foreground}
              name={isRTL ? 'chevron-forward' : 'chevron-back'}
              size={22}
            />
          </Pressable>
        ) : null}

        <VStack space="xs" className="min-w-0 flex-1">
          <Heading size="lg">{title}</Heading>
          {description ? <Text tone="muted">{description}</Text> : null}
        </VStack>
      </HStack>
      {action}
    </HStack>
  );
}
