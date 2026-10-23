import { Card, Col, Row, Space, Statistic, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { loadAllContent } from '../../content/loadContent';
import { PageHeading } from '../../shared/ui/PageHeading';

export function HomePage() {
  const { lessons, materials, students } = loadAllContent();

  const sections = [
    {
      to: '/materials',
      title: 'Материалы',
      eyebrow: 'MATERIALS',
      description: 'Grammar, vocabulary, reading и video в одной библиотеке.',
      count: materials.length,
    },
    {
      to: '/lessons',
      title: 'Уроки',
      eyebrow: 'LESSONS',
      description: 'Готовые занятия, собранные из переиспользуемых материалов.',
      count: lessons.length,
    },
    {
      to: '/students',
      title: 'Ученики',
      eyebrow: 'STUDENTS',
      description: 'Учебные профили, текущие темы и материалы для повторения.',
      count: students.length,
    },
  ];

  return (
    <main className="page-shell">
      <PageHeading
        title="English Lessons"
        description="Рабочее пространство преподавателя: материалы, уроки и учебные профили."
      />

      <Row gutter={[16, 16]}>
        {sections.map((section) => (
          <Col xs={24} md={8} key={section.to}>
            <Link to={section.to} className="resource-card-link" aria-label={section.title}>
              <Card hoverable className="dashboard-card">
                <Space direction="vertical" size="middle">
                  <Typography.Text className="dashboard-card__eyebrow">
                    {section.eyebrow}
                  </Typography.Text>
                  <div>
                    <Typography.Title level={3}>{section.title}</Typography.Title>
                    <Typography.Paragraph type="secondary">
                      {section.description}
                    </Typography.Paragraph>
                  </div>
                  <Statistic value={section.count} suffix="в базе" />
                </Space>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </main>
  );
}
