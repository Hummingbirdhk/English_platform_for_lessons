import fs from 'node:fs';
import path from 'node:path';
import { registeredFeatureKeys } from '../shared/config/featureKeys';
import { contentBundleSchema } from './schema/contentSchema';
import { validateContent } from './validateContent';
import { validateKnowledgeDocuments } from './validateKnowledge';

function readJsonFiles(dir: string): unknown[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return readJsonFiles(full);
    if (!entry.name.endsWith('.json')) return [];
    return [JSON.parse(fs.readFileSync(full, 'utf8'))];
  });
}

const rawBundle = {
  lessons: readJsonFiles(path.resolve('src/content/lessons')),
  exercises: readJsonFiles(path.resolve('src/content/exercises')),
  materials: readJsonFiles(path.resolve('src/content/materials')),
  students: readJsonFiles(path.resolve('src/content/students')),
};

const parsed = contentBundleSchema.safeParse(rawBundle);
if (!parsed.success) {
  console.error(
    parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('\n'),
  );
  process.exit(1);
}

const result = validateContent(parsed.data, registeredFeatureKeys);
if (!result.ok) {
  console.error(result.errors.join('\n'));
  process.exit(1);
}

const knowledgeResult = validateKnowledgeDocuments(
  readJsonFiles(path.resolve('src/content/knowledge')),
);

if (!knowledgeResult.ok) {
  console.error(knowledgeResult.errors.join('\n'));
  process.exit(1);
}

console.log(`Content validation passed. Knowledge documents: ${knowledgeResult.documents.length}.`);
