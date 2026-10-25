import { useEffect, useState } from 'react';
import './studentOwnPage.css';
import { Link, useParams } from 'react-router-dom';
import { findStudentById, loadAllContent } from '../../content/loadContent';
import { getStudentSchedule, parseScheduleDateTime } from '../../content/teacher/teacherSchedule';
import { cloudClient } from '../../shared/config/cloud';
import { useTeacherAuth } from '../../features/teacher-auth/teacherAuthStore';

type HomeworkEntry = {
  student_id: string;
  lesson_date: string;
  workbook: string;
  textbook: string;
  extra_task: string;
  updated_at: string;
};

type HistoryRow = {
  id: string;
  lesson_date: string;
  title: string;
  detail: string | null;
  homework: string | null;
};

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
  const scheduledDates = getStudentSchedule(studentId ?? '')
    .filter((item) => item.attendance !== 'Отмена' && item.attendance !== 'Перенос занятия')
    .map((item) => parseScheduleDateTime(item.dateTime).toISOString().slice(0, 10));
  const [focus, setFocus] = useState({ main: '', practice: '', revision: '' });
  const [loaded, setLoaded] = useState(false);
  const [homework, setHomework] = useState('');
  const [error, setError] = useState('');
  const [materialIds, setMaterialIds] = useState<string[]>([]);
  const [lessonIds, setLessonIds] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryRow[]>([]);
  const [homeworkEntries, setHomeworkEntries] = useState<HomeworkEntry[]>([]);
  const [homeworkDate, setHomeworkDate] = useState('');
  const [workbook, setWorkbook] = useState('');
  const [textbook, setTextbook] = useState('');
  const [extraTask, setExtraTask] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

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
      cloudClient.select<HistoryRow[]>(
        'lesson_history',
        `select=id,lesson_date,title,detail,homework&student_id=eq.${encodeURIComponent(studentId)}&order=lesson_date.desc&limit=5`,
      ),
      cloudClient.select<HomeworkEntry[]>(
        'student_homework_entries',
        `select=student_id,lesson_date,workbook,textbook,extra_task,updated_at&student_id=eq.${encodeURIComponent(studentId)}&order=lesson_date.desc&limit=20`,
      ),
    ])
      .then(([rows, materials, lessons, historyRows, homeworkRows]) => {
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
        setHistory(historyRows);
        setHomeworkEntries(homeworkRows);
        const today = new Date().toISOString().slice(0, 10);
        const lessonDates = getStudentSchedule(studentId)
          .filter((item) => item.attendance !== 'Отмена' && item.attendance !== 'Перенос занятия')
          .map((item) => parseScheduleDateTime(item.dateTime).toISOString().slice(0, 10));
        const selectedDate = lessonDates.find((date) => date >= today) ?? lessonDates.at(-1) ?? '';
        const currentEntry = homeworkRows.find((item) => item.lesson_date === selectedDate);
        setHomeworkDate(selectedDate);
        setWorkbook(currentEntry?.workbook ?? '');
        setTextbook(currentEntry?.textbook ?? '');
        setExtraTask(currentEntry?.extra_task ?? '');
      })
      .catch(() => {
        if (active) setError('Не удалось загрузить профиль.');
      });
    return () => {
      active = false;
    };
  }, [studentId]);

  function selectHomeworkDate(date: string) {
    setHomeworkDate(date);
    const entry = homeworkEntries.find((item) => item.lesson_date === date);
    setWorkbook(entry?.workbook ?? '');
    setTextbook(entry?.textbook ?? '');
    setExtraTask(entry?.extra_task ?? '');
    setSaveMessage('');
  }

  async function saveHomework() {
    if (!studentId || !homeworkDate || saving) return;
    setSaving(true);
    setSaveMessage('');
    try {
      const session = cloudClient.getSession();
      if (!session) throw new Error('Нет активной сессии.');
      const rows = await cloudClient.upsert<HomeworkEntry[]>(
        'student_homework_entries',
        'on_conflict=student_id,lesson_date',
        {
          student_id: studentId,
          lesson_date: homeworkDate,
          workbook,
          textbook,
          extra_task: extraTask,
          updated_by: session.user.id,
          updated_at: new Date().toISOString(),
        },
      );
      if (!rows?.length) throw new Error('Сохранение не подтверждено.');
      setHomeworkEntries((current) =>
        [...current.filter((item) => item.lesson_date !== homeworkDate), rows[0]].sort((a, b) =>
          b.lesson_date.localeCompare(a.lesson_date),
        ),
      );
      setSaveMessage('Домашнее задание сохранено');
    } catch {
      setSaveMessage('Не удалось сохранить. Проверь подключение и права доступа.');
    } finally {
      setSaving(false);
    }
  }

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
        <button type="button" className="student-own-logout" onClick={() => void auth.signOut()}>
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
          <div className="student-own-homework-form">
            <label htmlFor="homework-date">Дата занятия</label>
            <select
              id="homework-date"
              value={homeworkDate}
              onChange={(event) => selectHomeworkDate(event.target.value)}
            >
              <option value="">Выбрать дату занятия</option>
              {scheduledDates.map((date) => (
                <option key={date} value={date}>
                  {date.split('-').reverse().join('.')}
                </option>
              ))}
            </select>
            <label htmlFor="homework-workbook">Рабочая тетрадь</label>
            <textarea
              id="homework-workbook"
              value={workbook}
              onChange={(event) => setWorkbook(event.target.value)}
              rows={2}
            />
            <label htmlFor="homework-textbook">Учебник</label>
            <textarea
              id="homework-textbook"
              value={textbook}
              onChange={(event) => setTextbook(event.target.value)}
              rows={2}
            />
            <label htmlFor="homework-extra">Дополнительное задание</label>
            <textarea
              id="homework-extra"
              value={extraTask}
              onChange={(event) => setExtraTask(event.target.value)}
              rows={2}
            />
            <button
              type="button"
              onClick={() => void saveHomework()}
              disabled={saving || !homeworkDate}
            >
              {saving ? 'Сохраняю…' : 'Сохранить домашку'}
            </button>
            {saveMessage ? <p role="status">{saveMessage}</p> : null}
            {homeworkEntries.length > 1 ? (
              <div className="student-own-homework-dates">
                <span>Предыдущие занятия</span>
                {homeworkEntries.map((entry) => (
                  <button
                    key={entry.lesson_date}
                    type="button"
                    onClick={() => selectHomeworkDate(entry.lesson_date)}
                  >
                    {entry.lesson_date}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
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
          <h3>Что предстоит пройти</h3>
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
          <h3>Что прошли</h3>
          {history.length ? (
            <div className="student-own-history">
              {history.map((entry) => (
                <div className="student-own-history-entry" key={entry.id}>
                  <time dateTime={entry.lesson_date}>{entry.lesson_date}</time>
                  <strong>{entry.title}</strong>
                  {entry.detail ? <p>{entry.detail}</p> : null}
                  {entry.homework ? <small>Домашнее задание: {entry.homework}</small> : null}
                </div>
              ))}
            </div>
          ) : (
            <p>Пока нет итогов занятий.</p>
          )}
        </article>
      </section>
    </main>
  );
}
