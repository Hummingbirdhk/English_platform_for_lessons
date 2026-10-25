import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Result } from 'antd';
import { findStudentById, loadAllContent } from '../../content/loadContent';
import { getStudentSchedule, parseScheduleDateTime } from '../../content/teacher/teacherSchedule';
import { useStudentWorkspace } from '../../features/student-workspace/studentWorkspace';

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

function formatLesson(date: Date) {
  return `${date.getUTCDate()} ${monthNamesGenitive[date.getUTCMonth()]} · ${String(
    date.getUTCHours(),
  ).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')} · 30 минут`;
}

export function StudentPreparationPage() {
  const { studentId } = useParams();
  const student = studentId ? findStudentById(studentId) : undefined;
  const { materials, lessons } = loadAllContent();
  const { workspace, patch } = useStudentWorkspace(student);
  const [materialId, setMaterialId] = useState('');
  const [lessonId, setLessonId] = useState('');
  const [saved, setSaved] = useState(false);

  const nextLesson = useMemo(() => {
    if (!student) return undefined;
    const now = new Date();
    return getStudentSchedule(student.id)
      .map((entry) => ({ entry, date: parseScheduleDateTime(entry.dateTime) }))
      .find(
        ({ entry, date }) =>
          date > now && entry.attendance !== 'Отмена' && entry.attendance !== 'Перенос занятия',
      );
  }, [student]);

  if (!student || !workspace) {
    return (
      <main className="page-shell">
        <Result status="404" title="Student not found" />
      </main>
    );
  }

  const assignedMaterials = workspace.assignedMaterialIds
    .map((id) => materials.find((material) => material.id === id))
    .filter((material) => material !== undefined);

  const assignedLessons = workspace.assignedLessonIds
    .map((id) => lessons.find((lesson) => lesson.id === id))
    .filter((lesson) => lesson !== undefined);

  const availableMaterials = materials.filter(
    (material) => !workspace.assignedMaterialIds.includes(material.id),
  );
  const availableLessons = lessons.filter((lesson) => !workspace.assignedLessonIds.includes(lesson.id));

  function addMaterial() {
    if (!materialId) return;
    patch({ assignedMaterialIds: [...workspace.assignedMaterialIds, materialId] });
    setMaterialId('');
  }

  function removeMaterial(id: string) {
    patch({ assignedMaterialIds: workspace.assignedMaterialIds.filter((item) => item !== id) });
  }

  function addLesson() {
    if (!lessonId) return;
    patch({ assignedLessonIds: [...workspace.assignedLessonIds, lessonId] });
    setLessonId('');
  }

  function savePreparation() {
    patch({ preparationNote: workspace.preparationNote });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1200);
  }

  return (
    <main className="page-shell preparation-page">
      <section className="preparation-hero">
        <div>
          <span className="sticker sticker--white">ПОДГОТОВКА К УРОКУ</span>
          <h1>{student.displayName}</h1>
          <p>{nextLesson ? formatLesson(nextLesson.date) : 'Следующее занятие пока не найдено'}</p>
        </div>
        <Link to="/teacher" className="preparation-back-link">
          ← В личный кабинет
        </Link>
      </section>

      <section className="preparation-grid">
        <article className="teacher-panel">
          <div className="teacher-panel__heading">
            <h2>Фокус урока</h2>
            <span>из профиля</span>
          </div>
          <div className="teacher-focus-list">
            <div className="teacher-focus-item teacher-focus-item--0">
              <strong>{workspace.focus.main || 'Не выбрано'}</strong>
              <span>основная тема</span>
            </div>
            <div className="teacher-focus-item teacher-focus-item--1">
              <strong>{workspace.focus.practice || 'Не выбрано'}</strong>
              <span>активная практика</span>
            </div>
            <div className="teacher-focus-item teacher-focus-item--2">
              <strong>{workspace.focus.revision || 'Не выбрано'}</strong>
              <span>повторение</span>
            </div>
          </div>
        </article>

        <article className="teacher-panel">
          <div className="teacher-panel__heading">
            <h2>Домашнее задание</h2>
            <span>последнее</span>
          </div>
          <p className="preparation-homework">
            {workspace.currentHomework || 'Домашнее задание пока не добавлено.'}
          </p>
        </article>
      </section>

      <section className="teacher-panel">
        <div className="teacher-panel__heading">
          <h2>Материалы к занятию</h2>
          <span>{assignedMaterials.length}</span>
        </div>

        <div className="preparation-assign-row">
          <select value={materialId} onChange={(event) => setMaterialId(event.target.value)}>
            <option value="">Выбрать материал из библиотеки</option>
            {availableMaterials.map((material) => (
              <option key={material.id} value={material.id}>
                {material.title} · {material.type}
              </option>
            ))}
          </select>
          <button type="button" onClick={addMaterial} disabled={!materialId}>
            Добавить
          </button>
        </div>

        <div className="preparation-resource-list">
          {assignedMaterials.map((material) => (
            <div className="preparation-resource-row" key={material.id}>
              <Link to={`/materials/${material.id}`}>
                <strong>{material.title}</strong>
                <span>{material.type}</span>
              </Link>
              <button type="button" onClick={() => removeMaterial(material.id)}>
                Убрать
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="teacher-panel">
        <div className="teacher-panel__heading">
          <h2>Готовые уроки</h2>
          <span>{assignedLessons.length}</span>
        </div>

        <div className="preparation-assign-row">
          <select value={lessonId} onChange={(event) => setLessonId(event.target.value)}>
            <option value="">Добавить готовый урок</option>
            {availableLessons.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                {lesson.title}
              </option>
            ))}
          </select>
          <button type="button" onClick={addLesson} disabled={!lessonId}>
            Добавить
          </button>
        </div>

        <div className="preparation-resource-list">
          {assignedLessons.map((lesson) => (
            <div className="preparation-resource-row" key={lesson.id}>
              <Link to={`/lesson/${lesson.id}`}>
                <strong>{lesson.title}</strong>
                <span>готовый урок</span>
              </Link>
              <Link to={`/lesson/${lesson.id}`} className="preparation-start-link">
                Начать →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="teacher-panel">
        <div className="teacher-panel__heading">
          <h2>План и заметки к следующему занятию</h2>
          <span>вручную</span>
        </div>
        <textarea
          className="teacher-notes preparation-notes"
          value={workspace.preparationNote}
          placeholder="Что важно повторить, что спросить, какой материал открыть первым..."
          onChange={(event) => patch({ preparationNote: event.target.value })}
        />
        <div className="teacher-panel__actions">
          <button type="button" className="teacher-save-button" onClick={savePreparation}>
            {saved ? 'Сохранено ✓' : 'Сохранить подготовку'}
          </button>
        </div>
      </section>
    </main>
  );
}
