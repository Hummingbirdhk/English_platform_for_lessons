import type { z } from 'zod';
import type { contentBundleSchema } from './schema/contentSchema';
import type { exerciseSchema, multipleChoiceExerciseSchema } from './schema/exerciseSchema';
import type { lessonSchema, lessonSectionSchema } from './schema/lessonSchema';
import type { materialSchema } from './schema/materialSchema';
import type { studentProfileSchema } from './schema/studentSchema';

export type ContentBundle = z.infer<typeof contentBundleSchema>;
export type Lesson = z.infer<typeof lessonSchema>;
export type LessonSection = z.infer<typeof lessonSectionSchema>;
export type Material = z.infer<typeof materialSchema>;
export type StudentProfile = z.infer<typeof studentProfileSchema>;
export type ExerciseDefinition = z.infer<typeof exerciseSchema>;
export type MultipleChoiceExerciseDefinition = z.infer<typeof multipleChoiceExerciseSchema>;
