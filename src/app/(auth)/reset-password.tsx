import { Redirect } from 'expo-router';
import { ResetPasswordScreen } from '@/features/auth';
import { appConfig } from '@/shared/config';

export default function ResetPasswordRoute() {
  if (!appConfig.features.emailAuth) return <Redirect href="/(auth)/welcome" />;
  return <ResetPasswordScreen />;
}
