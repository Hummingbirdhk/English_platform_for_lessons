import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
const file = 'src/pages/students/StudentOwnPage.tsx';
const original = readFileSync(file, 'utf8');
const prettier = spawnSync('node_modules/.bin/prettier', [file], { encoding: 'utf8' });
if (prettier.stdout && prettier.stdout !== original) {
  const a = original.split('\n');
  const b = prettier.stdout.split('\n');
  let i = 0;
  while (i < Math.max(a.length, b.length)) {
    if (a[i] !== b[i]) {
      console.log('FORMAT_DIFF_LINE', i + 1);
      console.log('BEFORE', JSON.stringify(a.slice(Math.max(0, i - 2), i + 10)));
      console.log('AFTER', JSON.stringify(b.slice(Math.max(0, i - 2), i + 10)));
      break;
    }
    i++;
  }
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
