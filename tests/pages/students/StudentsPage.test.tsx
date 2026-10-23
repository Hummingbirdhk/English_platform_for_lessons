import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { StudentsPage } from '../../../src/pages/students/StudentsPage';
import { StudentPage } from '../../../src/pages/students/StudentPage';

describe('Students', () => {
  it('lists pseudonymous learning profiles', () => {
    render(
      <MemoryRouter>
        <StudentsPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Маша К.')).toBeInTheDocument();
    expect(screen.getByText(/Spotlight 6/i)).toBeInTheDocument();
  });

  it('shows assigned materials and revision focus', () => {
    render(
      <MemoryRouter initialEntries={['/students/student-maya']}>
        <Routes>
          <Route path="/students/:studentId" element={<StudentPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Маша К.' })).toBeInTheDocument();
    expect(screen.getByText('do / does')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Present Simple' })).toHaveAttribute(
      'href',
      '/materials/grammar-present-simple',
    );
  });
});
