import { AppProviders } from './providers/AppProviders';
import { AppRoutes } from './routing/routes';
import { AppShell } from '../shared/ui/AppShell';

export function App() {
  return (
    <AppProviders>
      <AppShell>
        <AppRoutes />
      </AppShell>
    </AppProviders>
  );
}
