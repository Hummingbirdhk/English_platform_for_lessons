import type { MultipleChoiceStatus } from '../types';

export type MultipleChoiceSliceState = Record<
  string,
  { selectedOptionId: string | null; status: MultipleChoiceStatus }
>;

export function selectMultipleChoiceState(state: MultipleChoiceSliceState, exerciseId: string) {
  return state[exerciseId] ?? { selectedOptionId: null, status: 'idle' as const };
}
