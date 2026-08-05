import { AppScreen } from '@/shared/components';
import {
  Box,
  Button,
  ButtonText,
  Card,
  Heading,
  HStack,
  Progress,
  Text,
  VStack,
} from '@/shared/components/ui';
import { appConfig } from '@/shared/config';
import { useResolvedTheme } from '@/shared/hooks';
import { useIntroStore } from '@/shared/stores';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const slides = [
  { key: 'fast', icon: 'flash-outline' },
  { key: 'scale', icon: 'layers-outline' },
  { key: 'brand', icon: 'color-palette-outline' },
] as const;

export function IntroScreen() {
  const { t } = useTranslation();
  const { colors } = useResolvedTheme();
  const [index, setIndex] = useState(0);
  const completeIntro = useIntroStore((state) => state.complete);
  const slide = slides[index] ?? slides[0];

  const finish = async () => {
    await completeIntro();
    router.replace('/');
  };

  return (
    <AppScreen contentClassName="justify-between py-8">
      <HStack className="justify-between">
        <Text weight="bold">{appConfig.brand.name}</Text>
        <Button variant="link" onPress={() => void finish()}>
          <ButtonText>{t('intro.skip')}</ButtonText>
        </Button>
      </HStack>

      <VStack space="xl">
        <Card className="items-center gap-6 p-8">
          <Box className="h-24 w-24 items-center justify-center rounded-3xl bg-accent">
            <Ionicons color={colors.primary} name={slide.icon} size={44} />
          </Box>
          <VStack space="md">
            <Heading size="xl" className="text-center">
              {t(`intro.slides.${slide.key}.title`)}
            </Heading>
            <Text tone="muted" className="text-center">
              {t(`intro.slides.${slide.key}.description`)}
            </Text>
          </VStack>
        </Card>
        <Progress value={((index + 1) / slides.length) * 100} />
      </VStack>

      <Button
        onPress={() => {
          if (index === slides.length - 1) void finish();
          else setIndex((value) => value + 1);
        }}
      >
        <ButtonText>
          {index === slides.length - 1 ? t('intro.start') : t('intro.next')}
        </ButtonText>
      </Button>
    </AppScreen>
  );
}
