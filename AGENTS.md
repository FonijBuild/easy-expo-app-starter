# AGENTS.md

This is the canonical operating contract for coding agents in this repository. Read it before editing code. Repository-specific instructions override generic preferences.

## 1. Product intent

This repository is a reusable Expo application foundation, not a one-off demo. Changes must preserve:

- Android, iOS, and web support.
- Brand and feature configurability.
- English/Persian localization and LTR/RTL behavior.
- The `app` / `features` / `shared` dependency model.
- Mock mode for local development and a typed remote API boundary.
- Source-owned gluestack components rather than ad-hoc screen styling.

## 2. Required workflow

1. Read the active specification under `specs/` and relevant docs.
2. Inspect existing patterns before introducing a new abstraction.
3. State assumptions in the spec or implementation notes when requirements are incomplete.
4. Make the smallest coherent change that satisfies the acceptance criteria.
5. Add or update tests for behavior and schemas.
6. Update i18n resources for every user-facing string.
7. Run `pnpm check` and resolve failures.
8. Summarize changed behavior, files, validation, and remaining risks.

Do not claim a command passed unless it was actually run.

## 3. Layer boundaries

### `src/app`

Allowed:
- Expo Router route files and layouts.
- Route guards, redirects, route parameter extraction, and navigation options.
- Re-exporting or rendering feature screens.

Forbidden:
- API calls, form schemas, persistence, business rules, reusable UI, and feature state.

Route files should normally be one to ten lines.

### `src/features/<feature>`

A feature owns its screens, feature components, API contracts, model/schema code, and feature-specific hooks. Suggested folders:

```text
api/
components/
hooks/
model/
screens/
index.ts
```

- Import another feature only through its public `index.ts`, and only when the domain relationship is intentional.
- Prefer moving genuinely cross-feature primitives to `shared` instead of creating circular dependencies.
- Do not export internal implementation details without a consumer.

### `src/shared`

Shared contains product-agnostic or cross-feature foundations:
- `api`: transport and shared API errors.
- `components`: composed reusable application components.
- `config`: brand, feature flags, environment parsing, navigation themes.
- `hooks`: cross-feature hooks.
- `i18n`: initialization and locale resources.
- `lib`: small focused utilities and persistence adapters.
- `model`: cross-feature schemas/types.
- `providers`: root composition.
- `stores`: durable global app state only.
- `ui`: source-owned gluestack primitives.

Shared must never import from `features` or `app`.

## 4. Dependency direction

```text
app -> features -> shared
app -----------> shared
shared -X-> features
shared -X-> app
```

Use a repository/interface boundary for backend-dependent behavior. Screens call repositories through TanStack Query mutations/queries rather than calling `fetch` directly.

## 5. UI and gluestack rules

- Screens import primitives from `@/shared/ui`; do not build screens directly from raw React Native primitives except for platform APIs with no design-system equivalent.
- Reusable gluestack source lives in `src/shared/ui` and is owned by this repository.
- Use semantic classes: `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`, and `bg-primary`.
- Never place brand hex colors in feature screens.
- Static visual styles use `className`; runtime-computed values may use `style`.
- Use NativeWind v5 for Tailwind v4 compilation. Theme preference is applied through React Native Appearance. Do not add UniWind alongside it.
- Keep each gluestack primitive in `src/shared/ui/<component>/index.tsx`; the provider path is how the single-app CLI discovers the output directory.
- Third-party components that need `className` must be wrapped once with NativeWind `styled` at module scope.
- Every reusable component forwards relevant props, accessibility props, and `className` where appropriate.
- Touch targets should be at least 44x44 points for primary interactive controls.
- Test light/dark, narrow/wide, English/Persian, keyboard, and screen-reader behavior.

## 6. Branding and configuration

- Brand metadata, typography, and semantic light/dark tokens live in `src/shared/config/brand-config.ts`.
- Feature flags, supported languages, auth demo values, layout, and legal metadata live in `src/shared/config/app-config.ts`.
- `src/global.css` is generated. Never edit it directly; run `pnpm theme:sync`.
- App identifiers and build metadata live in `app.config.ts` and environment variables.
- Image assets live under `assets/`; do not import remote logos as a default.
- A feature flag must hide navigation entry points and protect deep links where access would otherwise be invalid.
- Run `pnpm theme:check` before finishing any brand or token change.

