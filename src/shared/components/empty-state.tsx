import { Box, Heading, Text, VStack } from '@/shared/components/ui';
import { useResolvedTheme } from '@/shared/hooks';
import Ionicons from '@expo/vector-icons/Ionicons';

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { colors } = useResolvedTheme();

  return (
    <VStack space="md" className="flex-1 items-center justify-center px-8 py-16">
      <Box className="h-16 w-16 items-center justify-center rounded-2xl bg-accent">
        <Ionicons color={colors.primary} name="sparkles-outline" size={28} />
      </Box>
      <Heading size="md" className="text-center">
        {title}
      </Heading>
      <Text tone="muted" className="text-center">
        {description}
      </Text>
    </VStack>
  );
}
