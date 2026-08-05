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

function createScreenSource(
  featureName: string,
  screenName: string,
  screenClass: string,
) {
  return `import { useTranslation } from 'react-i18next';
import { AppHeader, AppScreen } from '@/shared/components';
import { Text, VStack } from '@/shared/ui';

export function ${screenClass}() {
  const { t } = useTranslation();

  return (
    <AppScreen>
      <VStack space="lg">
        <AppHeader title={t('${featureName}.${screenName}.title')} back />
        <Text>{t('${featureName}.${screenName}.description')}</Text>
      </VStack>
    </AppScreen>
  );
}
`;
}

async function main() {
  const [featureInput, screenInput] = process.argv.slice(2);
  if (!featureInput || !screenInput) {
    throw new Error(
      'Usage: pnpm generate:screen <feature-name> <screen-name>',
    );
  }

  const featureName = toKebabCase(featureInput);
  const screenName = toKebabCase(screenInput);
  if (!featureName || !screenName) {
    throw new Error('Feature and screen names must contain letters or numbers.');
  }

  const screenClass = `${toPascalCase(screenName)}Screen`;
  const featureRoot = path.resolve('src/features', featureName);
  const screensRoot = path.join(featureRoot, 'screens');
  const target = path.join(screensRoot, `${screenName}-screen.tsx`);

  if (!(await exists(featureRoot))) {
    throw new Error(`Feature does not exist: src/features/${featureName}`);
  }
  if (await exists(target)) {
    throw new Error(`Screen already exists: ${target}`);
  }

  await mkdir(screensRoot, { recursive: true });
  await writeFile(
    target,
    createScreenSource(featureName, screenName, screenClass),
  );

  console.log(`Created screen: ${path.relative(process.cwd(), target)}`);
  console.log(
    'Next: export it from the feature API, add locale keys, and create a thin route.',
  );
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
