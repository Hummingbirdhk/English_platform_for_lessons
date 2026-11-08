import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkImportBoundary, checkSource } from './check.mjs';

const forbidden = [
  ['src/shared/ui/Card.tsx', '../../pages/home/HomePage', 'shared-must-be-independent'],
  ['src/content/loadContent.ts', '../features/registry', 'content-must-be-independent'],
  [
    'src/entities/material/View.tsx',
    '../../pages/home/HomePage',
    'entities-must-not-import-pages-or-app',
  ],
  [
    'src/features/example/ui/Panel.tsx',
    '../../../pages/home/HomePage',
    'features-must-not-import-pages',
  ],
  [
    'src/features/example/ui/Panel.tsx',
    '../../../app/store/hooks',
    'feature-app-bridge-only-in-controller',
  ],
  ['src/pages/home/HomePage.tsx', '../../app/store/store', 'pages-must-not-import-store'],
];
for (const [file, specifier, rule] of forbidden) {
  test(`reject ${rule}`, () => {
    assert.equal(checkImportBoundary(file, specifier), rule);
    assert.ok(
      checkSource(file, `import { x } from '${specifier}';`).some((x) => x.startsWith(rule)),
    );
  });
}
test('feature controller may use typed hooks', () => {
  assert.equal(
    checkImportBoundary('src/features/example/controller/useThing.ts', '../../../app/store/hooks'),
    null,
  );
});
test('independent shared imports and type imports remain valid', () => {
  assert.deepEqual(
    checkSource('src/entities/lesson/View.tsx', "import type { Item } from '../../content/types';"),
    [],
  );
});
