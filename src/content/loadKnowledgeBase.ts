import { knowledgeDocumentSchema, type KnowledgeDocument } from './schema/knowledgeSchema';

const knowledgeModules = import.meta.glob('./knowledge/**/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>;

export function loadKnowledgeDocuments(): KnowledgeDocument[] {
  return Object.values(knowledgeModules).map((document) => knowledgeDocumentSchema.parse(document));
}
