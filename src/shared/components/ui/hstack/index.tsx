import { tva, type VariantProps } from '@gluestack-ui/utils/nativewind-utils';
import React from 'react';
import { View, type ViewProps } from 'react-native';

const stackStyle = tva({
  base: 'flex-row items-center',
  variants: {
    space: {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
      xl: 'gap-6',
    },
    reversed: {
      true: 'flex-row-reverse',
    },
  },
});

export type HStackProps = ViewProps &
  VariantProps<typeof stackStyle> & { className?: string };

export const HStack = React.forwardRef<View, HStackProps>(
  ({ space, reversed, className, ...props }, ref) => (
    <View
      ref={ref}
      className={stackStyle({ space, reversed, class: className })}
      {...props}
    />
  ),
);
HStack.displayName = 'HStack';
