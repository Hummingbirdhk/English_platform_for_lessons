import { configureStore } from '@reduxjs/toolkit';
import { multipleChoiceReducer } from '../../features/multiple-choice/model/slice';

export const store = configureStore({
  reducer: { multipleChoice: multipleChoiceReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
