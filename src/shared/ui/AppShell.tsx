import { useState } from 'react';
import type { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

const navigation = [
  { to: '/', label: 'Главная', end: true },
  { to: '/dictionary', label: 'Словарь' },
  { to: '/reading', label: 'Библиотека' },
  { to: '/materials', label: 'Материалы' },
  { to: '/lessons', label: 'Уроки' },
  { to: '/students', label: 'Ученики' },
];

export function AppShell({
  children,
  studentId,
}: PropsWithChildren<{ studentId?: string | null }>) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isStudent = Boolean(studentId);
  const links = navigation.map((item) =>
    isStudent && item.to === '/students'
      ? { ...item, to: `/students/${studentId}`, label: 'Профиль' }
      : item,
  );
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-header__spacer" aria-hidden="true" />

          <button
            className="app-mobile-menu-toggle"
            type="button"
            aria-controls="app-primary-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setMenuOpen((previous) => !previous)}
          >
            <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
            <span>Меню</span>
          </button>

          <nav
            id="app-primary-navigation"
            className={`app-nav${menuOpen ? ' app-nav--open' : ''}`}
            aria-label="Main navigation"
          >
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
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
            to={isStudent ? `/students/${studentId}` : '/teacher'}
            className={({ isActive }) =>
              isActive ? 'app-profile app-profile--active' : 'app-profile'
            }
            aria-label={isStudent ? 'Личный кабинет ученика' : 'Личный кабинет преподавателя'}
          >
            M
          </NavLink>
        </div>
      </header>
      {children}
    </div>
  );
}
