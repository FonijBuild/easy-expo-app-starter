import React from 'react';
import { View, type ViewProps } from 'react-native';
import { cn } from '@/shared/lib/cn';

export type CardProps = ViewProps & { className?: string };
export const Card = React.forwardRef<View, CardProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('rounded-2xl border border-border bg-card p-4', className)} {...props} />
));
Card.displayName = 'Card';
