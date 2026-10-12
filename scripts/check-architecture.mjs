import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const root=process.cwd(); const src=path.join(root,'src');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap((entry)=>{const full=path.join(dir,entry.name);return entry.isDirectory()?walk(full):[full];});}
const files=walk(src).filter((file)=>/\.(ts|tsx)$/.test(file)); const importPattern=/from\s+['\"]([^'\"]+)['\"]/g; const violations=[];
for(const file of files){const rel=path.relative(root,file).replaceAll('\\','/');const source=fs.readFileSync(file,'utf8');for(const match of source.matchAll(importPattern)){const target=match[1];if(rel.startsWith('src/features/')&&target.includes('/pages/')) violations.push(`${rel}: features must not import pages (${target})`);if(rel.startsWith('src/features/')&&target.includes('/app/')){const allowed=rel.includes('/controller/')&&target.endsWith('/app/store/hooks');if(!allowed) violations.push(`${rel}: feature may only reach app through controller -> app/store/hooks (${target})`);}if(rel.startsWith('src/entities/')&&target.includes('/pages/')) violations.push(`${rel}: entities must not import pages (${target})`);if(rel.startsWith('src/pages/')&&target.includes('/app/store/')) violations.push(`${rel}: pages must not import store internals (${target})`);}}
if(violations.length){console.error(violations.join('\n'));process.exit(1);} const result=spawnSync('npx',['depcruise','--config','.dependency-cruiser.cjs','src'],{stdio:'inherit',shell:process.platform==='win32'});process.exit(result.status??1);
