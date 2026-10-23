import { Card, Col, List, Result, Row, Space, Tag, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { findStudentById, loadAllContent } from '../../content/loadContent';
import { PageHeading } from '../../shared/ui/PageHeading';

export function StudentPage() {
  const { studentId } = useParams();
  const student = studentId ? findStudentById(studentId) : undefined;
  const content = loadAllContent();

  if (!student) {
    return (
      <main className="page-shell">
        <Result status="404" title="Student not found" />
      </main>
    );
  }

  const assignedMaterials = student.assignedMaterialIds
    .map((id) => content.materials.find((material) => material.id === id))
    .filter((material) => material !== undefined);

  const assignedLessons = student.assignedLessonIds
    .map((id) => content.lessons.find((lesson) => lesson.id === id))
    .filter((lesson) => lesson !== undefined);

  return (
    <main className="page-shell">
      <PageHeading
        title={student.displayName}
        description={`Grade ${student.grade} · ${student.level} · ${student.curriculum}`}
      />

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Сейчас изучаем" className="material-block">
            <Space wrap>
              {student.currentFocus.map((topic) => (
                <Tag key={topic}>{topic}</Tag>
              ))}
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Нужно повторить" className="material-block">
            <Space wrap>
              {student.revisionTopics.map((topic) => (
                <Tag key={topic}>{topic}</Tag>
              ))}
            </Space>
          </Card>
        </Col>
        <Col xs={24}>
          <Card title="Уже прошли" className="material-block">
            <Space wrap>
              {student.completedTopics.map((topic) => (
                <Tag key={topic}>{topic}</Tag>
              ))}
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Назначенные материалы" className="material-block">
            <List
              dataSource={assignedMaterials}
              renderItem={(material) => (
                <List.Item>
                  <Link to={`/materials/${material.id}`}>{material.title}</Link>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Назначенные уроки" className="material-block">
            <List
              dataSource={assignedLessons}
              renderItem={(lesson) => (
                <List.Item>
                  <Link to={`/lesson/${lesson.id}`}>{lesson.title}</Link>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Typography.Paragraph type="secondary" className="privacy-footer">
        Профиль используется только для учебного планирования и не содержит личных данных.
      </Typography.Paragraph>
    </main>
  );
}
