import type { ConfigContext, ExpoConfig } from 'expo/config';

const APP_NAME = process.env.EXPO_PUBLIC_APP_NAME ?? 'Easy Starter';
const APP_SLUG =
  process.env.EXPO_PUBLIC_APP_SLUG ?? 'easy-starter-react-native-app';
const APP_SCHEME = process.env.EXPO_PUBLIC_APP_SCHEME ?? 'easy-starter';
const IOS_BUNDLE_ID =
  process.env.EXPO_PUBLIC_IOS_BUNDLE_ID ?? 'dev.easystarter.app';
const ANDROID_PACKAGE =
  process.env.EXPO_PUBLIC_ANDROID_PACKAGE ?? 'dev.easystarter.app';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: APP_NAME,
  slug: APP_SLUG,
  scheme: APP_SCHEME,
  version: '1.0.0',
  orientation: 'default',
  userInterfaceStyle: 'automatic',
  icon: './assets/images/icon.png',
  plugins: [
    'expo-router',
    'expo-localization',
    'expo-system-ui',
    [
      'expo-secure-store',
      {
        configureAndroidBackup: true,
      },
    ],
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 160,
        resizeMode: 'contain',
        backgroundColor: '#F8FAFC',
        dark: {
          image: './assets/images/splash-icon.png',
          backgroundColor: '#020617',
        },
      },
    ],
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: IOS_BUNDLE_ID,
  },
  android: {
    package: ANDROID_PACKAGE,
    adaptiveIcon: {
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundImage: './assets/images/android-icon-background.png',
      monochromeImage: './assets/images/android-icon-monochrome.png',
    },
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  experiments: {
    typedRoutes: true,
  },
  extra: {
    supportsRTL: true,
  },
});
