import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
for (const file of ['src/content/schema/materialSchema.ts','src/entities/material/renderers/VocabularyMaterial.tsx']) {
 const a=readFileSync(file,'utf8').split('\n');
 const b=spawnSync('node_modules/.bin/prettier',[file],{encoding:'utf8'}).stdout.split('\n');
 let i=0;while(i<Math.max(a.length,b.length)){if(a[i]!==b[i]){console.log('PRETTIER_DIFF',file,i+1,JSON.stringify(a.slice(i,i+8)),JSON.stringify(b.slice(i,i+8)));break;}i++;}
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
