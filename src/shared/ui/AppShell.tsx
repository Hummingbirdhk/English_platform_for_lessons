import type { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import { useTeacherAuth } from '../../features/teacher-auth/teacherAuthStore';

const navigation = [
  { to: '/', label: 'Главная', end: true },
  { to: '/dictionary', label: 'Словарь' },
  { to: '/materials', label: 'Материалы' },
  { to: '/lessons', label: 'Уроки' },
  { to: '/students', label: 'Ученики' },
];

export function AppShell({ children }: PropsWithChildren) {
  const auth = useTeacherAuth();
  const isStudent = auth.status === 'authenticated' && auth.role === 'student' && Boolean(auth.studentId);
  const links = navigation.map((item) =>
    isStudent && item.to === '/students'
      ? { ...item, to: `/students/${auth.studentId}`, label: 'Профиль' }
      : item,
  );
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-header__spacer" aria-hidden="true" />

          <nav className="app-nav" aria-label="Main navigation">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive ? 'app-nav__link app-nav__link--active' : 'app-nav__link'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <NavLink
            to={isStudent ? `/students/${auth.studentId}` : "/teacher"}
            className={({ isActive }) =>
              isActive ? 'app-profile app-profile--active' : 'app-profile'
            }
            aria-label={isStudent ? "Личный кабинет ученика" : "Личный кабинет преподавателя"}
          >
            M
          </NavLink>
        </div>
      </header>
      {children}
    </div>
  );
}
