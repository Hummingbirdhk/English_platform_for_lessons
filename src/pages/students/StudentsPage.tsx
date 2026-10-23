import { Alert, Col, Row } from 'antd';
import { loadAllContent } from '../../content/loadContent';
import { StudentCard } from '../../entities/student/StudentCard';
import { PageHeading } from '../../shared/ui/PageHeading';

export function StudentsPage() {
  const { students } = loadAllContent();

  return (
    <main className="page-shell">
      <PageHeading
        title="Ученики"
        description="Учебные профили: текущие темы, повторение и назначенные материалы."
      />
      <Alert
        className="privacy-note"
        type="info"
        showIcon
        message="Здесь хранятся только учебные и неперсональные данные."
      />
      <Row gutter={[16, 16]}>
        {students.map((student) => (
          <Col xs={24} md={12} lg={8} key={student.id}>
            <StudentCard student={student} />
          </Col>
        ))}
      </Row>
    </main>
  );
}
