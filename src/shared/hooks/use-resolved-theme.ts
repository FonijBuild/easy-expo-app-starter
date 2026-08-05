import { useColorScheme } from 'react-native';
import { appConfig } from '@/shared/config/app-config';
import { useThemeStore } from '@/shared/stores/theme-store';

export function useResolvedTheme() {
  const systemTheme = useColorScheme();
  const preference = useThemeStore((state) => state.preference);
  const theme =
    preference === 'system' ? (systemTheme === 'dark' ? 'dark' : 'light') : preference;

  return {
    theme,
    isDark: theme === 'dark',
    colors: appConfig.brand.colors[theme],
  } as const;
}
