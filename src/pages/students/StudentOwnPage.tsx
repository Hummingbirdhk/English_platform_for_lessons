import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { cloudClient } from '../../shared/config/cloud';

export function StudentOwnPage() {
  const { studentId } = useParams();
  const [focus, setFocus] = useState('');
  const [homework, setHomework] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!studentId) return;
    let active = true;
    void cloudClient.select<Array<{ focus_main: string | null; current_homework: string | null }>>(
      'student_profile_state',
      `select=focus_main,current_homework&student_id=eq.${encodeURIComponent(studentId)}&limit=1`,
    ).then((rows) => {
      if (!active) return;
      setFocus(rows[0]?.focus_main ?? '');
      setHomework(rows[0]?.current_homework ?? '');
    }).catch(() => {
      if (active) setError('Не удалось загрузить профиль.');
    });
    return () => { active = false; };
  }, [studentId]);

  return (
    <main className="page-shell student-page">
      <section className="student-hero">
        <div>
          <h1>Мой профиль</h1>
          <p>{error || 'Материалы и задания преподавателя'}</p>
        </div>
      </section>
      <article className="student-panel student-panel--focus">
        <h2>Сейчас изучаем</h2>
        <p>{focus || 'Пока не назначено'}</p>
        <h2>Домашнее задание</h2>
        <p>{homework || 'Пока нет задания'}</p>
      </article>
    </main>
  );
}
