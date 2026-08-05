import { Redirect, type Href } from 'expo-router';
import { appConfig } from '@/shared/config';
import { useIntroStore, useSessionStore } from '@/shared/stores';

export default function IndexRoute() {
  const hasSeenIntro = useIntroStore((state) => state.hasSeenIntro);
  const session = useSessionStore((state) => state.session);

  let href: Href = appConfig.features.intro ? '/(intro)' : '/(auth)/welcome';

  if ((hasSeenIntro || !appConfig.features.intro) && !session) {
    href = '/(auth)/welcome';
  } else if (session && !session.onboardingCompleted) {
    href = '/(onboarding)/profile';
  } else if (session) {
    href = '/(tabs)/dashboard';
  }

  return <Redirect href={href} />;
}
