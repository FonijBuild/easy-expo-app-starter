import { tva, type VariantProps } from '@gluestack-ui/utils/nativewind-utils';
import React from 'react';
import { Text, type TextProps } from 'react-native';

const headingStyle = tva({
  base: 'font-sans font-bold tracking-tight text-foreground',
  variants: {
    size: {
      sm: 'text-lg leading-7',
      md: 'text-xl leading-8',
      lg: 'text-2xl leading-9',
      xl: 'text-3xl leading-10',
      '2xl': 'text-4xl leading-[48px]',
    },
  },
  defaultVariants: { size: 'lg' },
});

export type HeadingProps = TextProps &
  VariantProps<typeof headingStyle> & { className?: string };

export const Heading = React.forwardRef<Text, HeadingProps>(
  ({ size, className, ...props }, ref) => (
    <Text
      ref={ref}
      accessibilityRole="header"
      className={headingStyle({ size, class: className })}
      {...props}
    />
  ),
);
Heading.displayName = 'Heading';
