import { useTeacherAuth } from '../../features/teacher-auth/teacherAuthStore';
import { loadAllContent } from '../../content/loadContent';
import { BrandArtifact } from '../../shared/ui/BrandArtifacts';
import { GlossyActionLink } from '../../shared/ui/GlossyActionButton';

export function HomePage() {
  const { lessons, materials, students } = loadAllContent();
  const auth = useTeacherAuth();
  const isStudent =
    auth.status === 'authenticated' && auth.role === 'student' && Boolean(auth.studentId);
  const sections = [
    {
      to: '/materials',
      title: 'Материалы',
      description: 'Грамматика, лексика и темы для изучения',
      count: materials.length,
      color: 'orange',
      artifact: 'spark' as const,
    },
    {
      to: '/lessons',
      title: 'Уроки',
      description: 'Готовые уроки для тренировки и проверки знаний учеников',
      count: lessons.length,
      color: 'purple',
      artifact: 'fire' as const,
    },
    {
      to: isStudent ? `/students/${auth.studentId}` : '/students',
      title: isStudent ? 'Профиль ученика' : 'Ученики',
      description: isStudent
        ? 'Твоя успеваемость, домашка и материалы для изучения'
        : 'Успеваемость моих учеников',
      count: isStudent ? null : students.length,
      color: 'lemon',
      artifact: 'smile' as const,
    },
  ];

  return (
    <main className="page-shell home-page">
      <section className="home-hero">
        <div className="home-hero__copy">
          <div className="eyebrow">ТВОЯ АНГЛИЙСКАЯ ПЛАТФОРМА</div>
          <h1>{isStudent ? 'Что изучаем сегодня?' : 'Чему будем учить сегодня?'}</h1>
          <p>
            {isStudent
              ? 'Все материалы, уроки и твой прогресс — всё в одном месте'
              : 'Все материалы, уроки и прогресс учеников — в одном месте.'}
          </p>
        </div>
        <BrandArtifact kind="spark" className="home-hero__spark" />
        <BrandArtifact kind="smile" className="home-hero__smile" />
        <BrandArtifact kind="fire" className="home-hero__fire" />
      </section>

      <section className="section-entry-grid" aria-label="Основные разделы">
        {sections.map((section) => (
          <article key={section.to} className={`section-entry section-entry--${section.color}`}>
            {section.count !== null ? (
              <span className="section-entry__meta">{section.count} В БАЗЕ</span>
            ) : null}
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

      <section className="home-bottom-grid home-bottom-grid--reading">
        <article className="quick-card">
          <div className="quick-card__title">Словарь</div>
          <div className="quick-card__meta">Слова и фразы с переводом и объяснением</div>
          <GlossyActionLink
            to="/dictionary"
            label="Открыть словарь"
            size="sm"
            className="quick-card__action"
          />
        </article>
        <article className="quick-card quick-card--reading">
          <div className="quick-card__title">Библиотека текстов</div>
          <div className="quick-card__meta">Читайте, переводите и делайте задания</div>
          <GlossyActionLink
            to="/reading"
            label="Открыть библиотеку текстов"
            size="sm"
            className="quick-card__action"
          />
        </article>
      </section>
    </main>
  );
}
