import { Redirect } from 'expo-router';
import { PhoneAuthScreen } from '@/features/auth';
import { appConfig } from '@/shared/config';

export default function PhoneRegistrationRoute() {
  if (!appConfig.features.phoneAuth || !appConfig.features.registration) {
    return <Redirect href="/(auth)/welcome" />;
  }
  return <PhoneAuthScreen purpose="register" />;
}
