import { loadAllContent } from '../../content/loadContent';
import { BrandArtifact } from '../../shared/ui/BrandArtifacts';
import { GlossyActionLink } from '../../shared/ui/GlossyActionButton';

export function HomePage() {
  const { lessons, materials, students } = loadAllContent();
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
          <article key={section.to} className={`section-entry section-entry--${section.color}`}>
            <span className="section-entry__meta">{section.count} В БАЗЕ</span>
            <BrandArtifact kind={section.artifact} className="section-entry__artifact" />
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            <GlossyActionLink
              to={section.to}
              label={section.title}
              size="md"
              className="section-entry__action"
            />
          </article>
        ))}
      </section>

      <section className="home-bottom-grid home-bottom-grid--single">
        <article className="quick-card">
          <div className="quick-card__title">Открыть библиотеку материалов</div>
          <div className="quick-card__meta">Grammar, vocabulary, reading и video</div>
          <GlossyActionLink
            to="/materials"
            label="Открыть библиотеку материалов"
            size="sm"
            className="quick-card__action"
          />
        </article>
      </section>
    </main>
  );
}
