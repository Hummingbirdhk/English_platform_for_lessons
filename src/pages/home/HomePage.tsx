import { BookOutlined, ReadOutlined, TeamOutlined } from '@ant-design/icons';
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
      description: 'Grammar, vocabulary, reading и video в одной библиотеке.',
      icon: <BookOutlined />,
      count: materials.length,
    },
    {
      to: '/lessons',
      title: 'Уроки',
      description: 'Готовые занятия, собранные из переиспользуемых материалов.',
      icon: <ReadOutlined />,
      count: lessons.length,
    },
    {
      to: '/students',
      title: 'Ученики',
      description: 'Учебные профили, текущие темы и материалы для повторения.',
      icon: <TeamOutlined />,
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
                  <div className="dashboard-card__icon">{section.icon}</div>
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
