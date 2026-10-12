import { z } from 'zod';
import { exerciseSchema } from './exerciseSchema';
import { lessonSchema } from './lessonSchema';
export const contentBundleSchema = z.object({
  lessons: z.array(lessonSchema),
  exercises: z.array(exerciseSchema),
});
