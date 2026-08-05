import { Card, HStack, Pressable, Text, VStack } from '@/shared/components/ui';
import { useResolvedTheme } from '@/shared/hooks';
import Ionicons from '@expo/vector-icons/Ionicons';

type SelectionCardProps = {
  title: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
};

export function SelectionCard({
  title,
  description,
  selected,
  onPress,
}: SelectionCardProps) {
  const { colors } = useResolvedTheme();

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
    >
      <Card className={selected ? 'border-primary bg-accent' : ''}>
        <HStack space="md" className="justify-between">
          <VStack space="xs" className="min-w-0 flex-1">
            <Text weight="semibold">{title}</Text>
            {description ? (
              <Text size="sm" tone="muted">
                {description}
              </Text>
            ) : null}
          </VStack>
          <Ionicons
            color={selected ? colors.primary : colors.mutedForeground}
            name={selected ? 'radio-button-on' : 'radio-button-off'}
            size={22}
          />
        </HStack>
      </Card>
    </Pressable>
  );
}
