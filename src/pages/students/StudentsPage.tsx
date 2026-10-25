import { Navigate } from 'react-router-dom';
import { useTeacherAuth } from '../../features/teacher-auth/teacherAuthStore';
import { loadAllContent } from '../../content/loadContent';
import { StudentCard } from '../../entities/student/StudentCard';
import { BrandArtifact } from '../../shared/ui/BrandArtifacts';

export function StudentsPage() {
  const { students } = loadAllContent();
  const auth = useTeacherAuth();
  if (auth.configured && auth.status === 'checking') {
    return <main className="page-shell">Проверяю доступ…</main>;
  }
  if (auth.configured && auth.status !== 'authenticated') {
    return <Navigate to="/student/login" replace />;
  }
  if (
    auth.configured &&
    auth.status === 'authenticated' &&
    auth.role === 'student' &&
    auth.studentId
  ) {
    return <Navigate to={`/students/${auth.studentId}`} replace />;
  }

  return (
    <main className="page-shell students-page">
      <section className="page-hero page-hero--lemon">
        <div>
          <span className="sticker sticker--white">УЧЕНИКИ</span>
          <h1>Учебные профили</h1>
          <p>Текущие темы, повторение и назначенные материалы — в одном спокойном пространстве.</p>
        </div>
        <BrandArtifact kind="blob-alt" className="page-hero__smile" />
        <BrandArtifact kind="spark" className="page-hero__spark page-hero__spark--orange" />
      </section>

      <div className="privacy-banner">
        Для MVP здесь используются только псевдонимы и учебные данные без чувствительной информации.
      </div>

      <section className="student-grid" aria-label="Ученики">
        {students.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </section>
    </main>
  );
}
