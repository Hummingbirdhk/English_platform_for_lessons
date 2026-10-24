import { loadAllContent } from '../../content/loadContent';
import { StudentCard } from '../../entities/student/StudentCard';

export function StudentsPage() {
  const { students } = loadAllContent();

  return (
    <main className="page-shell students-page">
      <section className="page-hero page-hero--lemon">
        <div>
          <span className="sticker sticker--white">УЧЕНИКИ</span>
          <h1>Учебные профили</h1>
          <p>Текущие темы, повторение и назначенные материалы — в одном спокойном пространстве.</p>
        </div>
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
