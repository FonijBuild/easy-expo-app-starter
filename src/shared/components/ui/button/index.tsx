'use client';

import { createButton } from '@gluestack-ui/core/button/creator';
import { UIIcon } from '@gluestack-ui/core/icon/creator';
import {
  tva,
  useStyleContext,
  withStyleContext,
  type VariantProps,
} from '@gluestack-ui/utils/nativewind-utils';
import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { styled } from 'nativewind';
import { useResolvedTheme } from '@/shared/hooks';

const SCOPE = 'BUTTON';
const Root = withStyleContext(Pressable, SCOPE);
const StyledUIIcon = styled(UIIcon, { className: 'style' });
const UIButton = createButton({
  Root,
  Text,
  Group: View,
  Spinner: ActivityIndicator,
  Icon: StyledUIIcon,
});

const buttonStyle = tva({
  base: 'min-h-12 flex-row items-center justify-center gap-2 rounded-xl px-4 data-[disabled=true]:opacity-50 data-[focus-visible=true]:web:ring-2 data-[focus-visible=true]:web:ring-ring',
  variants: {
    variant: {
      solid:
        'bg-primary data-[hover=true]:opacity-90 data-[active=true]:opacity-80',
      outline:
        'border border-border bg-background data-[hover=true]:bg-accent data-[active=true]:bg-accent',
      secondary:
        'bg-secondary data-[hover=true]:opacity-90 data-[active=true]:opacity-80',
      ghost:
        'bg-transparent data-[hover=true]:bg-accent data-[active=true]:bg-accent',
      destructive:
        'bg-destructive data-[hover=true]:opacity-90 data-[active=true]:opacity-80',
      link: 'min-h-0 bg-transparent px-0 py-0',
    },
    size: {
      sm: 'min-h-9 rounded-lg px-3',
      md: 'min-h-12 px-4',
      lg: 'min-h-14 px-6',
      icon: 'h-11 w-11 px-0',
    },
  },
  defaultVariants: { variant: 'solid', size: 'md' },
});

const buttonTextStyle = tva({
  base: 'font-sans font-semibold web:select-none',
  parentVariants: {
    variant: {
      solid: 'text-primary-foreground',
      outline: 'text-foreground',
      secondary: 'text-secondary-foreground',
      ghost: 'text-foreground',
      destructive: 'text-destructive-foreground',
      link: 'text-primary',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-base',
      icon: 'text-base',
    },
  },
});

const buttonIconStyle = tva({
  base: 'pointer-events-none h-5 w-5 shrink-0 fill-none',
  parentVariants: {
    variant: {
      solid: 'text-primary-foreground',
      outline: 'text-foreground',
      secondary: 'text-secondary-foreground',
      ghost: 'text-foreground',
      destructive: 'text-destructive-foreground',
      link: 'text-primary',
    },
  },
});

type ButtonProps = Omit<
  React.ComponentPropsWithoutRef<typeof UIButton>,
  'context'
> &
  VariantProps<typeof buttonStyle> & { className?: string };

export const Button = React.forwardRef<
  React.ElementRef<typeof UIButton>,
  ButtonProps
>(({ className, variant = 'solid', size = 'md', ...props }, ref) => (
  <UIButton
    ref={ref}
    className={buttonStyle({ variant, size, class: className })}
    context={{ variant, size }}
    {...props}
  />
));
Button.displayName = 'Button';

type ButtonTextProps = React.ComponentPropsWithoutRef<typeof UIButton.Text> & {
  className?: string;
};

export const ButtonText = React.forwardRef<
  React.ElementRef<typeof UIButton.Text>,
  ButtonTextProps
>(({ className, ...props }, ref) => {
  const { size, variant } = useStyleContext(SCOPE);
  return (
    <UIButton.Text
      ref={ref}
      className={buttonTextStyle({
        parentVariants: { size, variant },
        class: className,
      })}
      {...props}
    />
  );
});
ButtonText.displayName = 'ButtonText';

export const ButtonSpinner = React.forwardRef<
  React.ElementRef<typeof UIButton.Spinner>,
  React.ComponentPropsWithoutRef<typeof UIButton.Spinner>
>(({ color, ...props }, ref) => {
  const { variant } = useStyleContext(SCOPE);
  const { colors } = useResolvedTheme();
  const defaultColor =
    variant === 'solid'
      ? colors.primaryForeground
      : variant === 'destructive'
        ? colors.destructiveForeground
        : colors.foreground;

  return <UIButton.Spinner ref={ref} color={color ?? defaultColor} {...props} />;
});
ButtonSpinner.displayName = 'ButtonSpinner';

export const ButtonIcon = React.forwardRef<
  React.ElementRef<typeof UIButton.Icon>,
  React.ComponentPropsWithoutRef<typeof UIButton.Icon> & {
    className?: string;
    as?: React.ElementType;
  }
>(({ className, ...props }, ref) => {
  const { variant } = useStyleContext(SCOPE);
  return (
    <UIButton.Icon
      ref={ref}
      className={buttonIconStyle({
        parentVariants: { variant },
        class: className,
      })}
      {...props}
    />
  );
});
ButtonIcon.displayName = 'ButtonIcon';
