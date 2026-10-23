import { render, screen } from '@testing-library/react';
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

    expect(screen.getByRole('link', { name: /Материалы/i })).toHaveAttribute(
      'href',
      '/materials',
    );
    expect(screen.getByRole('link', { name: /Уроки/i })).toHaveAttribute('href', '/lessons');
    expect(screen.getByRole('link', { name: /Ученики/i })).toHaveAttribute(
      'href',
      '/students',
    );
  });
});
