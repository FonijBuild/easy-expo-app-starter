# Testing

## Current baseline

Vitest covers pure TypeScript schemas and business logic. Run:

```bash
pnpm test
```

## Recommended next layers

- React Native Testing Library for forms, loading/error states, and accessibility queries.
- MSW or repository fakes for deterministic network behavior.
- Maestro for cross-platform smoke flows.
- EAS preview builds for device verification.

## Release matrix

At minimum verify:

- Android, iOS, and web
- light, dark, and system themes
- English LTR and Persian RTL
- intro first run and returning user
- email login, phone login, registration/onboarding, reset, logout
- narrow phone, tablet/wide web, keyboard open, offline/server error
- screen reader labels, focus order, text scaling, touch targets
