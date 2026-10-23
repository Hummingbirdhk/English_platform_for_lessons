import { Link } from 'react-router-dom';
import { loadAllContent } from '../../content/loadContent';
import { BrandArtifact } from '../../shared/ui/BrandArtifacts';

export function LessonsPage() {
  const { lessons } = loadAllContent();

  return (
    <main className="page-shell lessons-page">
      <section className="page-hero page-hero--purple">
        <div>
          <span className="sticker sticker--white">УРОКИ</span>
          <h1>Готовые последовательности</h1>
          <p>Собирай занятия из материалов и интерактивных упражнений без дублирования контента.</p>
        </div>
        <BrandArtifact kind="fire" className="page-hero__fire" />
        <BrandArtifact kind="spark" className="page-hero__spark" />
      </section>

      <section className="lesson-library" aria-label="Уроки">
        {lessons.map((lesson) => (
          <Link key={lesson.id} to={`/lesson/${lesson.id}`} className="lesson-tile">
            <div className="lesson-tile__chips">
              <span className="level-chip">{lesson.level}</span>
              <span className="level-chip">Grade {lesson.grade}</span>
            </div>
            <h2>{lesson.title}</h2>
            <p>{lesson.topic}</p>
            <div className="lesson-tile__footer">
              <span>{lesson.sections.length} блоков</span>
              <span aria-hidden="true">→</span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
