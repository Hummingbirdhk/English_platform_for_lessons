export type MultipleChoiceStatus = 'idle' | 'correct' | 'incorrect';
export type MultipleChoiceOption = { id: string; text: string };
export type MultipleChoiceExerciseProps = { prompt: string; options: MultipleChoiceOption[]; selectedOptionId: string | null; status: MultipleChoiceStatus; explanation?: { en: string; ru: string }; onSelect: (id: string) => void; onSubmit: () => void };
