import { useMemo, useState } from 'react';
import { getStudentSchedule, parseScheduleDateTime } from '../../content/teacher/teacherSchedule';
import { loadAllContent } from '../../content/loadContent';

type AttendanceStatus = 'planned' | 'present' | 'moved' | 'cancelled';

type TeacherStudentDetails = {
  notes: string;
  lessonHistory: Array<{
    date: string;
    title: string;
    detail: string;
    homework: string;
  }>;
};

const teacherDetails: Record<string, TeacherStudentDetails> = {
  'student-zlata': {
    notes:
      'Хорошо понимает правила, но торопится в заданиях и пропускает окончания -s / -es. На следующем уроке повторить daily routine и дать больше коротких устных вопросов.',
    lessonHistory: [
      {
        date: '24.10',
        title: 'Reading + speaking',
        detail: 'A Day in Tom’s Life',
        homework: 'WB: p.23, ex. 2–3',
      },
      {
        date: '10.10',
        title: 'Daily routine',
        detail: 'Vocabulary + speaking',
        homework: '5 предложений о своём дне',
      },
      {
        date: '03.10',
        title: 'Present Simple',
        detail: 'Questions + 3rd person',
        homework: 'WB: p.24, ex. 3',
      },
    ],
  },
  'student-artem': {
    notes:
      'Быстро запоминает лексику, но пока путает формы неправильных глаголов. Лучше работает через короткие игровые задания и визуальные подсказки.',
    lessonHistory: [
      {
        date: '23.10',
        title: 'Speaking practice',
        detail: 'Yesterday / last weekend',
        homework: '8 устных вопросов',
      },
      {
        date: '09.10',
        title: 'Irregular verbs',
        detail: 'go / have / see / make / take',
        homework: 'карточки + WB',
      },
      {
        date: '02.10',
        title: 'Past Simple',
        detail: 'was / were',
        homework: 'WB: p.41, ex. 1–2',
      },
    ],
  },
};

const statusOrder: AttendanceStatus[] = ['planned', 'present', 'moved', 'cancelled'];

const statusLabels: Record<AttendanceStatus, string> = {
  planned: 'Запланировано',
  present: '✓ Был',
  moved: '↔ Перенос',
  cancelled: '× Отмена',
};

const monthNames = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const monthNamesGenitive = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

function readStoredValue(key: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  return window.localStorage.getItem(key) ?? fallback;
}

function getStatus(attendance: string | null): AttendanceStatus {
  if (attendance === 'Пришел' || attendance === 'Пришла') return 'present';
  if (attendance === 'Перенос занятия') return 'moved';
  if (attendance === 'Отмена') return 'cancelled';
  return 'planned';
}

function formatLessonDate(date: Date) {
  return `${date.getUTCDate()} ${monthNamesGenitive[date.getUTCMonth()]}`;
}

function formatLessonTime(date: Date) {
  return `${String(date.getUTCHours()).padStart(2, '0')}:${String(
    date.getUTCMinutes(),
  ).padStart(2, '0')} · 60 минут`;
}

function formatAttendanceDate(date: Date) {
  return `${String(date.getUTCDate()).padStart(2, '0')} ${monthNamesGenitive[
    date.getUTCMonth()
  ]}`;
}

