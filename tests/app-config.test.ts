import { describe, expect, it } from 'vitest';

import { appConfig } from '@/shared/config/app-config';
import { brandConfig } from '@/shared/config/brand-config';

describe('app configuration', () => {
  it('keeps at least one authentication method enabled', () => {
    expect(
      appConfig.features.emailAuth || appConfig.features.phoneAuth,
    ).toBe(true);
  });

  it('uses identical semantic color keys in both themes', () => {
    expect(Object.keys(brandConfig.colors.dark).sort()).toEqual(
      Object.keys(brandConfig.colors.light).sort(),
    );
  });

  it('defines the default locale as a supported locale', () => {
    expect(
      appConfig.localization.languages.map(({ code }) => code),
    ).toContain(appConfig.localization.defaultLanguage);
  });
});
