import type { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useTeacherAuth } from './teacherAuthStore';

export function TeacherGate({ children }: PropsWithChildren) {
  const auth = useTeacherAuth();
  const location = useLocation();

  if (!auth.configured) return <>{children}</>;

  if (auth.status === 'checking') {
    return <main className="page-shell teacher-auth-loading">Проверяю доступ…</main>;
  }

  if (auth.status !== 'authenticated') {
    const next = encodeURIComponent(`${location.pathname}${location.search}`);
    return <Navigate to={`/teacher/login?next=${next}`} replace />;
  }

  return <>{children}</>;
}
