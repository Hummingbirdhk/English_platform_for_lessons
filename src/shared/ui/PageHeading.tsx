import { Space, Typography } from 'antd';
import type { ReactNode } from 'react';

export function PageHeading({
  title,
  description,
  extra,
}: {
  title: string;
  description?: string;
  extra?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <Typography.Title level={1} className="page-heading__title">
          {title}
        </Typography.Title>
        {description ? (
          <Typography.Paragraph type="secondary" className="page-heading__description">
            {description}
          </Typography.Paragraph>
        ) : null}
      </div>
      {extra ? <Space>{extra}</Space> : null}
    </div>
  );
}
