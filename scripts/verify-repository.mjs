import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
const f = 'src/pages/students/StudentOwnPage.tsx';
const before = readFileSync(f, 'utf8');
const result = spawnSync('node_modules/.bin/prettier', [f], { encoding: 'utf8' });
const a = before.split('\n'), b = result.stdout.split('\n');
const k = a.findIndex((x, i) => x !== b[i]);
if (k >= 0) console.log('DIFF', k + 1, JSON.stringify(a.slice(k, k + 8)), JSON.stringify(b.slice(k, k + 8)));
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
