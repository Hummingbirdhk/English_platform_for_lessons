import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

describe('architecture guardrails', () => {
  it('rejects a React component that imports React Redux directly', () => {
    const result = spawnSync(
      process.execPath,
      ['scripts/check-ui-redux-imports.mjs', 'tests/architecture/fixtures/illegal-ui-redux.tsx'],
      { encoding: 'utf8' },
    );

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('react-redux');
  });

  it('defines dependency boundaries', () => {
    const config = fs.readFileSync(path.resolve('.dependency-cruiser.cjs'), 'utf8');
    expect(config).toContain('ui-to-redux-internals');
    expect(config).toContain('no-cycles');
  });
});
