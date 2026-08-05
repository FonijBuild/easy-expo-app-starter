import { FormField } from '@/shared/components';
import { Button, ButtonSpinner, ButtonText, Text, VStack } from '@/shared/components/ui';
import { appConfig } from '@/shared/config';
import { useSessionStore } from '@/shared/stores';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link, router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { authRepository } from '../api/auth.repository';
import { AuthShell } from '../components/auth-shell';
import { authErrorKey } from '../lib/auth-error';
import { emailLoginSchema, type EmailLoginValues } from '../model/auth.schemas';

export function EmailLoginScreen() {
  const { t } = useTranslation();
  const setSession = useSessionStore((state) => state.setSession);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EmailLoginValues>({
    resolver: zodResolver(emailLoginSchema),
    defaultValues: {
      email: appConfig.auth.mockEmail,
      password: appConfig.auth.mockPassword,
    },
  });

  const login = useMutation({
    mutationFn: authRepository.loginWithEmail,
    onSuccess: async (session) => {
      await setSession(session);
      router.replace('/');
    },
    onError: (error) => {
      setError('root', { message: authErrorKey(error) });
    },
  });

  return (
    <AuthShell title={t('auth.emailLogin')} description={t('auth.welcomeDescription')}>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <FormField
            autoCapitalize="none"
            autoComplete="email"
            error={fieldError(errors.email?.message, t)}
            keyboardType="email-address"
            label={t('auth.email')}
            value={field.value}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <FormField
            autoComplete="current-password"
            error={fieldError(errors.password?.message, t)}
            label={t('auth.password')}
            secureTextEntry
            value={field.value}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
          />
        )}
      />

      {errors.root?.message ? (
        <Text accessibilityRole="alert" size="sm" tone="danger">
          {t(errors.root.message)}
        </Text>
      ) : null}

      <VStack space="sm">
        <Button
          isDisabled={login.isPending}
          onPress={handleSubmit((values) => login.mutate(values))}
        >
          {login.isPending ? <ButtonSpinner /> : null}
          <ButtonText>{t('auth.login')}</ButtonText>
        </Button>
        <Link href="/(auth)/forgot-password" asChild>
          <Button variant="link">
            <ButtonText>{t('auth.forgotPassword')}</ButtonText>
          </Button>
        </Link>
      </VStack>
    </AuthShell>
  );
}

function fieldError(key: string | undefined, translate: (key: string) => string) {
  return key ? translate(key) : undefined;
}
