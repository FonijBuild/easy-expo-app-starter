import { AppScreen } from '@/shared/components';
import {
  Badge,
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
import { useSessionStore } from '@/shared/stores';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';

const stats = [
  ['activeUsers', '2.4K', 'people-outline'],
  ['completion', '78%', 'checkmark-circle-outline'],
  ['revenue', '$12.8K', 'trending-up-outline'],
] as const;

export function DashboardScreen() {
  const { t } = useTranslation();
  const { colors } = useResolvedTheme();
  const name = useSessionStore(
    (state) =>
      state.profile?.displayName ??
      state.session?.user.displayName ??
      t('dashboard.defaultUser'),
  );

  return (
    <AppScreen scroll contentClassName="gap-6">
      <VStack space="xs">
        <Heading size="xl">{t('dashboard.greeting', { name })}</Heading>
        <Text tone="muted">{t('dashboard.subtitle')}</Text>
      </VStack>

      <VStack space="md">
        <HStack className="justify-between">
          <Heading size="md">{t('dashboard.overview')}</Heading>
          <Badge>
            <Text size="xs" tone="primary" weight="semibold">
              {t('dashboard.liveDemo')}
            </Text>
          </Badge>
        </HStack>

        <HStack space="md" className="flex-wrap">
          {stats.map(([label, value, icon]) => (
            <Card key={label} className="min-w-[150px] flex-1 gap-3">
              <Box className="h-10 w-10 items-center justify-center rounded-xl bg-accent">
                <Ionicons color={colors.primary} name={icon} size={20} />
              </Box>
              <Heading size="md">{value}</Heading>
              <Text size="sm" tone="muted">
                {t(`dashboard.${label}`)}
              </Text>
            </Card>
          ))}
        </HStack>

        <Card className="gap-3">
          <HStack className="justify-between">
            <Text weight="semibold">{t('dashboard.completion')}</Text>
            <Text weight="bold">78%</Text>
          </HStack>
          <Progress value={78} />
        </Card>
      </VStack>

      <VStack space="md">
        <Heading size="md">{t('dashboard.quickActions')}</Heading>
        <HStack space="md" className="flex-wrap">
          <Button className="min-w-[150px] flex-1">
            <ButtonText>{t('dashboard.newItem')}</ButtonText>
          </Button>
          <Button variant="outline" className="min-w-[150px] flex-1">
            <ButtonText>{t('dashboard.invite')}</ButtonText>
          </Button>
          <Button variant="secondary" className="min-w-[150px] flex-1">
            <ButtonText>{t('dashboard.report')}</ButtonText>
          </Button>
        </HStack>
      </VStack>

      <VStack space="md">
        <Heading size="md">{t('dashboard.recent')}</Heading>
        {(['profile', 'security', 'project'] as const).map((key, index) => (
          <Card key={key}>
            <HStack space="md">
              <Box className="h-10 w-10 items-center justify-center rounded-full bg-accent">
                <Ionicons color={colors.primary} name="checkmark" size={20} />
              </Box>
              <VStack className="flex-1">
                <Text weight="medium">{t(`dashboard.items.${key}`)}</Text>
                <Text size="xs" tone="muted">
                  {t('dashboard.hourAgo', { count: index + 1 })}
                </Text>
              </VStack>
            </HStack>
          </Card>
        ))}
      </VStack>

      {appConfig.features.profile ? (
        <Link href="/profile" asChild>
          <Button variant="ghost">
            <ButtonText>{t('settings.profile')}</ButtonText>
          </Button>
        </Link>
      ) : null}
    </AppScreen>
  );
}
