import React from 'react';
import { Pressable as RNPressable, type PressableProps as RNPressableProps, type View } from 'react-native';

export type PressableProps = RNPressableProps & { className?: string };
export const Pressable = React.forwardRef<View, PressableProps>(({ className, ...props }, ref) => (
  <RNPressable ref={ref} className={className} {...props} />
));
Pressable.displayName = 'Pressable';
