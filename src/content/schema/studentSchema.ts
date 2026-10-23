import { z } from 'zod';
import { levelSchema } from './lessonSchema';

export const studentProfileSchema = z.object({
  id: z.string().min(1),
  displayName: z.string().min(1),
  grade: z.literal(6),
  level: levelSchema,
  curriculum: z.string().min(1),
  currentFocus: z.array(z.string().min(1)),
  completedTopics: z.array(z.string().min(1)),
  revisionTopics: z.array(z.string().min(1)),
  assignedMaterialIds: z.array(z.string().min(1)),
  assignedLessonIds: z.array(z.string().min(1)),
});
