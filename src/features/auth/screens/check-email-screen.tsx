import { Button, ButtonText, Card, Text } from '@/shared/components/ui';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { AuthShell } from '../components/auth-shell';

export function CheckEmailScreen() {
  const { t } = useTranslation();

  return (
    <AuthShell
      title={t('auth.checkEmailTitle')}
      description={t('auth.checkEmailDescription')}
    >
      <Card>
        <Text tone="muted">{t('auth.checkEmailDescription')}</Text>
      </Card>
      <Link href="/(auth)/login-email" asChild>
        <Button>
          <ButtonText>{t('auth.backToLogin')}</ButtonText>
        </Button>
      </Link>
    </AuthShell>
  );
}
