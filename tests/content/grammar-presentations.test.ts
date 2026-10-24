import { describe, expect, it } from 'vitest';
import { grammarPresentations } from '../../src/content/grammar/grammarPresentations';
import { loadAllContent } from '../../src/content/loadContent';

describe('rich grammar library', () => {
  it('has one rich presentation for every grammar material', () => {
    const grammarMaterials = loadAllContent().materials.filter(
      (material) => material.type === 'grammar',
    );

    expect(grammarMaterials).toHaveLength(31);
    expect(Object.keys(grammarPresentations)).toHaveLength(31);

    for (const material of grammarMaterials) {
      expect(grammarPresentations[material.id], material.id).toBeDefined();
      expect(grammarPresentations[material.id].rule.length).toBeGreaterThan(40);
      expect(grammarPresentations[material.id].cues.length).toBeGreaterThanOrEqual(3);
      expect(grammarPresentations[material.id].practice.options.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('keeps present and past forms of to be as separate materials', () => {
    expect(grammarPresentations['grammar-to-be'].displayTitle).toContain('am / is / are');
    expect(grammarPresentations['grammar-to-be-past'].displayTitle).toContain('was / were');
  });

  it('includes expandable reference material where memorisation matters', () => {
    expect(
      grammarPresentations['grammar-past-simple-irregular'].accordion?.rows.length,
    ).toBeGreaterThan(20);
    expect(grammarPresentations['grammar-plural-nouns'].accordion?.rows.length).toBeGreaterThan(8);
    expect(grammarPresentations['grammar-articles'].accordion).toBeDefined();
    expect(grammarPresentations['grammar-present-perfect'].accordion).toBeDefined();
  });

  it('expands every tense card into a full study guide', () => {
    const tenseIds = [
      'grammar-present-simple',
      'grammar-present-continuous',
      'grammar-present-simple-vs-continuous',
      'grammar-past-simple-regular',
      'grammar-past-simple-irregular',
      'grammar-past-continuous',
      'grammar-past-simple-vs-continuous',
      'grammar-present-perfect',
      'grammar-future-going-to',
      'grammar-future-present-continuous',
      'grammar-future-will',
    ];

    for (const id of tenseIds) {
      const guide = grammarPresentations[id].tenseGuide;
      expect(guide, id).toBeDefined();
      expect(guide?.uses.length, id).toBeGreaterThanOrEqual(3);
      expect(guide?.markers.length, id).toBeGreaterThanOrEqual(3);
      expect(guide?.build.length, id).toBeGreaterThanOrEqual(2);
      expect(guide?.contrast, id).toBeDefined();
    }
  });

  it('explains countable, uncountable and quantifiers as one connected system', () => {
    const guide = grammarPresentations['grammar-countable-uncountable'].quantityGuide;

    expect(guide).toBeDefined();
    expect(guide?.nounGroups).toHaveLength(2);
    expect(guide?.someBridge.countable).toContain('some apples');
    expect(guide?.someBridge.uncountable).toContain('some water');
    expect(guide?.sections.map((section) => section.title)).toEqual([
      'Some / Any',
      'Much / Many / A lot of',
      'A few / A little',
    ]);
  });
});
