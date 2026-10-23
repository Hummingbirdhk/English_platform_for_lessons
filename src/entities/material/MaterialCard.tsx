import { Card, Space, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import type { Material } from '../../content/types';

const typeLabels: Record<Material['type'], string> = {
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  reading: 'Reading',
  video: 'Video',
};

export function MaterialCard({ material }: { material: Material }) {
  return (
    <Link to={`/materials/${material.id}`} className="resource-card-link">
      <Card hoverable className="resource-card">
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Space wrap>
            <Tag>{typeLabels[material.type]}</Tag>
            <Tag>{material.level}</Tag>
          </Space>
          <Typography.Title level={4} style={{ margin: 0 }}>
            {material.title}
          </Typography.Title>
          <Typography.Text type="secondary">{material.summary}</Typography.Text>
          <Typography.Text className="resource-card__topic">{material.topic}</Typography.Text>
        </Space>
      </Card>
    </Link>
  );
}
