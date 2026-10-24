import { describe, expect, it } from 'vitest';
import { grammarPresentations } from '../../src/content/grammar/grammarPresentations';
import { loadAllContent } from '../../src/content/loadContent';

describe('rich grammar library', () => {
  it('has one rich presentation for every grammar material', () => {
    const grammarMaterials = loadAllContent().materials.filter(
      (material) => material.type === 'grammar',
    );

    expect(grammarMaterials).toHaveLength(30);
    expect(Object.keys(grammarPresentations)).toHaveLength(30);

    for (const material of grammarMaterials) {
      expect(grammarPresentations[material.id], material.id).toBeDefined();
      expect(grammarPresentations[material.id].rule.length).toBeGreaterThan(40);
      expect(grammarPresentations[material.id].cues.length).toBeGreaterThanOrEqual(3);
      expect(grammarPresentations[material.id].practice.options.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('includes expandable reference material where memorisation matters', () => {
    expect(grammarPresentations['grammar-past-simple-irregular'].accordion?.rows.length).toBeGreaterThan(
      20,
    );
    expect(grammarPresentations['grammar-plural-nouns'].accordion?.rows.length).toBeGreaterThan(8);
    expect(grammarPresentations['grammar-articles'].accordion).toBeDefined();
    expect(grammarPresentations['grammar-present-perfect'].accordion).toBeDefined();
  });
});
