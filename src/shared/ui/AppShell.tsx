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
          <NavLink to="/" className="app-brand" aria-label="English Platform home">
            ENGLISH CLUB
          </NavLink>

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

          <div className="app-profile" aria-label="Teacher profile">
            M
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
