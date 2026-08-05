/**
 * Brand source of truth.
 *
 * Update this file when starting a new product, then run `pnpm theme:sync`.
 * The generated `src/global.css` must not be edited by hand.
 */
export type SemanticColorTokens = {
  background: string;
  foreground: string;
  surface: string;
  surfaceMuted: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
};

type BrandDefinition = {
  name: string;
  shortName: string;
  tagline: string;
  supportEmail: string;
  websiteUrl: string;
  typography: { sans: string };
  logo: { mode: 'monogram' | 'image'; rounded: boolean };
  colors: Record<'light' | 'dark', SemanticColorTokens>;
};

export const brandConfig = {
  name: 'Easy Starter',
  shortName: 'ES',
  tagline: 'A production-ready starting point for your next app.',
  supportEmail: 'support@example.com',
  websiteUrl: 'https://example.com',
  typography: {
    sans:
      "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  logo: {
    mode: 'monogram',
    rounded: true,
  },
  colors: {
    light: {
      background: '#F8FAFC',
      foreground: '#0F172A',
      surface: '#FFFFFF',
      surfaceMuted: '#F1F5F9',
      card: '#FFFFFF',
      cardForeground: '#0F172A',
      primary: '#4F46E5',
      primaryForeground: '#FFFFFF',
      secondary: '#E2E8F0',
      secondaryForeground: '#1E293B',
      muted: '#F1F5F9',
      mutedForeground: '#64748B',
      accent: '#EEF2FF',
      accentForeground: '#4338CA',
      success: '#16A34A',
      successForeground: '#FFFFFF',
      warning: '#D97706',
      warningForeground: '#FFFFFF',
      destructive: '#DC2626',
      destructiveForeground: '#FFFFFF',
      border: '#E2E8F0',
      input: '#E2E8F0',
      ring: '#6366F1',
    },
    dark: {
      background: '#020617',
      foreground: '#F1F5F9',
      surface: '#0F172A',
      surfaceMuted: '#1E293B',
      card: '#0F172A',
      cardForeground: '#F1F5F9',
      primary: '#818CF8',
      primaryForeground: '#0F172A',
      secondary: '#1E293B',
      secondaryForeground: '#E2E8F0',
      muted: '#1E293B',
      mutedForeground: '#94A3B8',
      accent: '#312E81',
      accentForeground: '#E0E7FF',
      success: '#4ADE80',
      successForeground: '#052E16',
      warning: '#FBBF24',
      warningForeground: '#451A03',
      destructive: '#F87171',
      destructiveForeground: '#450A0A',
      border: '#334155',
      input: '#334155',
      ring: '#A5B4FC',
    },
  },
} as const satisfies BrandDefinition;

export type BrandConfig = typeof brandConfig;
export type BrandColorScheme = keyof BrandConfig['colors'];
export type BrandColorToken = keyof BrandConfig['colors']['light'];
