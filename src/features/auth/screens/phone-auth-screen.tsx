import { FormField } from '@/shared/components';
import { Button, ButtonSpinner, ButtonText, Text } from '@/shared/components/ui';
import { appConfig } from '@/shared/config';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { authRepository } from '../api/auth.repository';
import type { OtpPurpose } from '../api/auth.types';
import { AuthShell } from '../components/auth-shell';
import { authErrorKey } from '../lib/auth-error';
import { phoneSchema, type PhoneValues } from '../model/auth.schemas';

export function PhoneAuthScreen({ purpose }: { purpose: OtpPurpose }) {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PhoneValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: appConfig.auth.mockPhone },
  });

  const requestOtp = useMutation({
    mutationFn: authRepository.requestOtp,
    onSuccess: (result, values) => {
      router.push({
        pathname: '/(auth)/verify-otp',
        params: {
          challengeId: result.challengeId,
          phone: values.phone,
          purpose,
          resendAfter: String(result.resendAfterSeconds),
        },
      });
    },
    onError: (error) => setError('root', { message: authErrorKey(error) }),
  });

  const title = purpose === 'register' ? t('auth.createAccount') : t('auth.phoneLogin');

  return (
    <AuthShell title={title} description={t('auth.welcomeDescription')}>
      <Controller
        control={control}
        name="phone"
        render={({ field }) => (
          <FormField
            autoComplete="tel"
            error={errors.phone?.message ? t(errors.phone.message) : undefined}
            keyboardType="phone-pad"
            label={t('auth.phone')}
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
      <Button
        isDisabled={requestOtp.isPending}
        onPress={handleSubmit((values) => requestOtp.mutate({ ...values, purpose }))}
      >
        {requestOtp.isPending ? <ButtonSpinner /> : null}
        <ButtonText>{t('auth.sendCode')}</ButtonText>
      </Button>
    </AuthShell>
  );
}
