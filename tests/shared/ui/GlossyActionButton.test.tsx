import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { GlossyActionButton, GlossyActionLink } from '../../../src/shared/ui/GlossyActionButton';

describe('GlossyActionButton', () => {
  it('renders a keyboard-accessible navigation link', () => {
    render(
      <MemoryRouter>
        <GlossyActionLink to="/materials" label="Открыть материалы" />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Открыть материалы' })).toHaveAttribute(
      'href',
      '/materials',
    );
  });

  it('supports a real button action', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<GlossyActionButton label="Следующее задание" onClick={onClick} />);

    await user.click(screen.getByRole('button', { name: 'Следующее задание' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
