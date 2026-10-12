import { AppProviders } from './providers/AppProviders';
import { AppRoutes } from './routing/routes';

export function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}
