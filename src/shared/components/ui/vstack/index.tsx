import { tva, type VariantProps } from '@gluestack-ui/utils/nativewind-utils';
import React from 'react';
import { View, type ViewProps } from 'react-native';

const stackStyle = tva({
  base: 'flex-col',
  variants: { space: { xs: 'gap-1', sm: 'gap-2', md: 'gap-3', lg: 'gap-4', xl: 'gap-6', '2xl': 'gap-8' } },
});
export type VStackProps = ViewProps & VariantProps<typeof stackStyle> & { className?: string };
export const VStack = React.forwardRef<View, VStackProps>(({ space, className, ...props }, ref) => (
  <View ref={ref} className={stackStyle({ space, class: className })} {...props} />
));
VStack.displayName = 'VStack';
