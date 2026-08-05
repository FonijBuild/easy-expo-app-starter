# Configuration and branding

## Single source of truth for the brand

Edit `src/shared/config/brand-config.ts` for:

- Product name, short name, tagline, support address, and website
- Semantic light and dark color tokens
- The default sans-serif font stack

Then run:

```bash
pnpm theme:sync
```

This generates `src/global.css`. Do not edit that generated file by hand. `pnpm theme:check` fails when the generated CSS is stale, and `postinstall` regenerates it automatically.

React Navigation colors and component colors both consume the same `brandConfig`, so a rebrand does not require duplicated color edits.

## Product behavior

Edit `src/shared/config/app-config.ts` for feature flags, supported languages, RTL languages, mock credentials, layout limits, and legal metadata.

Keep at least one authentication method enabled. The tests enforce this invariant.

## Assets

Logo rendering mode is configured in `brandConfig.logo`. Static image references live in `src/shared/config/brand-assets.ts` so Metro can resolve them at build time. Use `monogram` for the generated letter mark or `image` for the provided light/dark assets.

Replace the files under `assets/images` while preserving paths, or update `app.config.ts` when paths change. Verify adaptive Android layers, monochrome icons, iOS icon appearance, splash contrast, and the web favicon.

## App identifiers

Copy `.env.example` to `.env` and set:

- `EXPO_PUBLIC_APP_NAME`
- `EXPO_PUBLIC_APP_SLUG`
- `EXPO_PUBLIC_APP_SCHEME`
- `EXPO_PUBLIC_IOS_BUNDLE_ID`
- `EXPO_PUBLIC_ANDROID_PACKAGE`

Public Expo variables are embedded in the client bundle. Never place secrets in them.

## Feature flags

Flags control starter-level optional flows. A production remote flag system should define typed defaults and distinguish build-time, startup-time, and user-targeted flags. Sensitive authorization must never depend only on client flags.

## Adding a language

1. Add an entry to `languageOptions` with its code, translated label key, native label, and RTL flag.
2. Copy an existing locale JSON and preserve the full key shape.
3. Register the locale resource in `src/shared/i18n/i18n.ts`.
4. Test text expansion, fonts, dates/numbers, navigation labels, and keyboard behavior.

## Adding fonts

Place font files under `assets/fonts`, load them during bootstrap with `expo-font`, keep the splash screen visible until loading finishes, and update `brandConfig.typography.sans`. Run `pnpm theme:sync` afterward. Validate every supported script and weight on Android, iOS, and web.
