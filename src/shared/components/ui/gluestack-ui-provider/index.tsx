import { OverlayProvider } from '@gluestack-ui/core/overlay/creator';
import { ToastProvider } from '@gluestack-ui/core/toast/creator';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { Appearance, View, type ColorSchemeName, type ViewProps } from 'react-native';

export type ColorMode = 'light' | 'dark' | 'system';

type Props = PropsWithChildren<{
  mode?: ColorMode;
  style?: ViewProps['style'];
}>;

export function GluestackUIProvider({ children, mode = 'system', style }: Props) {
  useEffect(() => {
    Appearance.setColorScheme(mode === 'system' ? null : (mode as ColorSchemeName));
  }, [mode]);

  return (
    <View style={[{ flex: 1, width: '100%', height: '100%' }, style]}>
      <OverlayProvider>
        <ToastProvider>{children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
}
