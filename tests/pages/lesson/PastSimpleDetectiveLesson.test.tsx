import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import {
  PastSimpleDetectiveLesson,
  pastOf,
  starterBases,
  storyBases,
  storyPreview,
} from '../../../src/pages/lesson/PastSimpleDetectiveLesson';
import vocabulary from '../../../src/content/knowledge/vocabulary/irregular-verbs.json';

describe('Past Simple Detective Club', () => {
  it('uses the platform verb bank and only first and second forms', () => {
    for (const base of [...starterBases, ...storyBases]) {
      const verb = vocabulary.items.find((entry) => entry.base === base);
      expect(verb?.level).toBe('A2');
      expect(pastOf(base)).toBe(verb?.past);
    }
    expect(storyPreview.join(' ')).toContain('[8]');
    expect(storyPreview.join(' ')).not.toContain('[9]');
  });

  it('checks each of five activities and retains answers between screens', async () => {
    const user = userEvent.setup();
    render(<PastSimpleDetectiveLesson />);

    await user.click(screen.getByRole('radio', { name: 'V2 of begin: began' }));
    await user.click(screen.getByRole('button', { name: 'Check answers' }));
    expect(screen.getByText('1 / 8')).toBeInTheDocument();

    await user.click(
      within(screen.getByRole('navigation', { name: 'Choose exercise' })).getByRole('button', { name: '2' }),
    );
    await user.type(screen.getByRole('textbox', { name: 'Sentence 1 answer' }), 'went');
    await user.type(screen.getByRole('textbox', { name: 'Sentence 4 answer' }), 'know');
    await user.type(screen.getByRole('textbox', { name: 'Sentence 5 answer' }), 'take');
    await user.click(screen.getByRole('button', { name: 'Check answers' }));
    expect(screen.getByText('3 / 6')).toBeInTheDocument();

    await user.click(
      within(screen.getByRole('navigation', { name: 'Choose exercise' })).getByRole('button', { name: '3' }),
    );
    expect(screen.getAllByText('The Case of the Missing Mascot')).toHaveLength(2);
    await user.type(screen.getByRole('textbox', { name: /Story gap 1/ }), 'went');
    await user.click(screen.getByRole('button', { name: 'Check answers' }));
    expect(screen.getByText('1 / 8')).toBeInTheDocument();

    await user.click(
      within(screen.getByRole('navigation', { name: 'Choose exercise' })).getByRole('button', { name: '4' }),
    );
    await user.click(screen.getByRole('radio', { name: 'Clue 1: true' }));
    await user.click(screen.getByRole('button', { name: 'Check answers' }));
    expect(screen.getByText('1 / 5')).toBeInTheDocument();

    await user.click(
      within(screen.getByRole('navigation', { name: 'Choose exercise' })).getByRole('button', { name: '5' }),
    );
    await user.click(screen.getByRole('radio', { name: 'Correction 1: went' }));
    await user.click(screen.getByRole('radio', { name: 'Correction 3: find' }));
    await user.click(screen.getByRole('radio', { name: 'Correction 4: take' }));
    await user.click(screen.getByRole('radio', { name: 'Correction 6: were' }));
    await user.click(screen.getByRole('button', { name: 'Check answers' }));
    expect(screen.getByText('4 / 6')).toBeInTheDocument();

    await user.click(
      within(screen.getByRole('navigation', { name: 'Choose exercise' })).getByRole('button', { name: '2' }),
    );
    expect(screen.getByRole('textbox', { name: 'Sentence 4 answer' })).toHaveValue('know');
    await user.click(
      within(screen.getByRole('navigation', { name: 'Choose exercise' })).getByRole('button', { name: '1' }),
    );
    expect(screen.getByRole('radio', { name: 'V2 of begin: began' })).toBeChecked();
  });
});
