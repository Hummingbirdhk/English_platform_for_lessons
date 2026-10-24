import type { FeatureRenderer } from './types';
import { MultipleChoiceFeature } from '../multiple-choice';

export const MultipleChoiceRenderer: FeatureRenderer = ({ exercise }) => {
  if (exercise.type !== 'multiple-choice') return null;
  return <MultipleChoiceFeature exercise={exercise} />;
};
