import React from 'react';
import { View, type ViewProps } from 'react-native';

export type BoxProps = ViewProps & { className?: string };

export const Box = React.forwardRef<View, BoxProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={className} {...props} />
));
Box.displayName = 'Box';
