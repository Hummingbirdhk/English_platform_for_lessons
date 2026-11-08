import { test } from 'node:test';
import assert from 'node:assert/strict';
import { scanSource } from './check.mjs';

for (const [rule, snippet] of [
  ['no-eval', 'eval(location.hash)'],
  ['no-function-constructor', 'new Function(location.hash)'],
  ['no-string-timers', 'setTimeout("alert(1)", 100)'],
  [
    'no-dangerously-set-html',
    'export const View = () => <div dangerouslySetInnerHTML={{ __html: location.hash }} />',
  ],
  ['no-javascript-url', 'export const View = () => <a href="javascript:alert(1)">link</a>'],
  ['no-javascript-url', 'export const View = () => <a href={"javascript:alert(1)"}>link</a>'],
]) {
  test(`reject ${rule}`, () => {
    assert.ok(scanSource('fixture.tsx', snippet).some((issue) => issue.includes(rule)));
  });
}
test('safe JSX and callbacks are allowed', () => {
  assert.deepEqual(
    scanSource(
      'safe.tsx',
      'export const Safe = () => <button onClick={() => alert("Hi")}>Go</button>',
    ),
    [],
  );
});
