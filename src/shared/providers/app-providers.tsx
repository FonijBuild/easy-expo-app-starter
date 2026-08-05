import { GluestackUIProvider } from '@/shared/components/ui';
import { navigationThemes } from '@/shared/config';
import { useAppBootstrap, useAppDirection, useResolvedTheme } from '@/shared/hooks';
import { createQueryClient } from '@/shared/query-client';
import { useThemeStore } from '@/shared/stores';
import { focusManager, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import { AppState, type AppStateStatus, Platform, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function useNativeQueryFocus() {
  useEffect(() => {
    if (Platform.OS === 'web') return;

    const updateFocus = (status: AppStateStatus) => {
      focusManager.setFocused(status === 'active');
    };

    updateFocus(AppState.currentState);
    const subscription = AppState.addEventListener('change', updateFocus);
    return () => subscription.remove();
  }, []);
}

export function AppProviders({ children }: PropsWithChildren) {
  const isReady = useAppBootstrap();
  const [queryClient] = useState(createQueryClient);
  const { direction } = useAppDirection();
  const { theme, isDark } = useResolvedTheme();
  const themePreference = useThemeStore((state) => state.preference);

  useNativeQueryFocus();

  useEffect(() => {
    if (isReady) void SplashScreen.hideAsync();
  }, [isReady]);

  if (!isReady) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <GluestackUIProvider mode={themePreference}>
            <ThemeProvider value={navigationThemes[theme]}>
              <StatusBar style={isDark ? 'light' : 'dark'} />
              <View style={{ flex: 1, direction }}>{children}</View>
            </ThemeProvider>
          </GluestackUIProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
