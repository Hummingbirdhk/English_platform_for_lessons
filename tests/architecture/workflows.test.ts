import fs from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('GitHub workflows', () => {
  it('runs canonical verification in CI', () => {
    const ci=fs.readFileSync('.github/workflows/ci.yml','utf8');
    expect(ci).toContain('npm ci');
    expect(ci).toContain('npm run verify');
  });
  it('deploys only verified main builds to Pages', () => {
    const deploy=fs.readFileSync('.github/workflows/deploy-pages.yml','utf8');
    expect(deploy).toContain('main');
    expect(deploy).toContain('npm run verify');
    expect(deploy).toContain('actions/deploy-pages');
  });
});
