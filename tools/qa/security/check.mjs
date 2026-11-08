import ts from 'typescript';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');

function sources(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? sources(path) : /\.tsx?$/.test(path) ? [path] : [];
  });
}

function staticText(node) {
  return node && (ts.isStringLiteralLike(node) || ts.isNoSubstitutionTemplateLiteral(node))
    ? node.text
    : null;
}

function calleeName(node) {
  if (ts.isIdentifier(node)) return node.text;
  if (ts.isPropertyAccessExpression(node)) return node.name.text;
  return null;
}

export function scanSource(filename, source) {
  const file = ts.createSourceFile(
    filename,
    source,
    ts.ScriptTarget.Latest,
    true,
    filename.endsWith('tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const issues = [];
  const report = (name, node) => {
    const line = file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
    issues.push(`${filename}:${line}: ${name}`);
  };
  function visit(node) {
    if (ts.isCallExpression(node) || ts.isNewExpression(node)) {
      const name = calleeName(node.expression);
      if (name === 'eval') report('no-eval', node);
      if (
        name === 'Function' &&
        (ts.isIdentifier(node.expression) || ts.isPropertyAccessExpression(node.expression))
      )
        report('no-function-constructor', node);
      if (
        (name === 'setTimeout' || name === 'setInterval') &&
        staticText(node.arguments?.[0]) !== null
      )
        report('no-string-timers', node);
    }
    if (ts.isJsxAttribute(node)) {
      const name = node.name.getText(file).toLowerCase();
      if (name === 'dangerouslysetinnerhtml') report('no-dangerously-set-html', node);
      if ((name === 'href' || name === 'src' || name === 'formaction') && node.initializer) {
        const value = ts.isStringLiteral(node.initializer)
          ? node.initializer.text
          : ts.isJsxExpression(node.initializer)
            ? staticText(node.initializer.expression)
            : null;
        if (value && /^\s*javascript\s*:/i.test(value)) report('no-javascript-url', node);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
  return issues;
}

export function checkProject(base = root) {
  const paths = sources(join(base, 'src'));
  if (!paths.length) return ['coverage: no TS/TSX files'];
  return paths.flatMap((path) => scanSource(relative(base, path), readFileSync(path, 'utf8')));
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const errors = checkProject();
  if (errors.length) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
  } else console.log('QA security: prohibited patterns absent');
}
