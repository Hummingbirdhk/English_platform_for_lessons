import type { StudentProfile } from '../../content/types';
import { useStudentWorkspace } from '../../features/student-workspace/studentWorkspace';
import { GlossyActionLink } from '../../shared/ui/GlossyActionButton';

export function StudentCard({ student }: { student: StudentProfile }) {
  const { workspace } = useStudentWorkspace(student);
  const focus = workspace?.focus ?? {
    main: student.currentFocus[0] ?? '',
    practice: student.currentFocus[1] ?? '',
    revision: student.currentFocus[2] ?? '',
  };

  return (
    <article className="student-tile">
      <div className="student-tile__top">
        <span className="student-avatar">{student.displayName.charAt(0)}</span>
        <span className="level-chip">{student.level}</span>
      </div>
      <h2>{student.displayName}</h2>
      <p>
        Grade {student.grade} · {student.curriculum}
      </p>
      <div className="student-focus">
        {[focus.main, focus.practice, focus.revision].filter(Boolean).join(' · ')}
      </div>
      <GlossyActionLink
        to={`/students/${student.id}`}
        label={`Открыть профиль: ${student.displayName}`}
        size="sm"
        className="student-tile__action"
      />
    </article>
  );
}
