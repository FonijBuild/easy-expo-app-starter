import { FormField } from '@/shared/components';
import { Button, ButtonSpinner, ButtonText, Text, VStack } from '@/shared/components/ui';
import { appConfig } from '@/shared/config';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link, router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { authRepository, isMockAuth } from '../api/auth.repository';
import { AuthShell } from '../components/auth-shell';
import { authErrorKey } from '../lib/auth-error';
import { forgotPasswordSchema, type ForgotPasswordValues } from '../model/auth.schemas';

export function ForgotPasswordScreen() {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const resetRequest = useMutation({
    mutationFn: authRepository.requestPasswordReset,
    onSuccess: () => router.replace('/(auth)/check-email'),
    onError: (error) => setError('root', { message: authErrorKey(error) }),
  });

  return (
    <AuthShell title={t('auth.forgotTitle')} description={t('auth.forgotDescription')}>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <FormField
            autoCapitalize="none"
            error={errors.email?.message ? t(errors.email.message) : undefined}
            keyboardType="email-address"
            label={t('auth.email')}
            value={field.value}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
          />
        )}
      />

      {errors.root?.message ? (
        <Text accessibilityRole="alert" tone="danger">
          {t(errors.root.message)}
        </Text>
      ) : null}

      <VStack space="sm">
        <Button
          isDisabled={resetRequest.isPending}
          onPress={handleSubmit((values) => resetRequest.mutate(values))}
        >
          {resetRequest.isPending ? <ButtonSpinner /> : null}
          <ButtonText>{t('auth.sendReset')}</ButtonText>
        </Button>

        {isMockAuth ? (
          <Link
            href={{
              pathname: '/(auth)/reset-password',
              params: { token: appConfig.auth.mockResetToken },
            }}
            asChild
          >
            <Button variant="link">
              <ButtonText>{t('auth.mockReset')}</ButtonText>
            </Button>
          </Link>
        ) : null}
      </VStack>
    </AuthShell>
  );
}
