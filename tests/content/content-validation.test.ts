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
      sections: [
        { id: 'm1', type: 'material', materialId: 'grammar-present-simple' },
        { id: 's1', type: 'feature', feature: 'multiple-choice', exerciseId: 'ex-1' },
      ],
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
  materials: [
    {
      id: 'grammar-present-simple',
      type: 'grammar',
      title: 'Present Simple',
      grade: 6,
      level: 'A2',
      topic: 'Daily routine',
      tags: ['present simple'],
      summary: 'Use Present Simple for routines.',
      explanation: {
        en: 'We use Present Simple for routines and repeated actions.',
        ru: 'Present Simple используется для регулярных и повторяющихся действий.',
      },
      forms: [
        {
          label: 'Positive',
          pattern: 'I/You/We/They work. He/She/It works.',
          examples: [
            {
              en: 'She goes to school every day.',
              ru: 'Она ходит в школу каждый день.',
            },
          ],
        },
      ],
      commonMistakes: [],
      exerciseIds: ['ex-1'],
    },
  ],
  students: [
    {
      id: 'student-maya',
      displayName: 'Маша К.',
      grade: 6,
      level: 'A2',
      curriculum: 'Spotlight 6',
      currentFocus: ['Present Simple'],
      completedTopics: ['Daily routine'],
      revisionTopics: ['do / does'],
      assignedMaterialIds: ['grammar-present-simple'],
      assignedLessonIds: ['lesson-1'],
    },
  ],
};

describe('content validation', () => {
  it('accepts valid lessons, materials, exercises, and student profiles', () =>
    expect(validateContent(validBundle, new Set(['multiple-choice']))).toEqual({ ok: true }));

  it('rejects an unknown feature', () =>
    expect(validateContent(validBundle, new Set()).ok).toBe(false));

  it('rejects duplicate ids across collections', () => {
    const duplicate: ContentBundle = {
      ...validBundle,
      exercises: [{ ...validBundle.exercises[0], id: 'grammar-present-simple' }],
    };
    expect(validateContent(duplicate, new Set(['multiple-choice'])).ok).toBe(false);
  });

  it('rejects missing exercise references', () =>
    expect(
      validateContent({ ...validBundle, exercises: [] }, new Set(['multiple-choice'])).ok,
    ).toBe(false));

  it('rejects a lesson that references a missing material', () => {
    const missingMaterial: ContentBundle = { ...validBundle, materials: [] };
    expect(validateContent(missingMaterial, new Set(['multiple-choice'])).ok).toBe(false);
  });

  it('rejects a student assignment that references missing content', () => {
    const invalidStudent: ContentBundle = {
      ...validBundle,
      students: [
        {
          ...validBundle.students[0],
          assignedMaterialIds: ['missing-material'],
          assignedLessonIds: ['missing-lesson'],
        },
      ],
    };
    expect(validateContent(invalidStudent, new Set(['multiple-choice'])).ok).toBe(false);
  });
});
