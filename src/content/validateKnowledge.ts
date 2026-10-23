import { knowledgeDocumentSchema, type KnowledgeDocument } from './schema/knowledgeSchema';

export type KnowledgeValidationResult =
  { ok: true; documents: KnowledgeDocument[] } | { ok: false; errors: string[] };

export function validateKnowledgeDocuments(rawDocuments: unknown[]): KnowledgeValidationResult {
  const documents: KnowledgeDocument[] = [];
  const errors: string[] = [];

  rawDocuments.forEach((raw, index) => {
    const parsed = knowledgeDocumentSchema.safeParse(raw);
    if (!parsed.success) {
      errors.push(
        ...parsed.error.issues.map(
          (issue) => `knowledge[${index}].${issue.path.join('.')}: ${issue.message}`,
        ),
      );
      return;
    }
    documents.push(parsed.data);
  });

  if (errors.length > 0) return { ok: false, errors };

  const ids = new Set<string>();

  for (const document of documents) {
    const documentId = 'id' in document ? document.id : undefined;
    if (documentId) {
      if (ids.has(documentId)) errors.push(`Duplicate knowledge id: ${documentId}`);
      ids.add(documentId);
    }

    if (document.documentType === 'grammar-topics' || document.documentType === 'vocabulary-sets') {
      for (const item of document.items) {
        if (ids.has(item.id)) errors.push(`Duplicate knowledge id: ${item.id}`);
        ids.add(item.id);
      }
    }

    if (document.documentType === 'vocabulary-sets') {
      for (const set of document.items) {
        const seen = new Set<string>();
        for (const item of set.items) {
          const key = `${item.term.toLowerCase()}::${item.level}`;
          if (seen.has(key)) {
            errors.push(`Duplicate vocabulary item '${item.term}' in set '${set.id}'`);
          }
          seen.add(key);
        }
      }
    }

    if (document.documentType === 'lexicon') {
      const seen = new Set<string>();
      for (const item of document.items) {
        const key = `${item.term.toLowerCase()}::${item.level}`;
        if (seen.has(key)) {
          errors.push(`Duplicate vocabulary item '${item.term}' in lexicon '${document.id}'`);
        }
        seen.add(key);
      }
    }

    if (document.documentType === 'irregular-verbs') {
      const seen = new Set<string>();
      for (const item of document.items) {
        const key = item.base.toLowerCase();
        if (seen.has(key)) errors.push(`Duplicate irregular verb '${item.base}'`);
        seen.add(key);
      }
    }
  }

  return errors.length === 0 ? { ok: true, documents } : { ok: false, errors };
}
