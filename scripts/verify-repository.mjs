import { spawnSync } from 'node:child_process';
import { spawnSync } from 'node:child_process';
const files = [...Array.from({length:10},(_,i)=>'src/content/lesson-packs/practice-'+String(i+1).padStart(2,'0')+'.json'), 'src/pages/lesson/PracticeLesson.css', 'src/pages/lesson/PracticeLesson.tsx'];
for(const file of files){const result=spawnSync('node_modules/.bin/prettier',[file],{encoding:'utf8'});if(result.stdout){console.log('FMT_START '+file+' '+Buffer.from(result.stdout).toString('base64')+' FMT_END');}}

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
