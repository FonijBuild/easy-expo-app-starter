# Architecture

## Goals

The starter optimizes for predictable agent-assisted development, brand configurability, universal Expo output, and gradual product growth without premature enterprise complexity.

## Layers

```text
src/app       Expo Router composition
src/features  Vertical product capabilities
src/shared    Cross-feature platform and design-system code
```

Dependency direction is `app -> features -> shared`. `shared` cannot import feature or route code.

## Runtime composition

`src/app/_layout.tsx` imports global CSS, keeps the splash screen visible, installs root providers, and declares protected route groups. `AppProviders` composes:

1. Gesture handler root
2. Safe area provider
3. TanStack Query client
4. gluestack/NativeWind v5 provider
5. React Navigation theme
6. Status bar and logical layout direction

Hydration runs once through `useAppBootstrap`. Each persistent store catches storage failures and always marks itself hydrated so startup cannot remain blocked indefinitely.

## Navigation state machine

```text
intro unseen                  -> /(intro)
intro seen + no session       -> /(auth)/welcome
authenticated + incomplete    -> /(onboarding)/profile
authenticated + complete      -> /(tabs)/dashboard
```

Expo Router protected groups prevent unauthorized route trees from being active. The backend must still authorize every API call.

## Feature shape

```text
features/example/
  api/          contracts, repositories, queries/mutations
  components/   feature-only reusable UI
  hooks/        feature orchestration hooks
  model/        schemas and pure domain behavior
  screens/      route-level presentation
  index.ts      public API
```

Not every folder is required. Add a folder only when it has content.

## State ownership

- TanStack Query: remote/server state.
- Zustand: small global client state and hydrated preferences.
- React Hook Form: form state.
- Local React state: transient screen/component state.
- Zod: runtime validation at environment, persistence, form, and API boundaries.

## API boundary

`apiRequest` handles URL composition, JSON headers, bearer auth, response decoding, and typed `ApiError` creation. Feature repositories define product-specific endpoints. Mock and remote auth repositories implement one contract, selected by public environment configuration.

For a production backend, add token refresh as a single-flight session service rather than retrying independently from every screen.

## Design system

- gluestack-ui v5 + NativeWind v5/Tailwind v4 + PostCSS integration + `react-native-css` types

- Gluestack primitives in `src/shared/components/ui`
- `src/shared/components` composes them into app-level patterns such as headers, fields, settings rows, and screens. Feature screens use these layers and do not import raw React Native presentation primitives.

## Configurability

- Brand metadata and semantic design tokens: `brand-config.ts`
- Generated Tailwind v4 theme: `global.css`
- Runtime product options: `app-config.ts`
- Native/web identifiers: `app.config.ts` and `.env`
- Copy and locales: `shared/i18n/locales`
- Logos/icons/splash: `assets`

## When to add another layer

Do not add `entities`, `services`, `use-cases`, or a dependency-injection container by default. Add one only when multiple features share meaningful business behavior that cannot remain cleanly in `shared/model` or a feature public API. Record the decision in `docs/decisions/`.
