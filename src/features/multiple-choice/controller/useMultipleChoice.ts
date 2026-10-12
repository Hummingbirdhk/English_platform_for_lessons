import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { multipleChoiceActions } from '../model/slice';
import { selectMultipleChoiceState } from '../model/selectors';
export function useMultipleChoice(exerciseId:string, correctOptionId:string){ const dispatch=useAppDispatch(); const viewModel=useAppSelector((state)=>selectMultipleChoiceState(state,exerciseId)); const selectOption=useCallback((optionId:string)=>dispatch(multipleChoiceActions.selectOption({exerciseId,optionId})),[dispatch,exerciseId]); const submit=useCallback(()=>dispatch(multipleChoiceActions.submitAnswer({exerciseId,correctOptionId})),[dispatch,exerciseId,correctOptionId]); return {...viewModel,selectOption,submit}; }
