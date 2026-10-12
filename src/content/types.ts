import type { z } from 'zod';
import type { exerciseSchema, multipleChoiceExerciseSchema } from './schema/exerciseSchema';
import type { contentBundleSchema } from './schema/contentSchema';
import type { lessonSchema, lessonSectionSchema } from './schema/lessonSchema';
export type ContentBundle = z.infer<typeof contentBundleSchema>;
export type Lesson = z.infer<typeof lessonSchema>;
export type LessonSection = z.infer<typeof lessonSectionSchema>;
export type ExerciseDefinition = z.infer<typeof exerciseSchema>;
export type MultipleChoiceExerciseDefinition = z.infer<typeof multipleChoiceExerciseSchema>;
