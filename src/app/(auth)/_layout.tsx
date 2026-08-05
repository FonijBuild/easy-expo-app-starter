import { Stack } from 'expo-router';
import { appConfig } from '@/shared/config';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="welcome" />

      <Stack.Protected guard={appConfig.features.emailAuth}>
        <Stack.Screen name="login-email" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="check-email" />
        <Stack.Screen name="reset-password" />
        <Stack.Screen name="reset-password-success" />
      </Stack.Protected>

      <Stack.Protected guard={appConfig.features.phoneAuth}>
        <Stack.Screen name="login-phone" />
        <Stack.Screen name="verify-otp" />
      </Stack.Protected>

      <Stack.Protected
        guard={
          appConfig.features.phoneAuth && appConfig.features.registration
        }
      >
        <Stack.Screen name="register-phone" />
      </Stack.Protected>
    </Stack>
  );
}
