import React from 'react';
import { View, type ViewProps } from 'react-native';
import { cn } from '@/shared/lib/cn';

export type ProgressProps = ViewProps & {
  value: number;
  className?: string;
};

export function Progress({ value, className, ...props }: ProgressProps) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: safeValue }}
      className={cn(
        'h-2 overflow-hidden rounded-full bg-secondary',
        className,
      )}
      {...props}
    >
      <View
        className="h-full rounded-full bg-primary"
        style={{ width: `${safeValue}%` }}
      />
    </View>
  );
}
