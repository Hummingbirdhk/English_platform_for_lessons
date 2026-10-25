import { type FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useTeacherAuth } from '../../features/teacher-auth/teacherAuthStore';

export function StudentLoginPage() {
  const auth = useTeacherAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!auth.configured) return <Navigate to="/students" replace />;
  if (auth.status === 'authenticated' && auth.role === 'student' && auth.studentId) {
    return <Navigate to={`/students/${auth.studentId}`} replace />;
  }
  if (auth.status === 'authenticated' && auth.role === 'teacher') {
    return <Navigate to="/teacher" replace />;
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const ok = await auth.loginStudent(username, password);
    setSubmitting(false);
    if (ok) navigate('/students', { replace: true });
  }

  return (
    <main className="page-shell teacher-login-page">
      <section className="teacher-login-card">
        <span className="sticker sticker--white">STUDENT ACCESS</span>
        <h1>Вход ученика</h1>
        <p>Введи логин и пароль, которые выдал преподаватель.</p>
        <form onSubmit={login}>
          <label>
            <span>Логин</span>
            <input autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} required />
          </label>
          <label>
            <span>Пароль</span>
            <input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>
          {auth.error ? <div className="teacher-login-error">{auth.error}</div> : null}
          <button type="submit" disabled={submitting}>{submitting ? 'Проверяю…' : 'Войти'}</button>
        </form>
      </section>
    </main>
  );
}
