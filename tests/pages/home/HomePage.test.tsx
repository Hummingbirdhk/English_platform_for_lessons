import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { HomePage } from '../../../src/pages/home/HomePage';

describe('HomePage', () => {
  it('provides entry points to materials, lessons, and students', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    const main = screen.getByRole('main');
    expect(within(main).getByRole('link', { name: /Материалы/i })).toHaveAttribute(
      'href',
      '/materials',
    );
    expect(within(main).getByRole('link', { name: /Уроки/i })).toHaveAttribute(
      'href',
      '/lessons',
    );
    expect(within(main).getByRole('link', { name: /Ученики/i })).toHaveAttribute(
      'href',
      '/students',
    );
  });
});
