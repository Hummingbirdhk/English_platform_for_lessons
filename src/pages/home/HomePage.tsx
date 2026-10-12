import { Card, Col, Row, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { loadAllContent } from '../../content/loadContent';

export function HomePage() {
  const { lessons } = loadAllContent();
  return (
    <main className="page-shell">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Typography.Title>English Lessons</Typography.Title>
          <Typography.Paragraph type="secondary">Interactive English practice for Grade 6 · A2–B1</Typography.Paragraph>
        </div>
        <Row gutter={[16, 16]}>
          {lessons.map((lesson) => (
            <Col xs={24} md={12} lg={8} key={lesson.id}>
              <Link to={`/lesson/${lesson.id}`}><Card hoverable title={lesson.title}>{lesson.topic} · {lesson.level}</Card></Link>
            </Col>
          ))}
        </Row>
      </Space>
    </main>
  );
}
