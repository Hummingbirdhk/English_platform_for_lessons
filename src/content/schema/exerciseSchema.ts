import { z } from 'zod';
export const multipleChoiceOptionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
});
export const multipleChoiceExerciseSchema = z.object({
  id: z.string().min(1),
  type: z.literal('multiple-choice'),
  prompt: z.string().min(1),
  options: z.array(multipleChoiceOptionSchema).min(2),
  correctOptionId: z.string().min(1),
  explanation: z.object({ en: z.string().min(1), ru: z.string().min(1) }).optional(),
});
export const exerciseSchema = z.discriminatedUnion('type', [multipleChoiceExerciseSchema]);
