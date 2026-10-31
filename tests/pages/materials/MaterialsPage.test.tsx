import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { MaterialsPage } from '../../../src/pages/materials/MaterialsPage';

describe('MaterialsPage', () => {
  it('shows reusable materials and filters them by search', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <MaterialsPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Present Simple')).toBeInTheDocument();
    expect(screen.getByText('Daily Routine Time')).toBeInTheDocument();

    await user.type(screen.getByRole('searchbox'), 'Present Simple');

    expect(screen.getByText('Present Simple')).toBeInTheDocument();
    expect(screen.queryByText('Daily Routine Time')).not.toBeInTheDocument();
  });

  it('offers an explicit topic filter', () => {
    render(
      <MemoryRouter>
        <MaterialsPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('combobox', { name: /filter by topic/i })).toBeInTheDocument();
  });
});
