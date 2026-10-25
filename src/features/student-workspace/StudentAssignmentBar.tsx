import { useState } from 'react';
import { loadAllContent } from '../../content/loadContent';
import { useTeacherAuth } from '../teacher-auth/teacherAuthStore';
import { readStudentWorkspace, saveStudentWorkspace } from './studentWorkspace';

type AssignmentMode = 'material' | 'lesson';

export function StudentAssignmentBar({ mode, itemId }: { mode: AssignmentMode; itemId: string }) {
  const { students } = loadAllContent();
  const auth = useTeacherAuth();
  const visibleStudents = students.filter((student) =>
    ['student-zlata', 'student-artem'].includes(student.id),
  );
  const [studentId, setStudentId] = useState('');
  const [message, setMessage] = useState('');

  function assign() {
    const student = visibleStudents.find((item) => item.id === studentId);
    if (!student) return;

    const workspace = readStudentWorkspace(student);
    if (mode === 'material') {
      const assignedMaterialIds = Array.from(new Set([...workspace.assignedMaterialIds, itemId]));
      saveStudentWorkspace(student, { ...workspace, assignedMaterialIds }, ['assignedMaterialIds']);
    } else {
      const assignedLessonIds = Array.from(new Set([...workspace.assignedLessonIds, itemId]));
      saveStudentWorkspace(student, { ...workspace, assignedLessonIds }, ['assignedLessonIds']);
    }

    setMessage(`Добавлено для ${student.displayName} ✓`);
    window.setTimeout(() => setMessage(''), 1400);
  }

  if (auth.configured && auth.status !== 'authenticated') return null;

  return (
    <section className="student-assignment-bar">
      <div>
        <span className="student-assignment-bar__eyebrow">ДЛЯ УЧЕНИКА</span>
        <strong>
          {mode === 'material' ? 'Назначить этот материал' : 'Добавить урок в подготовку'}
        </strong>
      </div>
      <select value={studentId} onChange={(event) => setStudentId(event.target.value)}>
        <option value="">Выбрать ученика</option>
        {visibleStudents.map((student) => (
          <option key={student.id} value={student.id}>
            {student.displayName}
          </option>
        ))}
      </select>
      <button type="button" disabled={!studentId} onClick={assign}>
        Добавить
      </button>
      {message ? <span className="student-assignment-bar__message">{message}</span> : null}
    </section>
  );
}
