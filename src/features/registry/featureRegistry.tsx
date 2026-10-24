import type { ExerciseDefinition } from '../../content/types';
import type { FeatureKey } from '../../shared/config/featureKeys';
import { MultipleChoiceRenderer } from './MultipleChoiceRenderer';
import type { FeatureRenderer } from './types';

export const featureRegistry = { 'multiple-choice': MultipleChoiceRenderer } satisfies Record<
  FeatureKey,
  FeatureRenderer
>;

export function getFeatureRenderer(feature: string): FeatureRenderer | undefined {
  return featureRegistry[feature as keyof typeof featureRegistry];
}

export function isExerciseCompatible(feature: string, exercise: ExerciseDefinition): boolean {
  return feature === exercise.type;
}
