# NativeWind v5 integration

## Source of truth
- `src/global.css`: generated semantic design tokens and Tailwind v4 imports.
- `src/shared/config/brand-config.ts`: brand colors and typography.
- `metro.config.js`: NativeWind Metro integration.
- `postcss.config.mjs`: Tailwind v4 PostCSS integration.
- `nativewind-env.d.ts`: React Native CSS type augmentation.
- `src/shared/ui`: source-owned gluestack primitives.

## Rules
- Never add UniWind to this repository.
- Do not create a second Tailwind configuration unless a documented plugin requires it.
- Do not hard-code brand colors inside features.
- Add gluestack components under `src/shared/ui`.
- Keep `lightningcss` pinned to `1.30.1` while NativeWind v5 requires it.

## Adding components
Use one line to avoid shell line-continuation mistakes:

```bash
pnpm dlx gluestack-ui@latest add button --path src/shared/ui --use-pnpm
```

Review generated imports and keep the public barrel in `src/shared/ui/index.ts` intentional.

## Manual theme behavior on web

`src/global.css` includes both system media-query tokens and higher-specificity `:root.light` / `:root.dark` tokens. The web provider toggles those root classes, while the native provider uses `Appearance.setColorScheme`. Keep both paths when changing theme infrastructure.
