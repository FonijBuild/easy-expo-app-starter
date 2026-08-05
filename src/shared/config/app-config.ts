import { brandConfig } from './brand-config';

export const languageOptions = [
  {
    code: 'en',
    labelKey: 'settings.english',
    nativeLabel: 'English',
    rtl: false,
  },
  {
    code: 'fa',
    labelKey: 'settings.persian',
    nativeLabel: 'فارسی',
    rtl: true,
  },
] as const;

export type SupportedLanguage = (typeof languageOptions)[number]['code'];

export const appConfig = {
  brand: brandConfig,
  features: {
    intro: true,
    emailAuth: true,
    phoneAuth: true,
    registration: true,
    activityTab: true,
    profile: true,
  },
  localization: {
    defaultLanguage: 'en' satisfies SupportedLanguage,
    languages: languageOptions,
  },
  auth: {
    otpLength: 6,
    mockOtp: '123456',
    mockEmail: 'demo@example.com',
    mockPhone: '+989121234567',
    mockPassword: 'password123',
    mockResetToken: 'mock-reset-token',
  },
  layout: {
    maxContentWidth: 720,
  },
  legal: {
    lastUpdated: '2026-08-04',
  },
} as const;
