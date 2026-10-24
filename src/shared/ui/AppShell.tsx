import type { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

const navigation = [
  { to: '/', label: 'Главная', end: true },
  { to: '/materials', label: 'Материалы' },
  { to: '/lessons', label: 'Уроки' },
  { to: '/students', label: 'Ученики' },
];

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-header__spacer" aria-hidden="true" />

          <nav className="app-nav" aria-label="Main navigation">
            {navigation.map((item) => (
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
            to="/teacher"
            className={({ isActive }) =>
              isActive ? 'app-profile app-profile--active' : 'app-profile'
            }
            aria-label="Личный кабинет преподавателя"
          >
            M
          </NavLink>
        </div>
      </header>
      {children}
    </div>
  );
}