## 7. Localization and RTL

- Every user-facing sentence, label, error, accessibility label, and empty state must use i18n.
- Add the same key shape to every locale in the same change.
- Do not concatenate translated fragments when interpolation can express the sentence.
- Use logical layout behavior and the app direction hook; avoid manually reversing every component.
- Do not force a full app reload just to change language unless a native API truly requires it.
- Dates, numbers, and currencies should use locale-aware formatters when product data is introduced.

## 8. State and data

- TanStack Query owns server state.
- Zustand owns small cross-feature client state such as session/bootstrap preferences.
- Component-local state stays local.
- React Hook Form owns form state; Zod owns runtime validation.
- Do not duplicate the same server object in Query cache and Zustand.
- Store access/refresh tokens only in the secure storage adapter on native. Web storage is not equivalent to native secure storage; document the production web auth strategy.
- AsyncStorage is for non-sensitive preferences and cached profile display data.
- Never log passwords, OTPs, access tokens, refresh tokens, reset tokens, or personal data.

## 9. Authentication and security

Client validation improves UX but is not a security boundary. The backend must enforce:

- Password policy and credential verification.
- OTP expiration, attempt limits, replay prevention, resend throttling, and rate limiting.
- Generic forgot-password responses to prevent account enumeration.
- Refresh-token rotation/revocation and access-token expiry.
- Recent authentication for account deletion or sensitive changes.
- Authorization for every protected resource.

The mock repository must implement the same interface as the remote repository and remain deterministic enough for tests.

## 10. Expo Router

- Use protected routes for authentication/onboarding boundaries.
- Keep a single root redirect that derives the correct landing destination from hydrated state.
- Dynamic routes validate and normalize route params before passing them to features.
- Do not use navigation as the only authorization control; the server remains authoritative.
- Route groups organize files but must not leak into public URL expectations.

## 11. Error handling

- Convert transport failures into typed `ApiError` values at the shared API boundary.
- Map API error codes to i18n keys in feature code.
- Show actionable, non-sensitive messages.
- Preserve the original cause for diagnostics without displaying raw server errors to users.
- Bootstrap persistence failures should fall back safely and finish hydration rather than hanging the splash screen.

## 12. Performance

- Avoid global state subscriptions to values a component does not render.
- Keep Query keys stable and colocated with their feature.
- Memoize only after measuring or when referential stability is required by an API.
- Use lists (`FlatList`/`FlashList` when added) for unbounded collections; do not render large arrays in `ScrollView`.
- Keep images sized and cached appropriately.
- Do not add a dependency for a trivial utility already covered by the platform or current stack.

## 13. Testing strategy

Minimum expectations:
- Unit tests for schemas, mapping functions, and business rules.
- Repository contract tests for mock and remote adapters where feasible.
- Component tests for forms and error states when a React Native test renderer is introduced.
- End-to-end smoke flows for intro, login, onboarding, theme, language, and logout before production.

A bug fix must include a regression test when the behavior can be tested without disproportionate setup.

## 14. Dependency policy

Before adding a package:
- Confirm the platform/API does not already solve it.
- Check Expo compatibility and peer dependencies.
- Prefer stable releases. NativeWind v5 is the one explicit preview exception documented in ADR 0002; do not add other preview packages without another ADR.
- Explain why the package is needed in the PR/spec.
- Run Expo dependency validation after install.

Use `pnpm`. Do not mix npm/yarn lockfiles.

## 15. Spec-driven development

Each non-trivial feature starts from `specs/<feature>.md` using `specs/_template.md`. A spec must contain:
- Problem and outcome.
- In/out of scope.
- User flows and edge cases.
- Data/API contracts.
- UX, accessibility, localization, and analytics requirements.
- Acceptance criteria.
- Test plan, rollout, and open questions.

Update the spec when implementation decisions change. The spec describes intended behavior; code is not a substitute for unresolved product decisions.

## 16. Definition of done

A change is done only when:
- Acceptance criteria are implemented.
- Layer boundaries remain valid.
- Copy is localized.
- Loading, empty, error, offline/retry, and success states are handled where relevant.
- Accessibility and responsive behavior are considered.
- Tests and docs are updated.
- `pnpm check` passes.
- No secrets or sensitive logs were introduced.
