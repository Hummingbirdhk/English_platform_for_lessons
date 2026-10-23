import type { PropsWithChildren } from 'react';
import { BookOutlined, HomeOutlined, TeamOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const navigation = [
  { to: '/', label: 'Главная', icon: <HomeOutlined />, end: true },
  { to: '/materials', label: 'Материалы', icon: <BookOutlined /> },
  { to: '/lessons', label: 'Уроки', icon: <BookOutlined /> },
  { to: '/students', label: 'Ученики', icon: <TeamOutlined /> },
];

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <NavLink to="/" className="app-brand" aria-label="English Platform home">
            English Platform
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
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
