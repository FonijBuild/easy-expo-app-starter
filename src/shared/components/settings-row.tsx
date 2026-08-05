import { HStack, Pressable, Text, VStack } from '@/shared/components/ui';
import { useAppDirection, useResolvedTheme } from '@/shared/hooks';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps, ReactNode } from 'react';

type IconName = ComponentProps<typeof Ionicons>['name'];

type SettingsRowProps = {
  icon: IconName;
  title: string;
  description?: string;
  onPress?: () => void;
  destructive?: boolean;
  trailing?: ReactNode;
};

export function SettingsRow({
  icon,
  title,
  description,
  onPress,
  destructive = false,
  trailing,
}: SettingsRowProps) {
  const { colors } = useResolvedTheme();
  const { isRTL } = useAppDirection();
  const iconColor = destructive ? colors.destructive : colors.foreground;

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      className="rounded-xl px-1 py-3 data-[pressed=true]:bg-accent"
      disabled={!onPress}
      onPress={onPress}
    >
      <HStack space="md">
        <HStack
          className={
            destructive
              ? 'h-10 w-10 justify-center rounded-xl bg-destructive/10'
              : 'h-10 w-10 justify-center rounded-xl bg-accent'
          }
        >
          <Ionicons color={iconColor} name={icon} size={20} />
        </HStack>
        <VStack space="xs" className="min-w-0 flex-1">
          <Text weight="medium" tone={destructive ? 'danger' : 'default'}>
            {title}
          </Text>
          {description ? (
            <Text size="sm" tone="muted" numberOfLines={2}>
              {description}
            </Text>
          ) : null}
        </VStack>
        {trailing ??
          (onPress ? (
            <Ionicons
              color={colors.mutedForeground}
              name={isRTL ? 'chevron-back' : 'chevron-forward'}
              size={18}
            />
          ) : null)}
      </HStack>
    </Pressable>
  );
}
