import { AppProviders } from './providers/AppProviders';
import { AppRoutes } from './routing/routes';
import { AppShell } from '../shared/ui/AppShell';
import { useTeacherAuth } from '../features/teacher-auth/teacherAuthStore';

function AuthenticatedShell() {
  const auth = useTeacherAuth();
  const studentId =
    auth.status === 'authenticated' && auth.role === 'student' ? auth.studentId : null;
  return (
    <AppShell studentId={studentId}>
      <AppRoutes />
    </AppShell>
  );
}

export function App() {
  return (
    <AppProviders>
      <AuthenticatedShell />
    </AppProviders>
  );
}
