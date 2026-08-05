import { AppHeader, AppScreen, EmptyState } from '@/shared/components';
import {
  Box,
  Button,
  ButtonText,
  Card,
  Divider,
  HStack,
  Text,
  VStack,
} from '@/shared/components/ui';
import { useResolvedTheme } from '@/shared/hooks';
import { useSessionStore } from '@/shared/stores';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';

export function ProfileScreen({ userId }: { userId?: string }) {
  const { t } = useTranslation();
  const { colors } = useResolvedTheme();
  const session = useSessionStore((state) => state.session);
  const profile = useSessionStore((state) => state.profile);
  const isOwnProfile = !userId || userId === session?.user.id;

  if (!isOwnProfile) {
    return (
      <AppScreen>
        <AppHeader title={t('profile.publicTitle')} back />
        <EmptyState
          title={t('profile.publicUnavailableTitle')}
          description={t('profile.publicUnavailableDescription')}
        />
      </AppScreen>
    );
  }

  const name =
    profile?.displayName ?? session?.user.displayName ?? t('common.notAvailable');

  return (
    <AppScreen scroll>
      <AppHeader
        title={t('profile.title')}
        action={
          <Link href="/profile/edit" asChild>
            <Button size="sm" variant="outline">
              <ButtonText>{t('common.edit')}</ButtonText>
            </Button>
          </Link>
        }
        back
      />
      <VStack space="lg">
        <VStack space="md" className="items-center">
          <Box className="h-24 w-24 items-center justify-center rounded-full bg-accent">
            <Ionicons color={colors.primary} name="person" size={42} />
          </Box>
          <Text size="xl" weight="bold">
            {name}
          </Text>
          <Text tone="muted" className="text-center">
            {profile?.bio || t('common.notAvailable')}
          </Text>
        </VStack>

        <Card>
          <VStack space="md">
            <HStack className="justify-between gap-4">
              <Text tone="muted">{t('profile.email')}</Text>
              <Text weight="medium" className="shrink text-right">
                {session?.user.email ?? t('common.notAvailable')}
              </Text>
            </HStack>
            <Divider />
            <HStack className="justify-between gap-4">
              <Text tone="muted">{t('profile.phone')}</Text>
              <Text weight="medium" className="shrink text-right">
                {session?.user.phone ?? t('common.notAvailable')}
              </Text>
            </HStack>
          </VStack>
        </Card>
      </VStack>
    </AppScreen>
  );
}
