import React from 'react';
import type { PropsWithChildren } from 'react';
import { View, type ViewProps } from 'react-native';
import { cn } from '@/shared/lib/cn';
export function Badge({ className, ...props }: PropsWithChildren<ViewProps & { className?: string }>) {
  return <View className={cn('self-start rounded-full bg-accent px-2.5 py-1', className)} {...props} />;
}
