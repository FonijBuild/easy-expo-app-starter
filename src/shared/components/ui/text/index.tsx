import { tva, type VariantProps } from '@gluestack-ui/utils/nativewind-utils';
import React from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

const textStyle = tva({
  base: 'font-sans text-foreground',
  variants: {
    size: {
      xs: 'text-xs leading-4',
      sm: 'text-sm leading-5',
      md: 'text-base leading-6',
      lg: 'text-lg leading-7',
      xl: 'text-xl leading-7',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    tone: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      danger: 'text-destructive',
      success: 'text-success',
      inverse: 'text-primary-foreground',
    },
  },
  defaultVariants: { size: 'md', weight: 'normal', tone: 'default' },
});

export type TextProps = RNTextProps & VariantProps<typeof textStyle> & { className?: string };

export const Text = React.forwardRef<RNText, TextProps>(
  ({ className, size, weight, tone, ...props }, ref) => (
    <RNText ref={ref} className={textStyle({ size, weight, tone, class: className })} {...props} />
  ),
);
Text.displayName = 'Text';
