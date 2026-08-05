'use client';

import { UIIcon } from '@gluestack-ui/core/icon/creator';
import { createInput } from '@gluestack-ui/core/input/creator';
import {
  tva,
  withStyleContext,
  type VariantProps,
} from '@gluestack-ui/utils/nativewind-utils';
import React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { styled } from 'nativewind';
import { useResolvedTheme } from '@/shared/hooks';

const SCOPE = 'INPUT';
const Root = withStyleContext(View, SCOPE);
const StyledUIIcon = styled(UIIcon, { className: 'style' });
const UIInput = createInput({
  Root,
  Input: TextInput,
  Icon: StyledUIIcon,
  Slot: Pressable,
});

const inputStyle = tva({
  base: 'min-h-12 flex-row items-center rounded-xl border border-input bg-surface px-3 data-[focus=true]:border-ring data-[focus=true]:web:ring-2 data-[focus=true]:web:ring-ring/20 data-[disabled=true]:opacity-50',
  variants: {
    size: { sm: 'min-h-10', md: 'min-h-12', lg: 'min-h-14' },
    invalid: { true: 'border-destructive' },
  },
  defaultVariants: { size: 'md' },
});

const fieldStyle = tva({
  base: 'min-w-0 flex-1 font-sans text-base text-foreground outline-none placeholder:text-muted-foreground web:cursor-text',
});

type InputProps = Omit<
  React.ComponentPropsWithoutRef<typeof UIInput>,
  'context'
> &
  VariantProps<typeof inputStyle> & {
    className?: string;
    isInvalid?: boolean;
  };

export const Input = React.forwardRef<
  React.ElementRef<typeof UIInput>,
  InputProps
>(({ className, size = 'md', isInvalid = false, ...props }, ref) => (
  <UIInput
    ref={ref}
    className={inputStyle({ size, invalid: isInvalid, class: className })}
    context={{ size, isInvalid }}
    {...props}
  />
));
Input.displayName = 'Input';

type InputFieldProps = React.ComponentPropsWithoutRef<typeof UIInput.Input> & {
  className?: string;
};

export const InputField = React.forwardRef<
  React.ElementRef<typeof UIInput.Input>,
  InputFieldProps
>(({ className, placeholderTextColor, ...props }, ref) => {
  const { colors } = useResolvedTheme();
  return (
    <UIInput.Input
      ref={ref}
      className={fieldStyle({ class: className })}
      placeholderTextColor={placeholderTextColor ?? colors.mutedForeground}
      {...props}
    />
  );
});
InputField.displayName = 'InputField';

export const InputSlot = UIInput.Slot;
export const InputIcon = UIInput.Icon;
