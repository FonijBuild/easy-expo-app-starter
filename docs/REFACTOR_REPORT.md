# Refactor report

## Original project issues

The uploaded project was not only incomplete; several foundational paths were inconsistent or broken:

- Route files referenced missing feature screens and shared modules.
- Multiple tab routes were empty.
- Bootstrap and theme responsibilities were duplicated.
- The previous styling scan excluded most feature and route files.
- gluestack-ui existed as a provider shell rather than a source-owned component system.
- Persistence did not consistently validate stored values or guarantee bootstrap completion after storage errors.
- Authentication UI, schemas, repositories, and session handling were partially coupled and incomplete.
- Branding required scattered edits and had no reliable token synchronization.
- Documentation and agent instructions did not define enforceable architecture boundaries or a spec-driven workflow.

## Resulting architecture

The refactored project follows `app -> features -> shared`:

- `src/app` contains thin Expo Router declarations only.
- `src/features` contains vertical product capabilities and their public APIs.
- `src/shared` contains configuration, source-owned gluestack primitives, app-level UI patterns, providers, storage, API infrastructure, schemas, and small client stores.

Protected route groups model intro, authentication, onboarding, and authenticated application states. Server authorization remains mandatory.

## Major changes

- Rebuilt every route and common screen.
- Added email login, phone OTP login/registration, password reset, mock and remote repository adapters, secure native persistence, and expiry validation.
- Added dashboard, activity, profile/edit profile, settings, appearance, language, account, about, terms, privacy, intro, onboarding, and not-found flows.
- Replaced legacy presentation code with source-owned gluestack-ui components backed by NativeWind v5 and Tailwind v4.
- Added one brand source of truth plus generated semantic theme CSS.
- Added live English/Persian switching and logical RTL layout behavior.
- Added TanStack Query native focus management and a single query client lifecycle.
- Added strict environment validation, feature/screen generators, Vitest coverage for schemas/config invariants, CI workflows, EAS profiles, ADRs, specs, and comprehensive agent rules.

## Validation performed in this environment

- All 135 TypeScript/TSX files were parsed successfully with the TypeScript compiler API.
- Every local alias and relative import resolves.
- Layer dependency boundaries pass static checks.
- Every route has a default export.
- English and Persian have 136 identical translation keys, and direct translation calls reference existing keys.
- JSON files parse successfully.
- `git diff --check` reports no whitespace errors.

A full dependency install, Expo runtime launch, lint, typecheck, and Vitest run could not be executed because the sandbox could not resolve `registry.npmjs.org` (`EAI_AGAIN`). Run `pnpm install && pnpm check` in a networked environment before publishing the template.

## Integration work intentionally left to each product

- Replace placeholder legal text with reviewed product-specific documents.
- Connect remote auth endpoints and implement single-flight refresh-token rotation.
- Add real dashboard/domain queries and mutation behavior.
- Replace demo assets and identifiers.
- Add analytics, crash reporting, notifications, deep-link contracts, and product-specific authorization only when required by the target app.
