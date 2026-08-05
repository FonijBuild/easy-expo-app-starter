import { FormField } from '@/shared/components';
import { Button, ButtonSpinner, ButtonText, Text } from '@/shared/components/ui';
import { getSingleRouteParam } from '@/shared/lib/route-params';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { authRepository } from '../api/auth.repository';
import { AuthShell } from '../components/auth-shell';
import { authErrorKey } from '../lib/auth-error';
import { resetPasswordSchema, type ResetPasswordValues } from '../model/auth.schemas';

export function ResetPasswordScreen() {
  const { t } = useTranslation();
  const params = useLocalSearchParams<{ token?: string | string[] }>();
  const token = getSingleRouteParam(params.token) ?? '';
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const resetPassword = useMutation({
    mutationFn: (values: ResetPasswordValues) =>
      authRepository.resetPassword({ token, password: values.password }),
    onSuccess: () => router.replace('/(auth)/reset-password-success'),
    onError: (error) => setError('root', { message: authErrorKey(error) }),
  });

  return (
    <AuthShell title={t('auth.resetTitle')}>
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <FormField
            error={errors.password?.message ? t(errors.password.message) : undefined}
            label={t('auth.newPassword')}
            secureTextEntry
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <FormField
            error={
              errors.confirmPassword?.message
                ? t(errors.confirmPassword.message)
                : undefined
            }
            label={t('auth.confirmPassword')}
            secureTextEntry
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />
      {errors.root?.message ? (
        <Text accessibilityRole="alert" tone="danger">
          {t(errors.root.message)}
        </Text>
      ) : null}
      <Button
        isDisabled={resetPassword.isPending}
        onPress={handleSubmit((values) => resetPassword.mutate(values))}
      >
        {resetPassword.isPending ? <ButtonSpinner /> : null}
        <ButtonText>{t('auth.resetPassword')}</ButtonText>
      </Button>
    </AuthShell>
  );
}
