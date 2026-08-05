# Validation record

Validated on 2026-08-05 in the artifact-generation environment.

## Passed

- 136 TypeScript/TSX files parsed with the TypeScript compiler API.
- Architecture validation passed for 125 files under `src`.
- All local alias and relative imports resolve statically.
- All 34 Expo Router route files expose a default export.
- English and Persian contain the same 136 translation keys.
- Literal `t('...')` calls reference existing keys.
- NativeWind theme CSS exactly matches the brand token generator.
- The gluestack provider is discoverable at `src/shared/ui/gluestack-ui-provider/index.tsx`.
- UniWind is absent from runtime dependencies and source imports.
- JSON files, JavaScript configuration syntax, required assets, and line endings passed validation.

## Not executable in this environment

The environment could not resolve `registry.npmjs.org` (`EAI_AGAIN`), so it could not install pnpm or project dependencies. Consequently, semantic TypeScript checking against installed package types, ESLint, Vitest, Expo bundling, web export, and native builds must be run after extraction in a networked environment.

```bash
corepack enable
cp .env.example .env
pnpm install
pnpm check
pnpm build:web
pnpm android
# pnpm ios requires macOS/Xcode or an EAS build
```

Commit the generated `pnpm-lock.yaml` before relying on reproducible CI or production builds.
