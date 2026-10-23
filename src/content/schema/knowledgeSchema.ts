import { z } from 'zod';
import { levelSchema } from './lessonSchema';

export const sourceReferenceSchema = z.object({
  source: z.string().min(1),
  locator: z.string().min(1),
  note: z.string().min(1).optional(),
});

export const grammarTopicSchema = z.object({
  id: z.string().min(1),
  kind: z.literal('grammar-topic'),
  title: z.string().min(1),
  category: z.string().min(1),
  levels: z.array(levelSchema).min(1),
  subtopics: z.array(z.string().min(1)).min(1),
  tags: z.array(z.string().min(1)).default([]),
  sourceRefs: z.array(sourceReferenceSchema).default([]),
});

export const vocabularyItemSchema = z.object({
  term: z.string().min(1),
  translation: z.string().min(1),
  level: levelSchema,
  partOfSpeech: z
    .enum(['noun', 'verb', 'adjective', 'adverb', 'preposition', 'phrase', 'phrasal-verb', 'other'])
    .optional(),
  note: z.string().min(1).optional(),
  collocations: z.array(z.string().min(1)).optional(),
});

export const vocabularySetSchema = z.object({
  id: z.string().min(1),
  kind: z.literal('vocabulary-set'),
  title: z.string().min(1),
  category: z.string().min(1),
  levels: z.array(levelSchema).min(1),
  tags: z.array(z.string().min(1)).default([]),
  items: z.array(vocabularyItemSchema).min(1),
  sourceRefs: z.array(sourceReferenceSchema).default([]),
});

export const irregularVerbSchema = z.object({
  base: z.string().min(1),
  past: z.string().min(1),
  pastParticiple: z.string().min(1),
  translation: z.string().min(1),
  level: levelSchema,
});

const grammarTopicsDocumentSchema = z.object({
  documentType: z.literal('grammar-topics'),
  version: z.literal(1),
  items: z.array(grammarTopicSchema).min(1),
});

const vocabularySetsDocumentSchema = z.object({
  documentType: z.literal('vocabulary-sets'),
  version: z.literal(1),
  items: z.array(vocabularySetSchema).min(1),
});

const lexiconDocumentSchema = z.object({
  documentType: z.literal('lexicon'),
  version: z.literal(1),
  id: z.string().min(1),
  title: z.string().min(1),
  levels: z.array(levelSchema).min(1),
  items: z.array(vocabularyItemSchema).min(1),
  sourceRefs: z.array(sourceReferenceSchema).default([]),
});

const irregularVerbsDocumentSchema = z.object({
  documentType: z.literal('irregular-verbs'),
  version: z.literal(1),
  id: z.string().min(1),
  title: z.string().min(1),
  levels: z.array(levelSchema).min(1),
  items: z.array(irregularVerbSchema).min(1),
  sourceRefs: z.array(sourceReferenceSchema).default([]),
});

export const knowledgeDocumentSchema = z.discriminatedUnion('documentType', [
  grammarTopicsDocumentSchema,
  vocabularySetsDocumentSchema,
  lexiconDocumentSchema,
  irregularVerbsDocumentSchema,
]);

export type KnowledgeDocument = z.infer<typeof knowledgeDocumentSchema>;
