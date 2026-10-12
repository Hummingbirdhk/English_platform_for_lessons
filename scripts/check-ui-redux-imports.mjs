import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourceRoot = path.join(root, 'src');
const explicitFiles = process.argv.slice(2);

const directReduxRules = [/from\s+['"]@reduxjs\/toolkit['"]/, /from\s+['"]react-redux['"]/];

const presentationInternalRules = [
  /from\s+['"][^'"]*\/app\/store\//,
  /from\s+['"][^'"]*\/model\//,
  /from\s+['"][^'"]*(slice|thunk|listener|reducer)[^'"]*['"]/i,
];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const candidates = (
  explicitFiles.length > 0
    ? explicitFiles.map((file) => path.resolve(root, file))
    : walk(sourceRoot).filter((file) => /\.tsx$/.test(file))
).filter((file) => fs.existsSync(file));

const violations = [];

for (const file of candidates) {
  const relative = path.relative(root, file).replaceAll('\\', '/');
  const source = fs.readFileSync(file, 'utf8');
  const isReduxProvider = relative === 'src/app/providers/AppProviders.tsx';

  if (!isReduxProvider) {
    for (const rule of directReduxRules) {
      if (rule.test(source)) {
        violations.push(`${relative} directly imports Redux via ${rule}`);
      }
    }
  }

  if (/\/(ui|components)\//.test(relative)) {
    for (const rule of presentationInternalRules) {
      if (rule.test(source)) {
        violations.push(`${relative} imports business-state internals via ${rule}`);
      }
    }
  }
}

if (violations.length) {
  console.error(
    'React components must not depend directly on Redux or presentation-state internals:\n' +
      violations.join('\n'),
  );
  process.exit(1);
}

console.log(
  `React/Redux boundary check passed (${candidates.length} React component files).`,
);
