import { z } from 'zod';
import { levelSchema } from './lessonSchema';

const bilingualTextSchema = z.object({
  en: z.string().min(1),
  ru: z.string().min(1),
});

const baseMaterialFields = {
  id: z.string().min(1),
  title: z.string().min(1),
  grade: z.literal(6),
  level: levelSchema,
  topic: z.string().min(1),
  tags: z.array(z.string().min(1)),
  summary: z.string().min(1),
};

const grammarMaterialSchema = z.object({
  ...baseMaterialFields,
  type: z.literal('grammar'),
  explanation: bilingualTextSchema,
  forms: z.array(
    z.object({
      label: z.string().min(1),
      pattern: z.string().min(1),
      examples: z.array(bilingualTextSchema).min(1),
    }),
  ).min(1),
  commonMistakes: z.array(
    z.object({
      wrong: z.string().min(1),
      right: z.string().min(1),
      note: z.string().min(1).optional(),
    }),
  ),
  exerciseIds: z.array(z.string().min(1)).default([]),
});

const vocabularyMaterialSchema = z.object({
  ...baseMaterialFields,
  type: z.literal('vocabulary'),
  items: z.array(
    z.object({
      term: z.string().min(1),
      translation: z.string().min(1),
      pronunciation: z.string().min(1).optional(),
      example: bilingualTextSchema,
      imageUrl: z.string().url().optional(),
      collocations: z.array(z.string().min(1)).optional(),
    }),
  ).min(1),
});

const readingMaterialSchema = z.object({
  ...baseMaterialFields,
  type: z.literal('reading'),
  preReadingVocabulary: z.array(
    z.object({
      term: z.string().min(1),
      translation: z.string().min(1),
    }),
  ).default([]),
  body: z.array(z.string().min(1)).min(1),
  questions: z.array(z.string().min(1)).min(1),
  exerciseIds: z.array(z.string().min(1)).default([]),
});

const videoVocabularyItemSchema = z.object({
  term: z.string().min(1),
  translation: z.string().min(1),
});

const videoMaterialSchema = z.object({
  ...baseMaterialFields,
  type: z.literal('video'),
  provider: z.literal('youtube'),
  videoId: z.string().min(1),
  preWatch: z.array(z.string().min(1)).default([]),
  vocabulary: z.array(videoVocabularyItemSchema).default([]),
  postWatch: z.array(z.string().min(1)).default([]),
});

export const materialSchema = z.discriminatedUnion('type', [
  grammarMaterialSchema,
  vocabularyMaterialSchema,
  readingMaterialSchema,
  videoMaterialSchema,
]);
