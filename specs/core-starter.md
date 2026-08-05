# Feature: Core starter foundation

- Status: implemented
- Last updated: 2026-08-05

## Outcome

A new branded app can begin from a working universal Expo foundation rather than rebuilding common navigation, authentication, onboarding, settings, themes, and localization.

## Acceptance criteria

- [x] Runs through Expo Router on Android, iOS, and web.
- [x] Uses `app`, `features`, and `shared` layers with documented dependency direction.
- [x] Uses source-owned gluestack UI components with NativeWind v5 preview/Tailwind v4 styling behind the shared UI boundary.
- [x] Supports system/light/dark preferences.
- [x] Supports English and Persian with immediate direction changes.
- [x] Provides mock and remote authentication repositories.
- [x] Protects auth, onboarding, and app route groups.
- [x] Persists native sessions securely and preferences separately.
- [x] Includes dashboard, activity, profile, settings, and legal screens.
- [x] Includes environment validation, generators, tests, CI, EAS profiles, docs, and agent instructions.

## Remaining production integration

- Connect a real backend and implement refresh-token coordination.
- Replace placeholder legal copy and account deletion behavior.
- Add component and end-to-end test tooling.
- Generate and commit the lockfile after dependency installation.
- Configure EAS project ID, credentials, secrets, monitoring, and analytics.
