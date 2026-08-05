# gluestack-ui and NativeWind v5

The project uses gluestack-ui v5 with NativeWind v5 and Tailwind CSS v4. NativeWind v5 is currently a preview dependency; it is isolated behind the local UI layer and documented in ADR 0002.

## Ownership model

Gluestack components are copied/source-owned in `src/shared/ui`, one component per directory:

```text
src/shared/ui/
├── button/index.tsx
├── input/index.tsx
├── gluestack-ui-provider/index.tsx
└── index.ts
```

This gives product teams a stable local API and makes generated source changes reviewable.

## Why the provider path matters

For a single Expo app, the gluestack CLI detects the writable component directory by finding `gluestack-ui-provider/index.tsx`. It does not need `gluestack-ui.config.json`; that file is intended for the CLI's monorepo mode.

Because this starter keeps the provider at `src/shared/ui/gluestack-ui-provider/index.tsx`, subsequent `add` commands automatically target `src/shared/ui`.

## Adding a component

Use a clean branch and run:

```bash
pnpm dlx gluestack-ui@latest add checkbox --use-pnpm
```

You may also pass the location explicitly:

```bash
pnpm dlx gluestack-ui@latest add checkbox --path src/shared/ui --use-pnpm
```

Review generated dependency, Metro, PostCSS, token, and provider changes before accepting them. Export the component intentionally from `src/shared/ui/index.ts`, align variants with semantic tokens, add tests/examples, and run `pnpm check`.

Do not run `init` again on an already initialized project unless you intentionally want the CLI to rewrite the styling configuration.

## Styling rules

- Use semantic token classes in reusable components.
- Use `className` for static declarations.
- Use `style` for runtime measurements, percentages, and animation output.
- Use `tva` for finite reusable variants.
- Create NativeWind `styled` wrappers once at module scope.
- Do not add UniWind or a second styling engine alongside NativeWind v5.

## Theme behavior

`useThemeStore` persists `system`, `light`, or `dark` and applies the preference through React Native `Appearance.setColorScheme`. `AppProviders` separately resolves the effective color scheme for navigator colors and the status bar.
