import { useMemo, useState } from 'react';
import { loadAllContent } from '../../content/loadContent';

type AttendanceStatus = 'planned' | 'present' | 'moved' | 'missed';

type AttendanceEntry = {
  date: string;
  topic: string;
  status: AttendanceStatus;
};

type TeacherStudentDetails = {
  notes: string;
  nextLesson: string;
  nextLessonTime: string;
  attendance: AttendanceEntry[];
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
    nextLesson: '27 октября',
    nextLessonTime: '18:00 · 60 минут',
    attendance: [
      { date: '03 октября', topic: 'Present Simple', status: 'present' },
      { date: '10 октября', topic: 'Daily routine', status: 'present' },
      { date: '17 октября', topic: 'Vocabulary practice', status: 'moved' },
      { date: '24 октября', topic: 'Reading + speaking', status: 'present' },
    ],
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
    nextLesson: '28 октября',
    nextLessonTime: '17:00 · 60 минут',
    attendance: [
      { date: '02 октября', topic: 'Past Simple', status: 'present' },
      { date: '09 октября', topic: 'Irregular verbs', status: 'present' },
      { date: '16 октября', topic: 'Reading', status: 'missed' },
      { date: '23 октября', topic: 'Speaking practice', status: 'present' },
    ],
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

const statusOrder: AttendanceStatus[] = ['planned', 'present', 'moved', 'missed'];

const statusLabels: Record<AttendanceStatus, string> = {
  planned: 'Запланировано',
  present: '✓ Был',
  moved: '↔ Перенос',
  missed: '× Не был',
};

function readStoredValue(key: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  return window.localStorage.getItem(key) ?? fallback;
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
  const [attendanceByStudent, setAttendanceByStudent] = useState<
    Record<string, AttendanceEntry[]>
  >(() =>
    Object.fromEntries(
      visibleStudents.map((student) => [student.id, teacherDetails[student.id].attendance]),
    ),
  );
  const [savedStudentId, setSavedStudentId] = useState<string | null>(null);

  if (!activeStudent || !details) {
    return (
      <main className="page-shell teacher-dashboard">
        <section className="teacher-dashboard__empty">Ученики пока не добавлены.</section>
      </main>
    );
  }

  const attendance = attendanceByStudent[activeStudent.id] ?? details.attendance;
  const presentCount = attendance.filter((entry) => entry.status === 'present').length;
  const movedCount = attendance.filter((entry) => entry.status === 'moved').length;
  const missedCount = attendance.filter((entry) => entry.status === 'missed').length;

  function saveNotes() {
    const value = notesByStudent[activeStudent.id] ?? '';
    window.localStorage.setItem(`teacher-notes:${activeStudent.id}`, value);
    setSavedStudentId(activeStudent.id);
    window.setTimeout(() => setSavedStudentId(null), 1200);
  }

  function cycleAttendance(index: number) {
    setAttendanceByStudent((current) => {
      const currentEntries = current[activeStudent.id] ?? details.attendance;
      const nextEntries = currentEntries.map((entry, entryIndex) => {
        if (entryIndex !== index) return entry;
        const currentIndex = statusOrder.indexOf(entry.status);
        return {
          ...entry,
          status: statusOrder[(currentIndex + 1) % statusOrder.length],
        };
      });

      return { ...current, [activeStudent.id]: nextEntries };
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
          <span>Октябрь</span>
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
              <strong>{details.nextLesson}</strong>
              <p>{details.nextLessonTime}</p>
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
                  <span>Не был: {missedCount}</span>
                </div>
              </div>
              <div className="teacher-month-control">
                <button type="button" disabled>
                  ←
                </button>
                <strong>Октябрь 2026</strong>
                <button type="button" disabled>
                  →
                </button>
              </div>
            </div>

            <div className="teacher-attendance-grid">
              {attendance.map((entry, index) => (
                <article key={entry.date} className="teacher-attendance-card">
                  <div>
                    <strong>{entry.date}</strong>
                    <p>{entry.topic}</p>
                  </div>
                  <button
                    type="button"
                    className={`teacher-attendance-status teacher-attendance-status--${entry.status}`}
                    onClick={() => cycleAttendance(index)}
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
                <button type="button" className="teacher-quick-action teacher-quick-action--purple" disabled>
                  <strong>Создать урок</strong>
                  <span>из материалов платформы</span>
                </button>
                <button type="button" className="teacher-quick-action teacher-quick-action--orange" disabled>
                  <strong>Назначить материал</strong>
                  <span>grammar / vocabulary / reading</span>
                </button>
                <button type="button" className="teacher-quick-action teacher-quick-action--lemon" disabled>
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
