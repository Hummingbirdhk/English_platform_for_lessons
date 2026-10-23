import { Result } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { findStudentById, loadAllContent } from '../../content/loadContent';
import { BrandArtifact } from '../../shared/ui/BrandArtifacts';

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
    <main className="page-shell student-page">
      <section className="student-hero">
        <div>
          <h1>{student.displayName}</h1>
          <p>
            Grade {student.grade} · {student.level} · {student.curriculum}
          </p>
          <div className="student-hero__chips">
            {student.currentFocus.map((topic, index) => (
              <span key={topic} className={index === 0 ? 'sticker sticker--dark' : 'level-chip'}>
                {index === 0 ? `СЕЙЧАС: ${topic}` : topic}
              </span>
            ))}
          </div>
        </div>
        <BrandArtifact kind="spark" className="student-hero__spark" />
        <BrandArtifact kind="smile" className="student-hero__smile" />
      </section>

      <section className="student-top-grid">
        <article className="student-panel student-panel--focus">
          <span className="sticker sticker--purple">СЕЙЧАС ИЗУЧАЕМ</span>
          <h2>{student.currentFocus[0]}</h2>
          <p>{student.currentFocus.slice(1).join(' · ') || 'Текущая тема'}</p>
          <div className="progress-track" aria-hidden="true">
            <div className="progress-track__fill" />
          </div>
        </article>

        <article className="student-panel student-panel--revision">
          <span className="sticker sticker--lemon">НУЖНО ПОВТОРИТЬ</span>
          <div className="revision-chips">
            {student.revisionTopics.map((topic) => (
              <span key={topic} className="level-chip">
                {topic}
              </span>
            ))}
          </div>
          <p>{student.revisionTopics.length} темы на повторение</p>
        </article>
      </section>

      <section className="student-bottom-grid">
        <article className="student-materials-panel">
          <h2>Материалы для {student.displayName.replace(/\.$/, '')}</h2>
          <div className="assigned-list">
            {assignedMaterials.map((material) => (
              <Link key={material.id} to={`/materials/${material.id}`} className="assigned-row" aria-label={material.title}>
                <span className={`assigned-row__dot assigned-row__dot--${material.type}`} />
                <span className="assigned-row__title">{material.title}</span>
                <span className="assigned-row__type">{material.type}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </article>

        <article className="student-progress-panel">
          <BrandArtifact kind="spark" className="student-progress-panel__spark" />
          <h2>Прогресс</h2>
          <div className="student-progress-panel__number">{student.completedTopics.length}</div>
          <p>тем пройдено</p>
          <div className="student-progress-panel__next">Следующий урок</div>
          {assignedLessons[0] ? (
            <Link to={`/lesson/${assignedLessons[0].id}`}>{assignedLessons[0].title} →</Link>
          ) : (
            <span>Пока не назначен</span>
          )}
        </article>
      </section>
    </main>
  );
}
