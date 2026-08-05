import { DarkTheme, DefaultTheme } from 'expo-router';
import { appConfig } from './app-config';

export const navigationThemes = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: appConfig.brand.colors.light.background,
      card: appConfig.brand.colors.light.card,
      border: appConfig.brand.colors.light.border,
      primary: appConfig.brand.colors.light.primary,
      text: appConfig.brand.colors.light.foreground,
      notification: appConfig.brand.colors.light.primary,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: appConfig.brand.colors.dark.background,
      card: appConfig.brand.colors.dark.card,
      border: appConfig.brand.colors.dark.border,
      primary: appConfig.brand.colors.dark.primary,
      text: appConfig.brand.colors.dark.foreground,
      notification: appConfig.brand.colors.dark.primary,
    },
  },
} as const;
