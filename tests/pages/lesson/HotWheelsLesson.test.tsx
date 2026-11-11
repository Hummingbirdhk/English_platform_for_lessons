import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import {
  HotWheelsLesson,
  readingParagraphs,
  readingWordCount,
} from '../../../src/pages/lesson/HotWheelsLesson';

describe('Spotlight Module 3c Hot Wheels', () => {
  it('has exactly 150 original reading words', () => {
    expect(readingParagraphs.join(' ').trim().split(/\s+/)).toHaveLength(150);
    expect(readingWordCount).toBe(150);
  });

  it('keeps all five exercises interactive and preserves answers', async () => {
    const user = userEvent.setup();
    render(<HotWheelsLesson />);

    await user.selectOptions(screen.getByLabelText('Vocabulary answer 1'), 'helmet');
    await user.click(screen.getByRole('button', { name: 'Check answers' }));
    expect(screen.getByText('1 / 8')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '2' }));
    await user.click(screen.getByRole('checkbox', { name: 'Sentence 1: who' }));
    await user.click(screen.getByRole('checkbox', { name: 'Sentence 1: that' }));
    await user.click(screen.getByRole('button', { name: 'Check answers' }));
    expect(screen.getByText('1 / 7')).toBeInTheDocument();
    await user.click(screen.getByRole('checkbox', { name: 'Sentence 1: that' }));
    await user.click(screen.getByRole('button', { name: 'Check answers' }));
    expect(screen.getByText('0 / 7')).toBeInTheDocument();
    await user.click(screen.getByRole('checkbox', { name: 'Sentence 1: that' }));

    await user.click(screen.getByRole('button', { name: '3' }));
    await user.click(
      screen.getByRole('radio', { name: 'Mia met an instructor who works at the karting club.' }),
    );
    await user.click(screen.getByRole('button', { name: 'Check answers' }));
    expect(screen.getByText('1 / 5')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '4' }));
    expect(screen.getByText('READING · 150 WORDS')).toBeInTheDocument();
    await user.click(screen.getByRole('radio', { name: 'Her brother Leo' }));
    await user.click(screen.getByRole('button', { name: 'Check answers' }));
    expect(screen.getByText('1 / 5')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '5' }));
    await user.click(screen.getByRole('radio', { name: 'the UK' }));
    await user.type(
      screen.getByLabelText('Your short article'),
      'Sofia is a driver who likes karting. Her team is great.',
    );
    await user.click(screen.getByRole('button', { name: 'Check writing requirements' }));
    expect(screen.getByText('• Aim for 60–80 words.')).toBeInTheDocument();
    expect(screen.getByText('• Try to use at least two relative pronouns.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Show sample answer' }));
    expect(
      screen.getByText(/Sofia Reed is a seventeen-year-old karting driver/),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Check answers' }));
    expect(screen.getByText('1 / 4')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '1' }));
    expect(screen.getByLabelText('Vocabulary answer 1')).toHaveValue('helmet');
    await user.click(screen.getByRole('button', { name: '2' }));
    expect(screen.getByRole('checkbox', { name: 'Sentence 1: who' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Sentence 1: that' })).toBeChecked();
  });
});
