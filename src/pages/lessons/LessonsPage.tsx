import { Card, Col, Row, Space, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { loadAllContent } from '../../content/loadContent';
import { PageHeading } from '../../shared/ui/PageHeading';

export function LessonsPage() {
  const { lessons } = loadAllContent();

  return (
    <main className="page-shell">
      <PageHeading
        title="Уроки"
        description="Готовые последовательности из материалов и интерактивных упражнений."
      />
      <Row gutter={[16, 16]}>
        {lessons.map((lesson) => (
          <Col xs={24} md={12} lg={8} key={lesson.id}>
            <Link to={`/lesson/${lesson.id}`} className="resource-card-link">
              <Card hoverable className="resource-card">
                <Space direction="vertical">
                  <Space wrap>
                    <Tag>{lesson.level}</Tag>
                    <Tag>Grade {lesson.grade}</Tag>
                  </Space>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    {lesson.title}
                  </Typography.Title>
                  <Typography.Text type="secondary">{lesson.topic}</Typography.Text>
                  <Typography.Text>{lesson.sections.length} блоков</Typography.Text>
                </Space>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </main>
  );
}
