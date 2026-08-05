# ADR 0002: gluestack-ui v5 with NativeWind v5

## Status

Accepted for this starter baseline.

## Context

The starter must use gluestack-ui source-owned components, Tailwind CSS v4, and target Android, iOS, and web from Expo SDK 57. The requested styling engine is NativeWind rather than UniWind.

## Decision

Use:

- gluestack-ui v5 source-owned components in `src/shared/components/ui`;
- NativeWind v5 through the npm `preview` tag;
- Tailwind CSS v4 with PostCSS;
- `react-native-css` for native CSS support;
- `lightningcss` pinned to `1.30.1`;
- React Native `Appearance` for light/dark/system preference.

## Consequences

NativeWind v5 is still marked pre-release upstream. This template isolates the styling engine behind `src/shared/components/ui`, pins known-sensitive transitive dependencies, and documents migration risk. Before selling or using the template for a high-risk production release, re-run `pnpm doctor`, platform builds, and the smoke-test matrix against the exact committed lockfile.
