import { useEffect, useState } from 'react';
import './studentOwnPage.css';
import { Link, useParams } from 'react-router-dom';
import { findStudentById, loadAllContent } from '../../content/loadContent';
import { cloudClient } from '../../shared/config/cloud';
import { useTeacherAuth } from '../../features/teacher-auth/teacherAuthStore';

type ProfileDataRow = {
  focus_main: string | null;
  focus_practice: string | null;
  focus_revision: string | null;
  current_homework: string | null;
};

export function StudentOwnPage() {
  const { studentId } = useParams();
  const auth = useTeacherAuth();
  const student = studentId ? findStudentById(studentId) : undefined;
  const content = loadAllContent();
  const [focus, setFocus] = useState({ main: '', practice: '', revision: '' });
  const [loaded, setLoaded] = useState(false);
  const [homework, setHomework] = useState('');
  const [error, setError] = useState('');
  const [materialIds, setMaterialIds] = useState<string[]>([]);
  const [lessonIds, setLessonIds] = useState<string[]>([]);

  useEffect(() => {
    if (!studentId) return;
    let active = true;
    void Promise.all([
      cloudClient.select<ProfileDataRow[]>(
        'student_profile_state',
        `select=focus_main,focus_practice,focus_revision,current_homework&student_id=eq.${encodeURIComponent(studentId)}&limit=1`,
      ),
      cloudClient.select<Array<{ material_id: string }>>(
        'assigned_materials',
        `select=material_id&student_id=eq.${encodeURIComponent(studentId)}`,
      ),
      cloudClient.select<Array<{ lesson_id: string }>>(
        'assigned_lessons',
        `select=lesson_id&student_id=eq.${encodeURIComponent(studentId)}`,
      ),
    ])
      .then(([rows, materials, lessons]) => {
        if (!active) return;
        setFocus({
          main: rows[0]?.focus_main ?? '',
          practice: rows[0]?.focus_practice ?? '',
          revision: rows[0]?.focus_revision ?? '',
        });
        setLoaded(true);
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
    <main className="page-shell student-page student-own-page">
      <section className="student-hero" style={{ background: '#9996fa' }}>
        <div>
          <span className="sticker sticker--white">МОЙ ПРОФИЛЬ</span>
          <h1>Привет, {student?.displayName ?? 'ученик'}!</h1>
          <p>Твой личный кабинет по английскому языку</p>
          {student ? (
            <div className="student-hero__chips">
              <span className="level-chip">Grade {student.grade}</span>
              <span className="level-chip">Уровень {student.level}</span>
              <span className="level-chip">{student.curriculum}</span>
            </div>
          ) : null}
        </div>
        <button type="button" className="teacher-inline-edit" onClick={() => void auth.signOut()}>
          Выйти
        </button>
      </section>

      <section className="student-top-grid">
        <article className="student-panel student-panel--focus" style={{ background: '#fbfb8f' }}>
          <span className="sticker sticker--white">СЕЙЧАС ИЗУЧАЕМ</span>
          <h2>{focus.main || 'Тема пока не назначена'}</h2>
          <div className="revision-chips">
            {focus.practice ? <span className="level-chip">Лексика: {focus.practice}</span> : null}
            {focus.revision ? (
              <span className="level-chip">Грамматика / повторение: {focus.revision}</span>
            ) : null}
          </div>
          {!focus.practice && !focus.revision ? (
            <p>Преподаватель добавит сюда лексику и грамматику по текущей теме.</p>
          ) : null}
        </article>
        <article
          className="student-panel student-panel--revision"
          style={{ background: '#ff825e' }}
        >
          <span className="sticker sticker--white">МОЯ ДОМАШКА</span>
          <h2>Домашнее задание</h2>
          <p>{homework || 'Пока ничего не задано'}</p>
          <p>Рабочая тетрадь · Учебник · Дополнительное задание</p>
          <small>
            Самостоятельное редактирование по датам занятий появится на следующем этапе.
          </small>
        </article>
      </section>

      {error ? <p role="alert">{error}</p> : null}
      {!loaded && !error ? <p>Загружаю данные…</p> : null}
      <section className="student-bottom-grid">
        <article className="student-materials-panel">
          <h2>Мои материалы</h2>
          {assignedMaterials.length ? (
            <div className="assigned-list">
              {assignedMaterials.map((material) => (
                <Link key={material.id} to={`/materials/${material.id}`} className="assigned-row">
                  <span className="assigned-row__title">{material.title}</span>
                  <span className="assigned-row__type">{material.type}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p>
              Материалы пока не назначены. Когда преподаватель добавит материал, он появится здесь.
            </p>
          )}
        </article>
        <article className="student-progress-panel">
          <h2>Мои уроки</h2>
          <p>Что предстоит пройти</p>
          {assignedLessons.length ? (
            <div className="assigned-list">
              {assignedLessons.map((lesson) => (
                <Link key={lesson.id} to={`/lesson/${lesson.id}`} className="assigned-row">
                  <span className="assigned-row__title">{lesson.title}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p>Назначенных уроков пока нет.</p>
          )}
          <p>Что прошли</p>
          <small>История занятий появится после подключения итогов уроков.</small>
        </article>
      </section>
    </main>
  );
}
