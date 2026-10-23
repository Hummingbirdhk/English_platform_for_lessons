import { Card, Space, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import type { StudentProfile } from '../../content/types';

export function StudentCard({ student }: { student: StudentProfile }) {
  return (
    <Link to={`/students/${student.id}`} className="resource-card-link">
      <Card hoverable className="resource-card">
        <Space direction="vertical" size="small">
          <Typography.Title level={4} style={{ margin: 0 }}>
            {student.displayName}
          </Typography.Title>
          <Space wrap>
            <Tag>Grade {student.grade}</Tag>
            <Tag>{student.level}</Tag>
          </Space>
          <Typography.Text type="secondary">{student.curriculum}</Typography.Text>
          <Typography.Text>{student.currentFocus.join(' · ')}</Typography.Text>
        </Space>
      </Card>
    </Link>
  );
}
