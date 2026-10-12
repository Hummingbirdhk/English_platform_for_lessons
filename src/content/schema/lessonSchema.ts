import { z } from 'zod';
export const levelSchema = z.enum(['A1','A2','B1']);
const introSectionSchema = z.object({ id: z.string().min(1), type: z.literal('intro'), title: z.string().min(1), body: z.string().min(1) });
const featureSectionSchema = z.object({ id: z.string().min(1), type: z.literal('feature'), feature: z.string().min(1), exerciseId: z.string().min(1) });
export const lessonSectionSchema = z.discriminatedUnion('type', [introSectionSchema, featureSectionSchema]);
export const lessonSchema = z.object({ id: z.string().min(1), title: z.string().min(1), grade: z.literal(6), level: levelSchema, topic: z.string().min(1), sections: z.array(lessonSectionSchema).min(1) });
