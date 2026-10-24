import type { StudentProfile } from '../../content/types';
import { GlossyActionLink } from '../../shared/ui/GlossyActionButton';

export function StudentCard({ student }: { student: StudentProfile }) {
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
      <div className="student-focus">{student.currentFocus.join(' · ')}</div>
      <GlossyActionLink
        to={`/students/${student.id}`}
        label={`Открыть профиль: ${student.displayName}`}
        size="sm"
        className="student-tile__action"
      />
    </article>
  );
}
