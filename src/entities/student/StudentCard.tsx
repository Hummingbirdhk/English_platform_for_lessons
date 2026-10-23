import { Link } from 'react-router-dom';
import type { StudentProfile } from '../../content/types';

export function StudentCard({ student }: { student: StudentProfile }) {
  return (
    <Link to={`/students/${student.id}`} className="student-tile">
      <div className="student-tile__top">
        <span className="student-avatar">{student.displayName.charAt(0)}</span>
        <span className="level-chip">{student.level}</span>
      </div>
      <h2>{student.displayName}</h2>
      <p>
        Grade {student.grade} · {student.curriculum}
      </p>
      <div className="student-focus">{student.currentFocus.join(' · ')}</div>
      <span className="student-tile__arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}
