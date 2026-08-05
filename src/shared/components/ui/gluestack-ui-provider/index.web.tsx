import { OverlayProvider } from '@gluestack-ui/core/overlay/creator';
import { ToastProvider } from '@gluestack-ui/core/toast/creator';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { View, type ViewProps } from 'react-native';
export type ColorMode = 'light' | 'dark' | 'system';

type Props = PropsWithChildren<{
  mode?: ColorMode;
  style?: ViewProps['style'];
}>;

export function GluestackUIProvider({ children, mode = 'system', style }: Props) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');

    if (mode !== 'system') {
      root.classList.add(mode);
    }

    return () => {
      root.classList.remove('light', 'dark');
    };
  }, [mode]);

  return (
    <View style={[{ flex: 1, width: '100%', height: '100%' }, style]}>
      <OverlayProvider>
        <ToastProvider>{children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
}
