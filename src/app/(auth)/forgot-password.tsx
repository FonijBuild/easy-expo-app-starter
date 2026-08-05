import { Redirect } from 'expo-router';
import { ForgotPasswordScreen } from '@/features/auth';
import { appConfig } from '@/shared/config';

export default function ForgotPasswordRoute() {
  if (!appConfig.features.emailAuth) return <Redirect href="/(auth)/welcome" />;
  return <ForgotPasswordScreen />;
}
