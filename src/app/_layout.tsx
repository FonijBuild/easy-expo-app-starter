import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { appConfig } from '@/shared/config';
import { AppProviders } from '@/shared/providers';
import { useIntroStore, useSessionStore } from '@/shared/stores';
import '../global.css';

void SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: 'index',
};

function RootNavigator() {
  const hasSeenIntro = useIntroStore((state) => state.hasSeenIntro);
  const session = useSessionStore((state) => state.session);
  const isOnboarded = Boolean(session?.onboardingCompleted);
  const introRequired = appConfig.features.intro && !hasSeenIntro;
  const appReady = Boolean(session) && isOnboarded;

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="index" />

      <Stack.Protected guard={introRequired}>
        <Stack.Screen name="(intro)" />
      </Stack.Protected>

      <Stack.Protected guard={!introRequired && !session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected guard={Boolean(session) && !isOnboarded}>
        <Stack.Screen name="(onboarding)" />
      </Stack.Protected>

      <Stack.Protected guard={appReady}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="settings" />
      </Stack.Protected>

      <Stack.Protected guard={appReady && appConfig.features.profile}>
        <Stack.Screen name="profile" />
      </Stack.Protected>

      <Stack.Screen name="(legal)" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}
