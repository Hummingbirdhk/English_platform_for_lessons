import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '../../src/app/App';
import { AppErrorBoundary } from '../../src/shared/ui/AppErrorBoundary';

describe('application shell', () => {
  it('renders primary teacher navigation', () => {
    window.location.hash = '#/';
    render(<App />);

    const navigation = screen.getByRole('navigation', { name: /main navigation/i });
    expect(within(navigation).getByRole('link', { name: /Материалы/i })).toBeInTheDocument();
    expect(within(navigation).getByRole('link', { name: /Уроки/i })).toBeInTheDocument();
    expect(within(navigation).getByRole('link', { name: /Ученики/i })).toBeInTheDocument();
  });

  it('shows a student-safe state for a missing lesson', () => {
    window.location.hash = '#/lesson/missing';
    render(<App />);
    expect(screen.getByText(/lesson not found/i)).toBeInTheDocument();
  });

  it('hides technical error details from students', () => {
    const Broken = () => {
      throw new Error('SECRET_STACK_DETAIL');
    };

    render(
      <AppErrorBoundary>
        <Broken />
      </AppErrorBoundary>,
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.queryByText(/SECRET_STACK_DETAIL/i)).not.toBeInTheDocument();
  });
});
