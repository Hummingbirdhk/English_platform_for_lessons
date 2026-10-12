import type { MultipleChoiceExerciseDefinition } from '../../content/types';
import { useMultipleChoice } from './controller/useMultipleChoice';
import { MultipleChoiceExercise } from './ui/MultipleChoiceExercise';
export function MultipleChoiceFeature({
  exercise,
}: {
  exercise: MultipleChoiceExerciseDefinition;
}) {
  const controller = useMultipleChoice(exercise.id, exercise.correctOptionId);
  return (
    <MultipleChoiceExercise
      prompt={exercise.prompt}
      options={exercise.options}
      explanation={exercise.explanation}
      selectedOptionId={controller.selectedOptionId}
      status={controller.status}
      onSelect={controller.selectOption}
      onSubmit={controller.submit}
    />
  );
}
