import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findStudentById, loadAllContent } from '../../content/loadContent';
import { cloudClient } from '../../shared/config/cloud';

export function StudentOwnPage() {
  const { studentId } = useParams();
  const student = studentId ? findStudentById(studentId) : undefined;
  const content = loadAllContent();
  const [focus, setFocus] = useState('');
  const [homework, setHomework] = useState('');
  const [error, setError] = useState('');
  const [materialIds, setMaterialIds] = useState<string[]>([]);
  const [lessonIds, setLessonIds] = useState<string[]>([]);

  useEffect(() => {
    if (!studentId) return;
    let active = true;
    void Promise.all([
      cloudClient.select<Array<{ focus_main: string | null; current_homework: string | null }>>(
        'student_profile_state',
        `select=focus_main,current_homework&student_id=eq.${encodeURIComponent(studentId)}&limit=1`,
      ),
      cloudClient.select<Array<{ material_id: string }>>('assigned_materials',
        `select=material_id&student_id=eq.${encodeURIComponent(studentId)}`),
      cloudClient.select<Array<{ lesson_id: string }>>('assigned_lessons',
        `select=lesson_id&student_id=eq.${encodeURIComponent(studentId)}`),
    ])
      .then(([rows, materials, lessons]) => {
        if (!active) return;
        setFocus(rows[0]?.focus_main ?? '');
        setHomework(rows[0]?.current_homework ?? '');
        setMaterialIds(materials.map((row) => row.material_id));
        setLessonIds(lessons.map((row) => row.lesson_id));
      })
      .catch(() => {
        if (active) setError('Не удалось загрузить профиль.');
      });
    return () => {
      active = false;
    };
  }, [studentId]);

  const assignedMaterials = content.materials.filter((item) => materialIds.includes(item.id));
  const assignedLessons = content.lessons.filter((item) => lessonIds.includes(item.id));

  return (
    <main className="page-shell student-page">
      <section className="student-hero">
        <div>
          <h1>{student?.displayName ?? 'Мой профиль'}</h1>
          <p>{error || 'Материалы и задания преподавателя'}</p>
        </div>
      </section>
      <article className="student-panel student-panel--focus">
        <h2>Сейчас изучаем</h2>
        <p>{focus || 'Пока не назначено'}</p>
        <h2>Домашнее задание</h2>
        <p>{homework || 'Пока нет задания'}</p>
      </article>
      <section className="student-bottom-grid">
        <article className="student-materials-panel">
          <h2>Мои материалы</h2>
          <div className="assigned-list">
            {assignedMaterials.map((material) => (
              <Link key={material.id} to={`/materials/${material.id}`} className="assigned-row">
                <span className="assigned-row__title">{material.title}</span>
              </Link>
            ))}
          </div>
        </article>
        <article className="student-progress-panel">
          <h2>Мои уроки</h2>
          <div className="assigned-list">
            {assignedLessons.map((lesson) => (
              <Link key={lesson.id} to={`/lesson/${lesson.id}`} className="assigned-row">
                <span className="assigned-row__title">{lesson.title}</span>
              </Link>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
