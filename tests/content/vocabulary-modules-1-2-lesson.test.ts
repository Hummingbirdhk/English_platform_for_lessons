import { describe, expect, it } from 'vitest';
import { loadAllContent } from '../../src/content/loadContent';

describe('modules 1-2 vocabulary lesson', () => {
  it('publishes the interactive vocabulary lesson in the lesson library', () => {
    const lesson = loadAllContent().lessons.find((item) => item.id === 'vocabulary-modules-1-2');

    expect(lesson?.title).toBe('Урок (вокабуляр) по модулям 1 и 2');
    expect(lesson?.sections.some((section) => section.type === 'embed')).toBe(true);

    const embed = lesson?.sections.find((section) => section.type === 'embed');
    expect(embed?.src).toContain('vocabulary-modules-1-2.v2.html');
  });
});
