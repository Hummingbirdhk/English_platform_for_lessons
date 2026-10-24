import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { StudentsPage } from '../../../src/pages/students/StudentsPage';
import { StudentPage } from '../../../src/pages/students/StudentPage';

describe('Students', () => {
  it('lists active learning profiles', () => {
    render(
      <MemoryRouter>
        <StudentsPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Злата')).toBeInTheDocument();
    expect(screen.getByText('Артём')).toBeInTheDocument();
    expect(screen.getAllByText(/Spotlight 6/i)).toHaveLength(2);
  });

  it('shows assigned materials and revision focus', () => {
    render(
      <MemoryRouter initialEntries={['/students/student-zlata']}>
        <Routes>
          <Route path="/students/:studentId" element={<StudentPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Злата' })).toBeInTheDocument();
    expect(screen.getByText('adverbs of frequency')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Present Simple' })).toHaveAttribute(
      'href',
      '/materials/grammar-present-simple',
    );
  });
});
