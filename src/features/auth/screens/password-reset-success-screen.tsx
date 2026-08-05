import { Button, ButtonText } from '@/shared/components/ui';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { AuthShell } from '../components/auth-shell';

export function PasswordResetSuccessScreen() {
  const { t } = useTranslation();

  return (
    <AuthShell
      title={t('auth.resetSuccessTitle')}
      description={t('auth.resetSuccessDescription')}
    >
      <Link href="/(auth)/login-email" asChild>
        <Button>
          <ButtonText>{t('auth.backToLogin')}</ButtonText>
        </Button>
      </Link>
    </AuthShell>
  );
}
