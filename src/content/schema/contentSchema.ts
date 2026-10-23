import { z } from 'zod';
import { exerciseSchema } from './exerciseSchema';
import { lessonSchema } from './lessonSchema';
import { materialSchema } from './materialSchema';
import { studentProfileSchema } from './studentSchema';

export const contentBundleSchema = z.object({
  lessons: z.array(lessonSchema),
  exercises: z.array(exerciseSchema),
  materials: z.array(materialSchema),
  students: z.array(studentProfileSchema),
});
