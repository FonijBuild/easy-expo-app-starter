import React from 'react';
import { ActivityIndicator, type ActivityIndicatorProps } from 'react-native';
export const Spinner = React.forwardRef<ActivityIndicator, ActivityIndicatorProps>((props, ref) => (
  <ActivityIndicator ref={ref} accessibilityRole="progressbar" {...props} />
));
Spinner.displayName = 'Spinner';
