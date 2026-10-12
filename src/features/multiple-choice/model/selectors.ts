import type { RootState } from '../../../app/store/store';
export function selectMultipleChoiceState(state: RootState, exerciseId: string) {
  return state.multipleChoice[exerciseId] ?? { selectedOptionId: null, status: 'idle' as const };
}
