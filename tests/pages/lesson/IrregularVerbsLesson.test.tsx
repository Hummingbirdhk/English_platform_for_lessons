import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { IrregularVerbsLesson } from '../../../src/pages/lesson/IrregularVerbsLesson';

describe('IrregularVerbsLesson', () => {
  it('allows learners to interact with all six exercises and check answers', async () => {
    const user = userEvent.setup();
    render(<IrregularVerbsLesson />);

    await user.selectOptions(screen.getByLabelText('Verb type for travel'), 'regular');
    await user.click(screen.getByRole('button', { name: 'Check answers' }));
    expect(screen.getByText('1 / 8')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '2', exact: true }));
    await user.type(screen.getAllByPlaceholderText('Past Simple form…')[0], 'found');
    await user.click(screen.getByRole('button', { name: 'Check answers' }));
    expect(screen.getByText('1 / 5')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '3', exact: true }));
    expect(screen.getByText('SENTENCE 5')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Although' }));
    expect(screen.getByRole('button', { name: 'Although', exact: true })).toBeInTheDocument();
    await user.click(screen.getAllByRole('button', { name: '↺ Reset' })[0]);
    expect(screen.getAllByText('Click the words below to build your sentence…')).toHaveLength(5);

    await user.click(screen.getByRole('button', { name: '4', exact: true }));
    await user.type(screen.getAllByPlaceholderText('Past Simple form…')[0], 'went');
    await user.click(screen.getByRole('button', { name: 'Check answers' }));
    expect(screen.getByText('1 / 8')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '5', exact: true }));
    const firstTrue = screen.getAllByRole('radio', { name: 'True' })[0];
    await user.click(firstTrue);
    expect(firstTrue).toBeChecked();
    await user.click(screen.getByRole('button', { name: 'Check answers' }));
    expect(screen.getByText('1 / 5')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '6', exact: true }));
    await user.selectOptions(screen.getByLabelText('Past Simple of begin'), 'began');
    await user.click(screen.getByRole('button', { name: 'Check answers' }));
    expect(screen.getByText('1 / 8')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '1', exact: true }));
    expect(screen.getByLabelText('Verb type for travel')).toHaveValue('regular');
  });
});
