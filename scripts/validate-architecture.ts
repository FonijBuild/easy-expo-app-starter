import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();

async function walk(directory: string): Promise<string[]> {
  const entries = await readdir(directory);
  const files: string[] = [];

  for (const entry of entries) {
    const absolute = path.join(directory, entry);
    const metadata = await stat(absolute);

    if (metadata.isDirectory()) {
      files.push(...(await walk(absolute)));
    } else {
      files.push(absolute);
    }
  }

  return files;
}

async function main() {
  const sourceFiles = (await walk(path.join(root, 'src'))).filter((file) =>
    /\.[cm]?[jt]sx?$/.test(file),
  );
  const violations: string[] = [];

  for (const file of sourceFiles) {
    const relative = path.relative(root, file);
    const content = await readFile(file, 'utf8');

    if (
      relative.startsWith('src/shared/') &&
      /from ['"]@\/(features|app)\//.test(content)
    ) {
      violations.push(`${relative}: shared cannot import app/features`);
    }

    if (
      relative.startsWith('src/features/') &&
      /from ['"]@\/app\//.test(content)
    ) {
      violations.push(`${relative}: features cannot import app`);
    }

    if (
      relative.startsWith('src/features/') &&
      /from ['"]react-native['"]/.test(content)
    ) {
      violations.push(
        `${relative}: screens/features must use shared UI primitives`,
      );
    }

    if (/Uniwind|UniWind|from ['"]uniwind['"]/.test(content)) {
      violations.push(
        `${relative}: UniWind is forbidden in the NativeWind variant`,
      );
    }
  }

  if (violations.length > 0) {
    console.error(violations.join('\n'));
    process.exitCode = 1;
    return;
  }

  console.log(
    `Architecture validation passed for ${sourceFiles.length} source files.`,
  );
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
