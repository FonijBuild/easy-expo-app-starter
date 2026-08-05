import { Redirect } from 'expo-router';
import { EmailLoginScreen } from '@/features/auth';
import { appConfig } from '@/shared/config';

export default function EmailLoginRoute() {
  if (!appConfig.features.emailAuth) return <Redirect href="/(auth)/welcome" />;
  return <EmailLoginScreen />;
}
