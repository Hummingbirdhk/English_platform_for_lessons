import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
for (const file of ['src/pages/dictionary/DictionaryPage.tsx','src/pages/dictionary/DictionaryPage.css']) {
  const output = spawnSync('node_modules/.bin/prettier', [file], { encoding: 'utf8' });
  console.log('FORMATTED_FILE_BEGIN:' + file + ':' + Buffer.from(output.stdout).toString('base64') + ':FORMATTED_FILE_END');
}
const checks = [
  ['Formatting', 'npm', ['run', 'format:check']],
  ['Lint', 'npm', ['run', 'lint']],
  ['TypeScript', 'npm', ['run', 'typecheck']],
  ['Architecture', 'npm', ['run', 'check:architecture']],
  ['UI/Redux boundary', 'npm', ['run', 'check:ui-redux']],
  ['Content', 'npm', ['run', 'validate:content']],
  ['Tests', 'npm', ['run', 'test:run']],
  ['Build', 'npm', ['run', 'build']],
];
for (const [label, command, args] of checks) {
  console.log(`\n=== ${label} ===`);
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
console.log('\nRepository verification passed.');
