import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
const required=['rules/ARCHITECTURE.md','rules/CODE_QUALITY.md','rules/CONTENT_SCHEMA.md','rules/FEATURE_CREATION.md'];

describe('agent repository rules', () => {
  it('keeps required technical rule files', () => { for(const file of required) expect(fs.existsSync(file),file).toBe(true); });
  it('requires full verification and protects UI from Redux', () => {
    const agents=fs.readFileSync('AGENTS.md','utf8');
    expect(agents).toContain('npm run verify');
    expect(agents).toMatch(/presentation UI/i);
    expect(agents).toMatch(/do not disable|never disable/i);
  });
});
