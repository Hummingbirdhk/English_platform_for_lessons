import { contentBundleSchema } from './schema/contentSchema';
import type { ContentBundle } from './types';
export type ValidationResult = { ok: true } | { ok: false; errors: string[] };
export function validateContent(
  bundle: ContentBundle,
  registeredFeatureKeys: ReadonlySet<string>,
): ValidationResult {
  const parsed = contentBundleSchema.safeParse(bundle);
  if (!parsed.success)
    return { ok: false, errors: parsed.error.issues.map((issue) => issue.message) };
  const errors: string[] = [];
  const ids = new Set<string>();
  const exerciseIds = new Set(bundle.exercises.map((exercise) => exercise.id));
  for (const item of [...bundle.lessons, ...bundle.exercises]) {
    if (ids.has(item.id)) errors.push(`Duplicate content id: ${item.id}`);
    ids.add(item.id);
  }
  for (const lesson of bundle.lessons)
    for (const section of lesson.sections)
      if (section.type === 'feature') {
        if (!registeredFeatureKeys.has(section.feature))
          errors.push(`Unknown feature '${section.feature}' in lesson '${lesson.id}'`);
        if (!exerciseIds.has(section.exerciseId))
          errors.push(
            `Missing exercise '${section.exerciseId}' referenced by lesson '${lesson.id}'`,
          );
      }
  for (const exercise of bundle.exercises)
    if (exercise.type === 'multiple-choice') {
      const optionIds = new Set(exercise.options.map((option) => option.id));
      if (!optionIds.has(exercise.correctOptionId))
        errors.push(`Exercise '${exercise.id}' has an invalid correctOptionId`);
    }
  return errors.length === 0 ? { ok: true } : { ok: false, errors };
}
