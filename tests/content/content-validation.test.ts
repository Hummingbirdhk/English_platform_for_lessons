import { describe, expect, it } from 'vitest';
import type { ContentBundle } from '../../src/content/types';
import { validateContent } from '../../src/content/validateContent';

const validBundle: ContentBundle = {
  lessons: [
    {
      id: 'lesson-1',
      title: 'Lesson',
      grade: 6,
      level: 'A2',
      topic: 'Topic',
      sections: [{ id: 's1', type: 'feature', feature: 'multiple-choice', exerciseId: 'ex-1' }],
    },
  ],
  exercises: [
    {
      id: 'ex-1',
      type: 'multiple-choice',
      prompt: 'Choose',
      correctOptionId: 'b',
      options: [
        { id: 'a', text: 'A' },
        { id: 'b', text: 'B' },
      ],
    },
  ],
};

describe('content validation', () => {
  it('accepts valid Grade 6 A2 content', () =>
    expect(validateContent(validBundle, new Set(['multiple-choice']))).toEqual({ ok: true }));
  it('rejects an unknown feature', () =>
    expect(validateContent(validBundle, new Set()).ok).toBe(false));
  it('rejects duplicate ids', () => {
    const duplicate: ContentBundle = {
      ...validBundle,
      exercises: [{ ...validBundle.exercises[0], id: 'lesson-1' }],
    };
    expect(validateContent(duplicate, new Set(['multiple-choice'])).ok).toBe(false);
  });
  it('rejects missing exercise references', () =>
    expect(
      validateContent({ ...validBundle, exercises: [] }, new Set(['multiple-choice'])).ok,
    ).toBe(false));
});
