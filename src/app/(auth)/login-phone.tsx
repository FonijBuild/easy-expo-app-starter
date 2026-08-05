import { Redirect } from 'expo-router';
import { PhoneAuthScreen } from '@/features/auth';
import { appConfig } from '@/shared/config';

export default function PhoneLoginRoute() {
  if (!appConfig.features.phoneAuth) return <Redirect href="/(auth)/welcome" />;
  return <PhoneAuthScreen purpose="login" />;
}
