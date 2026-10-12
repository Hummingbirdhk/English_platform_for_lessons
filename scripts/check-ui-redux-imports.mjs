import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourceRoot = path.join(root, 'src');
const forbidden = [/from\s+['\"]@reduxjs\/toolkit['\"]/, /from\s+['\"]react-redux['\"]/, /from\s+['\"][^'\"]*\/app\/store\//, /from\s+['\"][^'\"]*\/model\//, /from\s+['\"][^'\"]*(slice|thunk|listener|reducer)[^'\"]*['\"]/i];
function walk(dir) { return fs.readdirSync(dir,{withFileTypes:true}).flatMap((entry)=>{ const full=path.join(dir,entry.name); return entry.isDirectory()?walk(full):[full]; }); }
const candidates=walk(sourceRoot).filter((file)=>/\.(ts|tsx)$/.test(file)&&/[/\\](ui|components)[/\\]/.test(file));
const violations=[];
for (const file of candidates) { const source=fs.readFileSync(file,'utf8'); for (const rule of forbidden) if (rule.test(source)) violations.push(`${path.relative(root,file)} violates ${rule}`); }
if (violations.length) { console.error('Direct Redux/business-state imports are forbidden in presentation UI:\n'+violations.join('\n')); process.exit(1); }
console.log(`UI/Redux boundary check passed (${candidates.length} presentation files).`);
