import { describe, expect, it } from 'vitest';
import { validateKnowledgeDocuments } from '../../src/content/validateKnowledge';

describe('knowledge base validation', () => {
  it('accepts grammar and vocabulary knowledge documents', () => {
    const result = validateKnowledgeDocuments([
      {
        documentType: 'grammar-topics',
        version: 1,
        items: [
          {
            id: 'grammar-present-simple',
            kind: 'grammar-topic',
            title: 'Present Simple',
            category: 'tenses',
            levels: ['A2'],
            subtopics: ['habits', 'third person -s'],
            tags: ['present'],
            sourceRefs: [],
          },
        ],
      },
      {
        documentType: 'vocabulary-sets',
        version: 1,
        items: [
          {
            id: 'vocab-home',
            kind: 'vocabulary-set',
            title: 'House and Home',
            category: 'everyday-life',
            levels: ['A2', 'B1'],
            tags: ['home'],
            sourceRefs: [],
            items: [
              {
                term: 'kitchen',
                translation: 'кухня',
                level: 'A2',
                partOfSpeech: 'noun',
              },
            ],
          },
        ],
      },
    ]);

    expect(result.ok).toBe(true);
  });

  it('rejects duplicate knowledge ids', () => {
    const result = validateKnowledgeDocuments([
      {
        documentType: 'lexicon',
        version: 1,
        id: 'same-id',
        title: 'One',
        levels: ['A2'],
        sourceRefs: [],
        items: [{ term: 'go', translation: 'идти', level: 'A2', partOfSpeech: 'verb' }],
      },
      {
        documentType: 'irregular-verbs',
        version: 1,
        id: 'same-id',
        title: 'Two',
        levels: ['A2'],
        sourceRefs: [],
        items: [
          {
            base: 'go',
            past: 'went',
            pastParticiple: 'gone',
            translation: 'идти',
            level: 'A2',
          },
        ],
      },
    ]);

    expect(result.ok).toBe(false);
  });
});
