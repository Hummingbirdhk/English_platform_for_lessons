import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { MultipleChoiceExercise } from '../../../src/features/multiple-choice/ui/MultipleChoiceExercise';

describe('MultipleChoiceExercise', () => {
  it('works through props without a Redux Provider', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onSubmit = vi.fn();
    render(
      <MultipleChoiceExercise
        prompt="Choose"
        options={[
          { id: 'a', text: 'Option A' },
          { id: 'b', text: 'Option B' },
        ]}
        selectedOptionId="a"
        status="idle"
        onSelect={onSelect}
        onSubmit={onSubmit}
      />,
    );
    await user.click(screen.getByLabelText('Option B'));
    await user.click(screen.getByRole('button', { name: /check answer/i }));
    expect(onSelect).toHaveBeenCalledWith('b');
    expect(onSubmit).toHaveBeenCalledOnce();
  });
});
