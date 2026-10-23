import { contentBundleSchema } from './schema/contentSchema';
import type { ContentBundle } from './types';

export type ValidationResult = { ok: true } | { ok: false; errors: string[] };

export function validateContent(
  bundle: ContentBundle,
  registeredFeatureKeys: ReadonlySet<string>,
): ValidationResult {
  const parsed = contentBundleSchema.safeParse(bundle);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.issues.map((issue) => issue.message) };
  }

  const errors: string[] = [];
  const ids = new Set<string>();
  const exerciseIds = new Set(bundle.exercises.map((exercise) => exercise.id));
  const materialIds = new Set(bundle.materials.map((material) => material.id));
  const lessonIds = new Set(bundle.lessons.map((lesson) => lesson.id));

  for (const item of [
    ...bundle.lessons,
    ...bundle.exercises,
    ...bundle.materials,
    ...bundle.students,
  ]) {
    if (ids.has(item.id)) errors.push(`Duplicate content id: ${item.id}`);
    ids.add(item.id);
  }

  for (const lesson of bundle.lessons) {
    for (const section of lesson.sections) {
      if (section.type === 'feature') {
        if (!registeredFeatureKeys.has(section.feature)) {
          errors.push(`Unknown feature '${section.feature}' in lesson '${lesson.id}'`);
        }
        if (!exerciseIds.has(section.exerciseId)) {
          errors.push(
            `Missing exercise '${section.exerciseId}' referenced by lesson '${lesson.id}'`,
          );
        }
      }

      if (section.type === 'material' && !materialIds.has(section.materialId)) {
        errors.push(`Missing material '${section.materialId}' referenced by lesson '${lesson.id}'`);
      }
    }
  }

  for (const material of bundle.materials) {
    if ('exerciseIds' in material) {
      for (const exerciseId of material.exerciseIds) {
        if (!exerciseIds.has(exerciseId)) {
          errors.push(`Missing exercise '${exerciseId}' referenced by material '${material.id}'`);
        }
      }
    }
  }

  for (const student of bundle.students) {
    for (const materialId of student.assignedMaterialIds) {
      if (!materialIds.has(materialId)) {
        errors.push(`Missing material '${materialId}' assigned to student '${student.id}'`);
      }
    }
    for (const lessonId of student.assignedLessonIds) {
      if (!lessonIds.has(lessonId)) {
        errors.push(`Missing lesson '${lessonId}' assigned to student '${student.id}'`);
      }
    }
  }

  for (const exercise of bundle.exercises) {
    if (exercise.type === 'multiple-choice') {
      const optionIds = new Set(exercise.options.map((option) => option.id));
      if (!optionIds.has(exercise.correctOptionId)) {
        errors.push(`Exercise '${exercise.id}' has an invalid correctOptionId`);
      }
    }
  }

  return errors.length === 0 ? { ok: true } : { ok: false, errors };
}
