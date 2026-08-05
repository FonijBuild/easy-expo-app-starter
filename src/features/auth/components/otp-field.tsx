import { Input, InputField, Text, VStack } from '@/shared/components/ui';
import { appConfig } from '@/shared/config';

type OtpFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
  label: string;
};

export function OtpField({ value, onChangeText, error, label }: OtpFieldProps) {
  return (
    <VStack space="xs">
      <Input isInvalid={Boolean(error)} size="lg">
        <InputField
          accessibilityLabel={label}
          autoComplete="sms-otp"
          className="text-center text-2xl font-bold tracking-[10px]"
          inputMode="numeric"
          keyboardType="number-pad"
          maxLength={appConfig.auth.otpLength}
          textContentType="oneTimeCode"
          value={value}
          onChangeText={(nextValue) =>
            onChangeText(nextValue.replace(/\D/g, '').slice(0, appConfig.auth.otpLength))
          }
        />
      </Input>
      {error ? (
        <Text accessibilityRole="alert" size="xs" tone="danger">
          {error}
        </Text>
      ) : null}
    </VStack>
  );
}
