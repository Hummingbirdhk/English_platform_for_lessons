import type { ExerciseDefinition, Lesson, Material } from '../../content/types';
import { renderLessonSection } from './sectionRenderers';

export function LessonRenderer({
  lesson,
  exercises,
  materials,
}: {
  lesson: Lesson;
  exercises: ExerciseDefinition[];
  materials: Material[];
}) {
  return (
    <main className="page-shell lesson-page">
      <section className="lesson-hero">
        <div className="lesson-hero__chips">
          <span className="level-chip">{lesson.level}</span>
          <span className="sticker sticker--lemon">GRADE {lesson.grade}</span>
        </div>
        <h1>{lesson.title}</h1>
        <p>{lesson.topic}</p>
        <div className="progress-track lesson-hero__progress" aria-hidden="true">
          <div className="progress-track__fill progress-track__fill--dark" />
        </div>
      </section>

      <section className="lesson-content">
        {lesson.sections.map((section) => renderLessonSection(section, exercises, materials))}
      </section>
    </main>
  );
}
