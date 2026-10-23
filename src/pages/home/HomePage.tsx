import { Link } from 'react-router-dom';
import { loadAllContent } from '../../content/loadContent';
import { BrandArtifact } from '../../shared/ui/BrandArtifacts';

export function HomePage() {
  const { lessons, materials, students } = loadAllContent();
  const firstLesson = lessons[0];

  const sections = [
    {
      to: '/materials',
      title: 'Материалы',
      description: 'Grammar · Vocabulary · Reading · Video',
      count: materials.length,
      color: 'orange',
      artifact: 'spark' as const,
    },
    {
      to: '/lessons',
      title: 'Уроки',
      description: 'Готовые последовательности и практика',
      count: lessons.length,
      color: 'purple',
      artifact: 'fire' as const,
    },
    {
      to: '/students',
      title: 'Ученики',
      description: 'Текущие темы, повторение и задания',
      count: students.length,
      color: 'lemon',
      artifact: 'smile' as const,
    },
  ];

  return (
    <main className="page-shell home-page">
      <section className="home-hero">
        <div className="home-hero__copy">
          <div className="eyebrow">ТВОЯ АНГЛИЙСКАЯ ПЛАТФОРМА</div>
          <h1>Что изучаем сегодня?</h1>
          <p>Все материалы, уроки и прогресс учеников — в одном месте.</p>
        </div>
        <BrandArtifact kind="spark" className="home-hero__spark" />
        <BrandArtifact kind="smile" className="home-hero__smile" />
        <BrandArtifact kind="fire" className="home-hero__fire" />
      </section>

      <section className="section-entry-grid" aria-label="Основные разделы">
        {sections.map((section) => (
          <Link
            key={section.to}
            to={section.to}
            className={`section-entry section-entry--${section.color}`}
            aria-label={section.title}
          >
            <span className="section-entry__meta">{section.count} В БАЗЕ</span>
            <BrandArtifact kind={section.artifact} className="section-entry__artifact" />
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            <span className="section-entry__arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        ))}
      </section>

      <section className="home-bottom-grid">
        {firstLesson ? (
          <Link to={`/lesson/${firstLesson.id}`} className="continue-card">
            <div>
              <div className="continue-card__title">Продолжить: {firstLesson.title}</div>
              <div className="continue-card__meta">
                {firstLesson.topic} · {firstLesson.level} · Grade {firstLesson.grade}
              </div>
            </div>
            <div className="progress-track" aria-hidden="true">
              <div className="progress-track__fill" />
            </div>
          </Link>
        ) : null}

        <Link to="/materials" className="quick-card">
          <div className="quick-card__title">Открыть библиотеку материалов</div>
          <div className="quick-card__meta">Grammar, vocabulary, reading и video</div>
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
