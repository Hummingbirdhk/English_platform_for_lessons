import type { ComponentType } from 'react';
import type { ExerciseDefinition } from '../../content/types';

export type FeatureRendererProps = { exercise: ExerciseDefinition };
export type FeatureRenderer = ComponentType<FeatureRendererProps>;
