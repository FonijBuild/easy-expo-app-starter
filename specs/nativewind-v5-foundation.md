# Foundation: gluestack-ui v5 + NativeWind v5

- Status: implemented
- Last updated: 2026-08-05
- Owner: platform
- Related ADR: `docs/adr/0002-nativewind-v5.md`

## Problem

The Expo starter needs one styling path for Android, iOS, and web while keeping gluestack components source-owned and brand tokens configurable. The requested path is the latest gluestack-ui v5 integration with NativeWind v5 and Tailwind CSS v4.

## Outcome

Routes and features consume a stable local design-system API from `src/shared/ui`. NativeWind/PostCSS/Metro concerns remain outside feature code, and branding remains generated from `brand-config.ts`.

## Acceptance criteria

- [x] No UniWind package, runtime import, Metro wrapper, or generated type file remains; migration docs only mention it as forbidden/removed.
- [x] Metro is wrapped by `withNativewind`.
- [x] Tailwind CSS v4 is compiled through `@tailwindcss/postcss`.
- [x] `react-native-css` type augmentation is present.
- [x] The root layout imports `src/global.css` exactly once.
- [x] Theme preference supports `system`, `light`, and `dark` through React Native `Appearance`.
- [x] gluestack provider and primitives live in `src/shared/ui`.
- [x] Feature screens do not import presentation primitives directly from `react-native`.
- [x] The provider lives at `src/shared/ui/gluestack-ui-provider/index.tsx`, so the gluestack CLI auto-detects `src/shared/ui`.
- [x] The NativeWind v5 preview risk is documented and isolated behind an ADR.

## Verification

```bash
pnpm validate:architecture
pnpm theme:check
pnpm typecheck
pnpm lint
pnpm test
pnpm build:web
```

## Upgrade trigger

When NativeWind v5 receives a stable npm release, replace the `preview` range with an exact compatible stable version, regenerate the lockfile, run all checks and platform builds, then update ADR 0002.
