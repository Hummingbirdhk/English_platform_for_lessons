import { Alert, Button, Space } from 'antd';
import { Component, type PropsWithChildren, type ReactNode } from 'react';

type State = { hasError: boolean };

export class AppErrorBoundary extends Component<PropsWithChildren, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch() {}

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <main className="page-shell">
          <Space direction="vertical" size="middle">
            <Alert
              type="error"
              showIcon
              message="Something went wrong"
              description="Please refresh the page and try again."
            />
            <Button onClick={() => window.location.reload()}>Refresh</Button>
          </Space>
        </main>
      );
    }

    return this.props.children;
  }
}
