import process from 'node:process';
import console from 'node:console';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, posix, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');

function sources(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? sources(path) : /\.tsx?$/.test(path) ? [path] : [];
  });
}

export function checkImportBoundary(file, specifier) {
  if (!specifier.startsWith('.')) return null;
  const target = posix.normalize(posix.join(posix.dirname(file), specifier));
  if (!target.startsWith('src/')) return null;
  const fromShared = file.startsWith('src/shared/');
  const fromContent = file.startsWith('src/content/');
  const fromEntity = file.startsWith('src/entities/');
  const fromFeature = file.startsWith('src/features/');
  const fromPage = file.startsWith('src/pages/');
  const higher = /^(src\/(app|pages|entities|features)\/)/.test(target);
  if (fromShared && higher) return 'shared-must-be-independent';
  if (fromContent && higher) return 'content-must-be-independent';
  if (fromEntity && /^(src\/(pages|app)\/)/.test(target))
    return 'entities-must-not-import-pages-or-app';
  if (fromFeature && target.startsWith('src/pages/')) return 'features-must-not-import-pages';
  if (fromFeature && target.startsWith('src/entities/')) return 'features-must-not-import-entities';
  if (
    fromFeature &&
    target.startsWith('src/app/') &&
    !(file.includes('/controller/') && target === 'src/app/store/hooks')
  ) {
    return 'feature-app-bridge-only-in-controller';
  }
  if (fromPage && target.startsWith('src/app/store/')) return 'pages-must-not-import-store';
  return null;
}

export function checkSource(file, code) {
  const problems = [];
  // Typescript syntax is checked by the existing compiler. This gate checks import edges.
  const imports = /(?:\bfrom\s*|\bimport\s*\(|\bimport\s*)['"]([^'"]+)['"]/g;
  for (const match of code.matchAll(imports)) {
    const reason = checkImportBoundary(file, match[1]);
    if (reason) problems.push(`${reason}: ${file} -> ${match[1]}`);
  }
  return problems;
}

export function checkProject(root = repositoryRoot) {
  const files = sources(join(root, 'src'));
  if (!files.length) return ['coverage: no TS/TSX source files'];
  return files.flatMap((file) =>
    checkSource(relative(root, file).replaceAll('\\', '/'), readFileSync(file, 'utf8')),
  );
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const errors = checkProject();
  if (errors.length) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
  } else {
    console.log('QA architecture: layer boundaries passed');
  }
}
