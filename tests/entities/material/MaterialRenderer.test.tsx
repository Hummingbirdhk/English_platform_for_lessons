import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MaterialRenderer } from '../../../src/entities/material/MaterialRenderer';
import type { Material } from '../../../src/content/types';

const materials: Material[] = [
  {
    id: 'g1',
    type: 'grammar',
    title: 'Present Simple',
    grade: 6,
    level: 'A2',
    topic: 'Routine',
    tags: ['grammar'],
    summary: 'Grammar summary',
    explanation: { en: 'English explanation', ru: 'Русское объяснение' },
    forms: [
      {
        label: 'Positive',
        pattern: 'She works.',
        examples: [{ en: 'She works every day.', ru: 'Она работает каждый день.' }],
      },
    ],
    commonMistakes: [],
    exerciseIds: [],
  },
  {
    id: 'v1',
    type: 'vocabulary',
    title: 'Daily Routine',
    grade: 6,
    level: 'A2',
    topic: 'Routine',
    tags: ['vocabulary'],
    summary: 'Vocabulary summary',
    items: [
      {
        term: 'wake up',
        translation: 'просыпаться',
        example: { en: 'I wake up at seven.', ru: 'Я просыпаюсь в семь.' },
      },
    ],
  },
  {
    id: 'r1',
    type: 'reading',
    title: 'A Day',
    grade: 6,
    level: 'A2',
    topic: 'Routine',
    tags: ['reading'],
    summary: 'Reading summary',
    preReadingVocabulary: [],
    body: ['Tom wakes up at seven.'],
    questions: ['What time does Tom wake up?'],
    exerciseIds: [],
  },
  {
    id: 'y1',
    type: 'video',
    title: 'Daily Routine Video',
    grade: 6,
    level: 'A2',
    topic: 'Routine',
    tags: ['video'],
    summary: 'Video summary',
    provider: 'youtube',
    videoId: 'bq6GBbh3uhU',
    preWatch: ['What do you do every morning?'],
    vocabulary: [],
    postWatch: ['Name two actions.'],
  },
];

describe('MaterialRenderer', () => {
  it.each(materials)('renders $type materials', (material) => {
    render(<MaterialRenderer material={material} />);
    expect(screen.getByRole('heading', { name: material.title })).toBeInTheDocument();
  });

  it('embeds YouTube inside the platform', () => {
    render(<MaterialRenderer material={materials[3]} />);
    expect(screen.getByTitle('Daily Routine Video')).toHaveAttribute(
      'src',
      expect.stringContaining('youtube-nocookie.com/embed/bq6GBbh3uhU'),
    );
  });
});
