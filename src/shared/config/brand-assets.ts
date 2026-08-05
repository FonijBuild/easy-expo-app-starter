import type { ImageSource } from 'expo-image';

/**
 * Metro requires static image references. Replace these files when rebranding,
 * or update the static imports here if your asset names change.
 */
export const brandAssets = {
  logo: require('../../../assets/images/icon.png') as ImageSource,
  logoDark: require('../../../assets/images/icon.png') as ImageSource,
} as const;
