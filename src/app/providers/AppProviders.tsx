import type { PropsWithChildren } from 'react';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { store } from '../store/store';
import { AppErrorBoundary } from '../../shared/ui/AppErrorBoundary';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <AppErrorBoundary>
      <Provider store={store}>
        <ConfigProvider theme={{ token: { borderRadius: 14, fontSize: 16 } }}>
          <HashRouter>{children}</HashRouter>
        </ConfigProvider>
      </Provider>
    </AppErrorBoundary>
  );
}
