import React from 'react';
import { View, type ViewProps } from 'react-native';
import { cn } from '@/shared/lib/cn';

export type DividerProps = ViewProps & { className?: string };

export const Divider = React.forwardRef<View, DividerProps>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn('h-px w-full bg-border', className)}
      {...props}
    />
  ),
);
Divider.displayName = 'Divider';
