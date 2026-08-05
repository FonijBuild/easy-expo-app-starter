import {
  Button,
  ButtonSpinner,
  ButtonText,
  Card,
  Text,
  VStack,
} from '@/shared/components/ui';
import { appConfig } from '@/shared/config';
import { getSingleRouteParam } from '@/shared/lib/route-params';
import { useSessionStore } from '@/shared/stores';
import { useMutation } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { authRepository, isMockAuth } from '../api/auth.repository';
import type { OtpPurpose } from '../api/auth.types';
import { AuthShell } from '../components/auth-shell';
import { OtpField } from '../components/otp-field';
import { authErrorKey } from '../lib/auth-error';

type OtpRouteParams = {
  challengeId?: string | string[];
  phone?: string | string[];
  purpose?: OtpPurpose | OtpPurpose[];
  resendAfter?: string | string[];
};

export function VerifyOtpScreen() {
  const { t } = useTranslation();
  const params = useLocalSearchParams<OtpRouteParams>();
  const setSession = useSessionStore((state) => state.setSession);
  const [code, setCode] = useState('');
  const resendAfter = Number(getSingleRouteParam(params.resendAfter));
  const [seconds, setSeconds] = useState(
    Number.isFinite(resendAfter) && resendAfter >= 0 ? resendAfter : 30,
  );
  const [error, setError] = useState<string>();

  const challengeId = getSingleRouteParam(params.challengeId) ?? '';
  const phone = getSingleRouteParam(params.phone) ?? '';
  const purposeParam = getSingleRouteParam(params.purpose);
  const purpose: OtpPurpose = purposeParam === 'register' ? 'register' : 'login';

  useEffect(() => {
    if (seconds <= 0) return;
    const timeoutId = setTimeout(
      () => setSeconds((value) => Math.max(0, value - 1)),
      1_000,
    );
    return () => clearTimeout(timeoutId);
  }, [seconds]);

  const verifyOtp = useMutation({
    mutationFn: () => authRepository.verifyOtp({ challengeId, code, purpose }),
    onSuccess: async (session) => {
      await setSession(session);
      router.replace('/');
    },
    onError: (mutationError) => setError(t(authErrorKey(mutationError))),
  });

  const resendOtp = useMutation({
    mutationFn: () => authRepository.requestOtp({ phone, purpose }),
    onSuccess: (result) => {
      router.setParams({ challengeId: result.challengeId });
      setSeconds(result.resendAfterSeconds);
      setCode('');
      setError(undefined);
    },
    onError: (mutationError) => setError(t(authErrorKey(mutationError))),
  });

  const routeIsValid = Boolean(
    challengeId && phone && (purposeParam === 'login' || purposeParam === 'register'),
  );

  return (
    <AuthShell
      title={t('auth.verifyTitle')}
      description={t('auth.verifyDescription', {
        length: appConfig.auth.otpLength,
        phone,
      })}
    >
      <OtpField
        error={error}
        label={t('auth.verifyTitle')}
        value={code}
        onChangeText={(value) => {
          setCode(value);
          setError(undefined);
        }}
      />

      {isMockAuth ? (
        <Card>
          <Text size="sm" tone="muted" className="text-center">
            {t('auth.mockHint', { code: appConfig.auth.mockOtp })}
          </Text>
        </Card>
      ) : null}

      <VStack space="sm">
        <Button
          isDisabled={
            !routeIsValid ||
            code.length !== appConfig.auth.otpLength ||
            verifyOtp.isPending
          }
          onPress={() => verifyOtp.mutate()}
        >
          {verifyOtp.isPending ? <ButtonSpinner /> : null}
          <ButtonText>{t('auth.verify')}</ButtonText>
        </Button>
        <Button
          variant="link"
          isDisabled={!routeIsValid || seconds > 0 || resendOtp.isPending}
          onPress={() => resendOtp.mutate()}
        >
          <ButtonText>
            {seconds > 0 ? t('auth.resendIn', { seconds }) : t('auth.resend')}
          </ButtonText>
        </Button>
      </VStack>
    </AuthShell>
  );
}
