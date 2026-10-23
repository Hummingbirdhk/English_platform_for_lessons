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
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#9999ff',
              colorText: '#111114',
              colorBgLayout: '#f7f7f4',
              colorBorder: '#e8e8e5',
              borderRadius: 18,
              borderRadiusLG: 28,
              fontSize: 16,
              fontFamily:
                "'TT Travels Next Trial Variable', 'TT Travels Next', Inter, ui-sans-serif, system-ui, sans-serif",
            },
          }}
        >
          <HashRouter>{children}</HashRouter>
        </ConfigProvider>
      </Provider>
    </AppErrorBoundary>
  );
}
