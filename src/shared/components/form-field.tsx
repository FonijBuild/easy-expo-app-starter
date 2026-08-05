import { Input, InputField, Text, VStack } from '@/shared/components/ui';
import type { ComponentProps } from 'react';

type FormFieldProps = ComponentProps<typeof InputField> & {
  label: string;
  error?: string;
  required?: boolean;
  containerClassName?: string;
};

export function FormField({
  label,
  error,
  required,
  containerClassName,
  ...props
}: FormFieldProps) {
  return (
    <VStack space="xs" className={containerClassName}>
      <Text size="sm" weight="medium">
        {label}
        {required ? ' *' : ''}
      </Text>
      <Input isInvalid={Boolean(error)}>
        <InputField accessibilityLabel={label} {...props} />
      </Input>
      {error ? (
        <Text accessibilityRole="alert" size="xs" tone="danger">
          {error}
        </Text>
      ) : null}
    </VStack>
  );
}
