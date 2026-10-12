import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MultipleChoiceStatus } from '../types';
import { evaluateAnswer } from '../lib/evaluateAnswer';
type ExerciseState = { selectedOptionId: string | null; status: MultipleChoiceStatus };
type MultipleChoiceState = Record<string, ExerciseState>;
const initialState: MultipleChoiceState = {};
const multipleChoiceSlice = createSlice({
  name: 'multipleChoice',
  initialState,
  reducers: {
    selectOption(state, action: PayloadAction<{ exerciseId: string; optionId: string }>) {
      state[action.payload.exerciseId] = {
        selectedOptionId: action.payload.optionId,
        status: 'idle',
      };
    },
    submitAnswer(state, action: PayloadAction<{ exerciseId: string; correctOptionId: string }>) {
      const current = state[action.payload.exerciseId] ?? {
        selectedOptionId: null,
        status: 'idle' as const,
      };
      state[action.payload.exerciseId] = {
        ...current,
        status: evaluateAnswer(current.selectedOptionId, action.payload.correctOptionId),
      };
    },
  },
});
export const multipleChoiceActions = multipleChoiceSlice.actions;
export const multipleChoiceReducer = multipleChoiceSlice.reducer;
