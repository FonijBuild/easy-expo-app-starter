# Easy Starter React Native App

A configurable Expo starter for Android, iOS, and web, built with Expo Router, gluestack-ui v5, NativeWind v5, TypeScript, TanStack Query, Zustand, React Hook Form, Zod, and i18next.

> **NativeWind status:** v5 is consumed from its `preview` tag because this variant explicitly targets the latest gluestack + NativeWind/Tailwind v4 integration. See `docs/adr/0002-nativewind-v5.md` before production release.

## Included

- First-launch intro and authenticated onboarding
- Email login, phone OTP login/registration, password reset, and mock/remote auth adapters
- Protected Expo Router route groups and tab navigation
- Dashboard, activity, profile, appearance, language, account, about, and legal screens
- Light, dark, and system themes
- English and Persian with live LTR/RTL layout direction
- Secure native session storage and non-sensitive preference storage
- Source-owned gluestack components in `src/shared/ui`
- Single-source brand tokens that generate Tailwind v4 CSS
- Feature generators, tests, CI, EAS profiles, architecture docs, specs, and agent rules

## Quick start

```bash
corepack enable
cp .env.example .env
pnpm install
pnpm check
pnpm dev
```

The first install creates `pnpm-lock.yaml`. Commit that lockfile before publishing the template, and then change CI installs to `pnpm install --frozen-lockfile`.

Mock credentials:

```text
Email: demo@example.com
Password: password123
OTP: 123456
```

## Quality checks

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm format:check
pnpm theme:check
pnpm check
```

## Customize a new app

1. Edit brand metadata, logo mode, typography, and semantic colors in `src/shared/config/brand-config.ts`, then run `pnpm theme:sync`. Replace static logo files through `src/shared/config/brand-assets.ts`.
2. Edit feature flags, languages, mock auth values, layout, and legal metadata in `src/shared/config/app-config.ts`.
3. Replace images under `assets/images` and update `app.config.ts` when paths change.
4. Replace copy in `src/shared/i18n/locales/en.json` and other locale files.
5. Set package identifiers and public environment values in `.env`.
6. Replace legal placeholders before release.
7. Switch `EXPO_PUBLIC_API_MODE=remote` and implement your backend contract.

Read `AGENTS.md` before agent-driven changes and start feature work from `specs/README.md`.

## Architecture

```text
src/app       Route declarations and navigation composition only
src/features  Vertical product capabilities
src/shared    Design system, configuration, providers, storage, API, and reusable code
```

See `docs/ARCHITECTURE.md`, `docs/CONFIGURATION.md`, `docs/AUTHENTICATION.md`, `docs/GLUESTACK-UI.md`, `docs/NATIVEWIND-V5.md`, and `docs/REWRITE_REPORT.md`.

## Static web export

```bash
pnpm build:web
```

The export is written to `dist/`. A production Nginx container is included:

```bash
docker compose up --build
```
