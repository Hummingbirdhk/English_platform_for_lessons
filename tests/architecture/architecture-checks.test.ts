import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

describe('architecture guardrails', () => {
  it('forbids React Redux imports in presentation UI', () => {
    const scanner = fs.readFileSync(path.resolve('scripts/check-ui-redux-imports.mjs'), 'utf8');
    expect(scanner).toContain('react-redux');
    expect(scanner).toContain('@reduxjs/toolkit');
  });
  it('defines dependency boundaries', () => {
    const config = fs.readFileSync(path.resolve('.dependency-cruiser.cjs'), 'utf8');
    expect(config).toContain('ui-to-redux-internals');
    expect(config).toContain('no-cycles');
  });
});
