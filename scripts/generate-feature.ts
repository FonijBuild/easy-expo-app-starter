import { mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

function toKebabCase(value: string) {
  return value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function toPascalCase(value: string) {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join('');
}

async function exists(target: string) {
  try {
    await stat(target);
    return true;
  } catch {
    return false;
  }
}

function createScreenSource(featureName: string, featureClass: string) {
  return `import { useTranslation } from 'react-i18next';
import { AppHeader, AppScreen } from '@/shared/components';
import { Text, VStack } from '@/shared/ui';

export function ${featureClass}Screen() {
  const { t } = useTranslation();

  return (
    <AppScreen>
      <VStack space="lg">
        <AppHeader title={t('${featureName}.title')} />
        <Text>{t('${featureName}.description')}</Text>
      </VStack>
    </AppScreen>
  );
}
`;
}

function createSpecSource(featureName: string, featureClass: string) {
  return `# Feature: ${featureClass}

- Status: draft
- Owner: TBD
- Last updated: YYYY-MM-DD

## Problem

Describe the user or business problem.

## Outcome

Describe the observable outcome.

## In scope

- TBD

## Out of scope

- TBD

## User flows and edge cases

- TBD

## Data and API contracts

- TBD

## UX, accessibility, localization, and analytics

- Add \`${featureName}.title\` and \`${featureName}.description\` to every locale.
- Define loading, empty, error, and success states.
- Define keyboard, screen-reader, and responsive behavior.

## Acceptance criteria

- [ ] TBD

## Test plan

- TBD

## Rollout and open questions

- TBD
`;
}

async function main() {
  const input = process.argv[2];
  if (!input) {
    throw new Error('Usage: pnpm generate:feature <feature-name>');
  }

  const featureName = toKebabCase(input);
  if (!featureName) {
    throw new Error('Feature name must contain letters or numbers.');
  }

  const featureClass = toPascalCase(featureName);
  const root = path.resolve('src/features', featureName);
  const specPath = path.resolve('specs', `${featureName}.md`);

  if (await exists(root)) {
    throw new Error(`Feature already exists: ${root}`);
  }

  await mkdir(path.join(root, 'screens'), { recursive: true });
  await mkdir(path.dirname(specPath), { recursive: true });

  await Promise.all([
    writeFile(
      path.join(root, 'screens', `${featureName}-screen.tsx`),
      createScreenSource(featureName, featureClass),
    ),
    writeFile(
      path.join(root, 'index.ts'),
      `export * from './screens/${featureName}-screen';\n`,
    ),
    writeFile(specPath, createSpecSource(featureName, featureClass)),
  ]);

  console.log(`Created feature: src/features/${featureName}`);
  console.log(`Created spec: specs/${featureName}.md`);
  console.log('Next: resolve the spec, add locale keys, then add a thin route.');
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
