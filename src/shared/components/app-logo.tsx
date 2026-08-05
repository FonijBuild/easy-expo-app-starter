import { Image } from 'expo-image';
import { styled } from 'nativewind';
import { useTranslation } from 'react-i18next';

import { Box, Heading, Text, VStack } from '@/shared/components/ui';
import { appConfig, brandAssets } from '@/shared/config';
import { useResolvedTheme } from '@/shared/hooks';

const StyledImage = styled(Image);

export function AppLogo({ compact = false }: { compact?: boolean }) {
  const { t } = useTranslation();
  const { isDark } = useResolvedTheme();
  const { brand } = appConfig;

  return (
    <VStack space="sm" className="items-center">
      {brand.logo.mode === 'image' ? (
        <StyledImage
          source={isDark ? brandAssets.logoDark : brandAssets.logo}
          accessibilityLabel={brand.name}
          contentFit="cover"
          className={brand.logo.rounded ? 'h-16 w-16 rounded-2xl' : 'h-16 w-16'}
        />
      ) : (
        <Box className="h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-sm">
          <Heading size="md" className="text-primary-foreground">
            {brand.shortName}
          </Heading>
        </Box>
      )}

      {!compact ? (
        <>
          <Heading size="md" className="text-center">
            {brand.name}
          </Heading>
          <Text size="sm" tone="muted" className="max-w-sm text-center">
            {t('brand.tagline')}
          </Text>
        </>
      ) : null}
    </VStack>
  );
}
