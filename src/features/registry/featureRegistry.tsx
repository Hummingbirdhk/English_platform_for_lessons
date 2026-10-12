import type { ExerciseDefinition } from '../../content/types';
import { MultipleChoiceFeature } from '../multiple-choice';
import type { FeatureRenderer } from './types';
import type { FeatureKey } from '../../shared/config/featureKeys';

const MultipleChoiceRenderer: FeatureRenderer = ({ exercise }) => {
  if (exercise.type !== 'multiple-choice') return null;
  return <MultipleChoiceFeature exercise={exercise} />;
};

export const featureRegistry = { 'multiple-choice': MultipleChoiceRenderer } satisfies Record<FeatureKey, FeatureRenderer>;
export function getFeatureRenderer(feature: string): FeatureRenderer | undefined { return featureRegistry[feature as keyof typeof featureRegistry]; }
export function isExerciseCompatible(feature: string, exercise: ExerciseDefinition): boolean { return feature === exercise.type; }
