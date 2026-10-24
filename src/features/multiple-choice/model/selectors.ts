import type { MultipleChoiceStatus } from '../types';

export type MultipleChoiceSliceState = Record<
  string,
  { selectedOptionId: string | null; status: MultipleChoiceStatus }
>;

const EMPTY_MULTIPLE_CHOICE_STATE = {
  selectedOptionId: null,
  status: 'idle' as const,
};

export function selectMultipleChoiceState(state: MultipleChoiceSliceState, exerciseId: string) {
  return state[exerciseId] ?? EMPTY_MULTIPLE_CHOICE_STATE;
}