export function TeacherDashboardPage() {
  const { students } = loadAllContent();
  const visibleStudents = useMemo(() => {
    const order = ['student-zlata', 'student-artem'];
    return students
      .filter((student) => teacherDetails[student.id] !== undefined)
      .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  }, [students]);

  const [activeStudentId, setActiveStudentId] = useState(
    visibleStudents.find((student) => student.id === 'student-zlata')?.id ??
      visibleStudents[0]?.id ??
      '',
  );
  const [selectedMonth, setSelectedMonth] = useState({ year: 2026, month: 9 });
  const [attendanceOverrides, setAttendanceOverrides] = useState<
    Record<string, Record<string, AttendanceStatus>>
  >({});
  const [savedStudentId, setSavedStudentId] = useState<string | null>(null);

  const activeStudent =
    visibleStudents.find((student) => student.id === activeStudentId) ?? visibleStudents[0];
  const details = activeStudent ? teacherDetails[activeStudent.id] : undefined;

  const [notesByStudent, setNotesByStudent] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      visibleStudents.map((student) => [
        student.id,
        readStoredValue(`teacher-notes:${student.id}`, teacherDetails[student.id].notes),
      ]),
    ),
  );

  if (!activeStudent || !details) {
    return (
      <main className="page-shell teacher-dashboard">
        <section className="teacher-dashboard__empty">Ученики пока не добавлены.</section>
      </main>
    );
  }

  const schedule = getStudentSchedule(activeStudent.id);
  const now = new Date('2026-10-24T21:00:00Z');
  const nextLesson = schedule
    .map((entry) => ({ entry, date: parseScheduleDateTime(entry.dateTime) }))
    .find(
      ({ entry, date }) =>
        date > now && entry.attendance !== 'Отмена' && entry.attendance !== 'Перенос занятия',
    );

  const monthSchedule = schedule
    .map((entry) => ({ entry, date: parseScheduleDateTime(entry.dateTime) }))
    .filter(
      ({ date }) =>
        date.getUTCFullYear() === selectedMonth.year && date.getUTCMonth() === selectedMonth.month,
    );

  const attendance = monthSchedule.map(({ entry, date }) => {
    const overrideKey = entry.dateTime;
    return {
      key: overrideKey,
      date,
      status:
        attendanceOverrides[activeStudent.id]?.[overrideKey] ?? getStatus(entry.attendance),
      note: entry.reschedule,
      payment: entry.payment,
    };
  });

  const presentCount = attendance.filter((entry) => entry.status === 'present').length;
  const movedCount = attendance.filter((entry) => entry.status === 'moved').length;
  const cancelledCount = attendance.filter((entry) => entry.status === 'cancelled').length;

  function saveNotes() {
    const value = notesByStudent[activeStudent.id] ?? '';
    window.localStorage.setItem(`teacher-notes:${activeStudent.id}`, value);
    setSavedStudentId(activeStudent.id);
    window.setTimeout(() => setSavedStudentId(null), 1200);
  }

  function cycleAttendance(entryKey: string, currentStatus: AttendanceStatus) {
    const currentIndex = statusOrder.indexOf(currentStatus);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
    setAttendanceOverrides((current) => ({
      ...current,
      [activeStudent.id]: {
        ...(current[activeStudent.id] ?? {}),
        [entryKey]: nextStatus,
      },
    }));
  }

  function moveMonth(offset: number) {
    setSelectedMonth((current) => {
      const date = new Date(Date.UTC(current.year, current.month + offset, 1));
      return { year: date.getUTCFullYear(), month: date.getUTCMonth() };
    });
  }

  return (
    <main className="page-shell teacher-dashboard">
      <section className="teacher-dashboard__hero">
        <span className="sticker sticker--white">ЛИЧНЫЙ КАБИНЕТ</span>
        <h1>Мой рабочий стол</h1>
        <p>Ученики, заметки, посещения и подготовка к следующему занятию.</p>
        <div className="teacher-dashboard__summary">
          <span>{visibleStudents.length} ученика</span>
          <span>Расписание 2026–2027</span>
        </div>
      </section>

      <div className="teacher-dashboard__workspace">
        <aside className="teacher-students-panel">
          <div className="teacher-panel__heading">
            <h2>Ученики</h2>
            <span>{visibleStudents.length} активных</span>
          </div>
          <div className="teacher-students-list">
            {visibleStudents.map((student) => (
              <button
                key={student.id}
                type="button"
                className={
                  student.id === activeStudent.id
                    ? 'teacher-student-button teacher-student-button--active'
                    : 'teacher-student-button'
                }
                onClick={() => setActiveStudentId(student.id)}
              >
                <span className="teacher-student-button__avatar">
                  {student.displayName.slice(0, 1)}
                </span>
                <span>
                  <strong>{student.displayName}</strong>
                  <small>
                    Grade {student.grade} · {student.level}
                  </small>
                </span>
              </button>
            ))}
          </div>
        </aside>

        <section className="teacher-dashboard__main">
          <div className="teacher-profile-grid">
            <article className="teacher-profile-card">
              <span className="teacher-card-label">ПРОФИЛЬ УЧЕНИКА</span>
              <h2>{activeStudent.displayName}</h2>
              <p>
                Grade {activeStudent.grade} · {activeStudent.level} · {activeStudent.curriculum}
              </p>
              <div className="teacher-chip-row">
                {activeStudent.currentFocus.map((topic) => (
                  <span key={topic} className="teacher-chip">
                    {topic}
                  </span>
                ))}
              </div>
            </article>

            <article className="teacher-next-lesson-card">
              <span className="teacher-card-label">СЛЕДУЮЩЕЕ ЗАНЯТИЕ</span>
              <strong>{nextLesson ? formatLessonDate(nextLesson.date) : 'Нет занятий'}</strong>
              <p>{nextLesson ? formatLessonTime(nextLesson.date) : 'Расписание закончилось'}</p>
              <button type="button" disabled>
                Открыть подготовку →
              </button>
            </article>
          </div>

          <div className="teacher-two-column">
            <article className="teacher-panel">
              <div className="teacher-panel__heading">
                <h2>Мои заметки</h2>
                <span>вручную</span>
              </div>
              <textarea
                className="teacher-notes"
                value={notesByStudent[activeStudent.id] ?? ''}
                onChange={(event) =>
                  setNotesByStudent((current) => ({
                    ...current,
                    [activeStudent.id]: event.target.value,
                  }))
                }
              />
              <div className="teacher-panel__actions">
                <button type="button" onClick={saveNotes} className="teacher-save-button">
                  {savedStudentId === activeStudent.id ? 'Сохранено ✓' : 'Сохранить заметку'}
                </button>
              </div>
            </article>

            <article className="teacher-panel">
              <div className="teacher-panel__heading">
                <h2>Сейчас в работе</h2>
                <span>фокус</span>
              </div>
              <div className="teacher-focus-list">
                {activeStudent.currentFocus.map((topic, index) => (
                  <div
                    key={topic}
                    className={`teacher-focus-item teacher-focus-item--${index % 3}`}
                  >
                    <strong>{topic}</strong>
                    <span>
                      {index === 0
                        ? 'основная тема'
                        : index === 1
                          ? 'активная практика'
                          : 'повторение'}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <article className="teacher-panel">
            <div className="teacher-attendance-heading">
              <div>
                <h2>Посещения</h2>
                <div className="teacher-attendance-stats">
                  <span>Был: {presentCount}</span>
                  <span>Перенос: {movedCount}</span>
                  <span>Отмена: {cancelledCount}</span>
                </div>
              </div>
              <div className="teacher-month-control">
                <button type="button" onClick={() => moveMonth(-1)} aria-label="Предыдущий месяц">
                  ←
                </button>
                <strong>
                  {monthNames[selectedMonth.month]} {selectedMonth.year}
                </strong>
                <button type="button" onClick={() => moveMonth(1)} aria-label="Следующий месяц">
                  →
                </button>
              </div>
            </div>

            <div className="teacher-attendance-grid">
              {attendance.map((entry) => (
                <article key={entry.key} className="teacher-attendance-card">
                  <div>
                    <strong>{formatAttendanceDate(entry.date)}</strong>
                    <p>
                      {String(entry.date.getUTCHours()).padStart(2, '0')}:
                      {String(entry.date.getUTCMinutes()).padStart(2, '0')}
                    </p>
                    {entry.note ? <p>{entry.note}</p> : null}
                    {entry.payment ? <p>{entry.payment}</p> : null}
                  </div>
                  <button
                    type="button"
                    className={`teacher-attendance-status teacher-attendance-status--${entry.status}`}
                    onClick={() => cycleAttendance(entry.key, entry.status)}
                  >
                    {statusLabels[entry.status]}
                  </button>
                </article>
              ))}
            </div>
          </article>

          <div className="teacher-two-column">
            <article className="teacher-panel">
              <div className="teacher-panel__heading">
                <h2>Последние занятия</h2>
                <span>история</span>
              </div>
              <div className="teacher-history">
                {details.lessonHistory.map((lesson) => (
                  <div key={`${lesson.date}-${lesson.title}`} className="teacher-history-row">
                    <strong>{lesson.date}</strong>
                    <div>
                      <b>{lesson.title}</b>
                      <span>{lesson.detail}</span>
                    </div>
                    <em>{lesson.homework}</em>
                  </div>
                ))}
              </div>
            </article>

            <article className="teacher-panel">
              <div className="teacher-panel__heading">
                <h2>Быстрые действия</h2>
                <span>скоро</span>
              </div>
              <div className="teacher-quick-actions">
                <button
                  type="button"
                  className="teacher-quick-action teacher-quick-action--purple"
                  disabled
                >
                  <strong>Создать урок</strong>
                  <span>из материалов платформы</span>
                </button>
                <button
                  type="button"
                  className="teacher-quick-action teacher-quick-action--orange"
                  disabled
                >
                  <strong>Назначить материал</strong>
                  <span>grammar / vocabulary / reading</span>
                </button>
                <button
                  type="button"
                  className="teacher-quick-action teacher-quick-action--lemon"
                  disabled
                >
                  <strong>Добавить итог урока</strong>
                  <span>тема + домашка + заметка</span>
                </button>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
