import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Material, StudentProfile } from '../../content/types';
import { getStudentSchedule, parseScheduleDateTime } from '../../content/teacher/teacherSchedule';
import { loadAllContent } from '../../content/loadContent';
import {
  type LessonHistoryItem,
  type StudentWorkspace,
  useStudentWorkspace,
} from '../../features/student-workspace/studentWorkspace';
import { useTeacherAuth } from '../../features/teacher-auth/teacherAuthStore';
import { StudentHomeworkReview } from './StudentHomeworkReview';

type AttendanceStatus = 'planned' | 'present' | 'moved' | 'cancelled';

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
  return `${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(
    2,
    '0',
  )} · 30 минут`;
}

function formatAttendanceDate(date: Date) {
  return `${String(date.getUTCDate()).padStart(2, '0')} ${monthNamesGenitive[date.getUTCMonth()]}`;
}

function formatHistoryDate(date = new Date()) {
  return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function TeacherStudentDashboard({
  student,
  materials,
}: {
  student: StudentProfile;
  materials: Material[];
}) {
  const { workspace, patch } = useStudentWorkspace(student);
  const activeWorkspace = workspace;
  const [selectedMonth, setSelectedMonth] = useState({ year: 2026, month: 9 });
  const [attendanceOverrides, setAttendanceOverrides] = useState<
    Record<string, Record<string, AttendanceStatus>>
  >({});
  const [editingProfile, setEditingProfile] = useState(false);
  const [tagsDraft, setTagsDraft] = useState(() => activeWorkspace?.profileTags.join(', ') ?? '');
  const [focusMain, setFocusMain] = useState(() => activeWorkspace?.focus.main ?? '');
  const [focusPractice, setFocusPractice] = useState(() => activeWorkspace?.focus.practice ?? '');
  const [focusRevision, setFocusRevision] = useState(() => activeWorkspace?.focus.revision ?? '');
  const [notesDraft, setNotesDraft] = useState(() => activeWorkspace?.notes ?? '');
  const [savedNotice, setSavedNotice] = useState('');
  const [assignMaterialId, setAssignMaterialId] = useState('');
  const [showSummaryForm, setShowSummaryForm] = useState(false);
  const [summaryTitle, setSummaryTitle] = useState('');
  const [summaryDetail, setSummaryDetail] = useState('');
  const [summaryHomework, setSummaryHomework] = useState('');

  if (!activeWorkspace) {
    return <section className="teacher-dashboard__empty">Профиль загружается…</section>;
  }

  const currentWorkspace: StudentWorkspace = activeWorkspace;
  const schedule = getStudentSchedule(student.id);
  const now = new Date();
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
      status: attendanceOverrides[student.id]?.[overrideKey] ?? getStatus(entry.attendance),
      note: entry.reschedule,
      payment: entry.payment,
    };
  });

  const presentCount = attendance.filter((entry) => entry.status === 'present').length;
  const movedCount = attendance.filter((entry) => entry.status === 'moved').length;
  const cancelledCount = attendance.filter((entry) => entry.status === 'cancelled').length;
  const availableMaterials = materials.filter(
    (material) => !currentWorkspace.assignedMaterialIds.includes(material.id),
  );

  function showSaved(message: string) {
    setSavedNotice(message);
    window.setTimeout(() => setSavedNotice(''), 1400);
  }

  function toggleProfileEditor() {
    if (!editingProfile) {
      setTagsDraft(currentWorkspace.profileTags.join(', '));
      setFocusMain(currentWorkspace.focus.main);
      setFocusPractice(currentWorkspace.focus.practice);
      setFocusRevision(currentWorkspace.focus.revision);
    }
    setEditingProfile((current) => !current);
  }

  function saveProfileSettings() {
    const focus = {
      main: focusMain.trim(),
      practice: focusPractice.trim(),
      revision: focusRevision.trim(),
    };
    const tags = tagsDraft
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
    const tagsWereNotEdited = tagsDraft === currentWorkspace.profileTags.join(', ');
    const tagsFollowDefaultFocus =
      currentWorkspace.profileTags.join(', ') === student.currentFocus.join(', ');

    patch({
      profileTags:
        tagsWereNotEdited && tagsFollowDefaultFocus
          ? [focus.main, focus.practice, focus.revision].filter(Boolean)
          : tags,
      focus,
    });
    setEditingProfile(false);
    showSaved('Профиль обновлён ✓');
  }

  function saveNotes() {
    patch({ notes: notesDraft });
    showSaved('Заметка сохранена ✓');
  }

  function assignMaterial() {
    if (!assignMaterialId) return;
    patch({ assignedMaterialIds: [...currentWorkspace.assignedMaterialIds, assignMaterialId] });
    setAssignMaterialId('');
    showSaved('Материал назначен ✓');
  }

  function addLessonSummary() {
    if (!summaryTitle.trim()) return;

    const item: LessonHistoryItem = {
      id: `${student.id}-${Date.now()}`,
      date: formatHistoryDate(),
      title: summaryTitle.trim(),
      detail: summaryDetail.trim(),
      homework: summaryHomework.trim(),
    };

    patch({
      lessonHistory: [item, ...currentWorkspace.lessonHistory],
      currentHomework: summaryHomework.trim(),
    });
    setSummaryTitle('');
    setSummaryDetail('');
    setSummaryHomework('');
    setShowSummaryForm(false);
    showSaved('Итог урока добавлен ✓');
  }

  function cycleAttendance(entryKey: string, currentStatus: AttendanceStatus) {
    const currentIndex = statusOrder.indexOf(currentStatus);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
    setAttendanceOverrides((current) => ({
      ...current,
      [student.id]: {
        ...(current[student.id] ?? {}),
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
    <>
      {savedNotice ? <div className="teacher-toast">{savedNotice}</div> : null}

      <div className="teacher-profile-grid">
        <article className="teacher-profile-card">
          <div className="teacher-profile-card__topline">
            <span className="teacher-card-label">ПРОФИЛЬ УЧЕНИКА</span>
            <button type="button" onClick={toggleProfileEditor}>
              {editingProfile ? 'Закрыть' : 'Редактировать'}
            </button>
          </div>

          <h2>{student.displayName}</h2>
          <p>
            Grade {student.grade} · {student.level} · {student.curriculum}
          </p>

          {editingProfile ? (
            <div className="teacher-profile-editor">
              <label>
                <span>Плашки под именем</span>
                <input
                  value={tagsDraft}
                  onChange={(event) => setTagsDraft(event.target.value)}
                  placeholder="Present Simple, Daily routine, Vocabulary revision"
                />
                <small>Разделяй плашки запятыми.</small>
              </label>
              <div className="teacher-focus-editor-grid">
                <label>
                  <span>Основная тема</span>
                  <input value={focusMain} onChange={(event) => setFocusMain(event.target.value)} />
                </label>
                <label>
                  <span>Активная практика</span>
                  <input
                    value={focusPractice}
                    onChange={(event) => setFocusPractice(event.target.value)}
                  />
                </label>
                <label>
                  <span>Повторение</span>
                  <input
                    value={focusRevision}
                    onChange={(event) => setFocusRevision(event.target.value)}
                  />
                </label>
              </div>
              <button type="button" className="teacher-profile-save" onClick={saveProfileSettings}>
                Сохранить профиль
              </button>
            </div>
          ) : (
            <div className="teacher-chip-row">
              {(currentWorkspace.profileTags.join(', ') === student.currentFocus.join(', ')
                ? [
                    currentWorkspace.focus.main,
                    currentWorkspace.focus.practice,
                    currentWorkspace.focus.revision,
                  ].filter(Boolean)
                : currentWorkspace.profileTags
              ).map((topic) => (
                <span key={topic} className="teacher-chip">
                  {topic}
                </span>
              ))}
            </div>
          )}
        </article>

        <article className="teacher-next-lesson-card">
          <span className="teacher-card-label">СЛЕДУЮЩЕЕ ЗАНЯТИЕ</span>
          <strong>{nextLesson ? formatLessonDate(nextLesson.date) : 'Нет занятий'}</strong>
          <p>{nextLesson ? formatLessonTime(nextLesson.date) : 'Расписание закончилось'}</p>
          <Link to={`/teacher/students/${student.id}/preparation`}>Открыть подготовку →</Link>
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
            value={notesDraft}
            onChange={(event) => setNotesDraft(event.target.value)}
          />
          <div className="teacher-panel__actions">
            <button type="button" onClick={saveNotes} className="teacher-save-button">
              Сохранить заметку
            </button>
          </div>
        </article>

        <article className="teacher-panel">
          <div className="teacher-panel__heading">
            <h2>Сейчас в работе</h2>
            <button
              type="button"
              className="teacher-inline-edit"
              onClick={() => setEditingProfile(true)}
            >
              изменить
            </button>
          </div>
          <div className="teacher-focus-list">
            {[
              [currentWorkspace.focus.main, 'основная тема'],
              [currentWorkspace.focus.practice, 'активная практика'],
              [currentWorkspace.focus.revision, 'повторение'],
            ].map(([topic, label], index) => (
              <div key={label} className={`teacher-focus-item teacher-focus-item--${index % 3}`}>
                <strong>{topic || 'Не выбрано'}</strong>
                <span>{label}</span>
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

      <StudentHomeworkReview studentId={student.id} />

      <div className="teacher-two-column">
        <article className="teacher-panel">
          <div className="teacher-panel__heading">
            <h2>Последние занятия</h2>
            <span>история</span>
          </div>
          <div className="teacher-history">
            {currentWorkspace.lessonHistory.map((lesson) => (
              <div key={lesson.id} className="teacher-history-row">
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
            <span>рабочие</span>
          </div>

          <div className="teacher-quick-actions">
            <Link
              to={`/teacher/students/${student.id}/preparation`}
              className="teacher-quick-action teacher-quick-action--purple"
            >
              <strong>Подготовить урок</strong>
              <span>материалы + план + заметки</span>
            </Link>

            <div className="teacher-quick-action teacher-quick-action--orange teacher-quick-action--form">
              <strong>Назначить материал</strong>
              <select
                value={assignMaterialId}
                onChange={(event) => setAssignMaterialId(event.target.value)}
              >
                <option value="">Выбрать из библиотеки</option>
                {availableMaterials.map((material) => (
                  <option key={material.id} value={material.id}>
                    {material.title}
                  </option>
                ))}
              </select>
              <button type="button" onClick={assignMaterial} disabled={!assignMaterialId}>
                Назначить
              </button>
            </div>

            <button
              type="button"
              className="teacher-quick-action teacher-quick-action--lemon"
              onClick={() => setShowSummaryForm((value) => !value)}
            >
              <strong>Добавить итог урока</strong>
              <span>тема + домашка + заметка</span>
            </button>
          </div>

          {showSummaryForm ? (
            <div className="teacher-summary-form">
              <input
                value={summaryTitle}
                onChange={(event) => setSummaryTitle(event.target.value)}
                placeholder="Тема урока"
              />
              <input
                value={summaryDetail}
                onChange={(event) => setSummaryDetail(event.target.value)}
                placeholder="Что прошли / что получилось"
              />
              <input
                value={summaryHomework}
                onChange={(event) => setSummaryHomework(event.target.value)}
                placeholder="Домашнее задание"
              />
              <button type="button" onClick={addLessonSummary}>
                Сохранить итог
              </button>
            </div>
          ) : null}
        </article>
      </div>
    </>
  );
}

export function TeacherDashboardPage() {
  const { students, materials } = loadAllContent();
  const auth = useTeacherAuth();
  const order = ['student-zlata', 'student-artem'];
  const visibleStudents = students
    .filter((student) => order.includes(student.id))
    .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

  const [activeStudentId, setActiveStudentId] = useState(
    visibleStudents.find((student) => student.id === 'student-zlata')?.id ??
      visibleStudents[0]?.id ??
      '',
  );
  const activeStudent =
    visibleStudents.find((student) => student.id === activeStudentId) ?? visibleStudents[0];

  if (!activeStudent) {
    return (
      <main className="page-shell teacher-dashboard">
        <section className="teacher-dashboard__empty">Ученики пока не добавлены.</section>
      </main>
    );
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
          {auth.configured ? <span>Cloud sync: on</span> : <span>Cloud sync: local</span>}
          {auth.configured ? (
            <button type="button" className="teacher-signout-button" onClick={() => auth.signOut()}>
              Выйти
            </button>
          ) : null}
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
          <TeacherStudentDashboard
            key={activeStudent.id}
            student={activeStudent}
            materials={materials}
          />
        </section>
      </div>
    </main>
  );
}
