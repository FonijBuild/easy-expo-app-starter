<div align="center">

# Easy Expo App Starter

**A production-capable Expo foundation for maintainable cross-platform Android, iOS, and web applications.**

[![Use this template](https://img.shields.io/badge/use%20this%20template-2EA44F?logo=github&logoColor=white)](https://github.com/FonijBuild/easy-expo-app-starter/generate)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)
![Status: Foundation](https://img.shields.io/badge/status-foundation-F59E0B)
![Expo](https://img.shields.io/badge/Expo-000020?logo=expo&logoColor=white) ![React Native](https://img.shields.io/badge/React%20Native-61DAFB?logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) ![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=white)

[Documentation](https://github.com/FonijBuild/fonij-docs) · [Discussions](https://github.com/orgs/FonijBuild/discussions) · [Issues](https://github.com/FonijBuild/easy-expo-app-starter/issues)

</div>

> “What do we build for, if not to lessen each other’s hardship?”

> [!IMPORTANT]
> This repository is currently in the **foundation stage**. Do not treat it as production-ready until the first stable release.

## Best for

- Android and iOS products from one codebase
- Products that need native device capabilities
- Mobile-first products with authenticated flows
- Projects that may share a backend with web clients

**Not for:** Products whose only required surface is a conventional desktop-first website.

## Baseline

- Expo Router and typed navigation boundaries
- Authentication, onboarding, settings, and app-shell foundations
- Theme, i18n, LTR/RTL, storage, query, form, and validation layers
- Testing, build profiles, CI, and configuration conventions
- AI-agent rules, specs, and architecture documentation

## Quick start

Preferred:

```bash
fonij create my-product
```

Direct template use:

```bash
gh repo create my-product --template FonijBuild/easy-expo-app-starter --private --clone
cd my-product
cp .env.example .env
pnpm install
pnpm check
pnpm dev
```

## Project contract

- `.fonij/starter.json` describes this foundation to Fonij.
- `AGENTS.md` defines repository rules for AI coding agents.
- `specs/` contains implementation-ready feature specifications.
- `docs/` contains architecture and repository-specific guidance.
- Keep quality checks green before merging changes.

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before contributing. Security issues must follow [`SECURITY.md`](SECURITY.md).
