import type { PropsWithChildren } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useTeacherAuth } from '../teacher-auth/teacherAuthStore';

export function StudentGate({ children }: PropsWithChildren) {
  const { studentId } = useParams();
  const auth = useTeacherAuth();
  if (!auth.configured) return <>{children}</>;
  if (auth.status === 'checking') return <main className="page-shell">Проверяю доступ…</main>;
  if (auth.status !== 'authenticated') return <Navigate to="/student/login" replace />;
  if (auth.role !== 'teacher' && (auth.role !== 'student' || auth.studentId !== studentId)) {
    return <Navigate to="/student/login" replace />;
  }
  return <>{children}</>;
}
