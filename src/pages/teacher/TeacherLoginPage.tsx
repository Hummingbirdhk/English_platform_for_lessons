import { type FormEvent, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useTeacherAuth } from '../../features/teacher-auth/teacherAuthStore';

export function TeacherLoginPage() {
  const auth = useTeacherAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [email, setEmail] = useState(auth.email);
  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!auth.configured) return <Navigate to="/teacher" replace />;
  if (auth.status === 'authenticated') return <Navigate to="/teacher" replace />;

  async function sendCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    await auth.requestCode(email.trim());
    setSubmitting(false);
  }

  async function confirmCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const success = await auth.verifyCode(email.trim(), code.trim());
    setSubmitting(false);

    if (success) {
      const next = params.get('next');
      navigate(next || '/teacher', { replace: true });
    }
  }

  const codeSent = auth.status === 'code-sent';

  return (
    <main className="page-shell teacher-login-page">
      <section className="teacher-login-card">
        <span className="sticker sticker--white">TEACHER ACCESS</span>
        <h1>Вход преподавателя</h1>
        <p>Введи email, получи одноразовый код от Supabase и подтверди вход.</p>

        {!codeSent ? (
          <form onSubmit={sendCode}>
            <label>
              <span>Email</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            {auth.error ? <div className="teacher-login-error">{auth.error}</div> : null}
            <button type="submit" disabled={submitting}>
              {submitting ? 'Отправляю…' : 'Получить код'}
            </button>
          </form>
        ) : (
          <form onSubmit={confirmCode}>
            <label>
              <span>Код из письма</span>
              <input
                inputMode="numeric"
                autoComplete="one-time-code"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                required
              />
            </label>
            {auth.error ? <div className="teacher-login-error">{auth.error}</div> : null}
            <button type="submit" disabled={submitting}>
              {submitting ? 'Проверяю…' : 'Войти'}
            </button>
            <button
              type="button"
              className="teacher-login-secondary"
              onClick={() => auth.requestCode(email.trim())}
              disabled={submitting}
            >
              Отправить код ещё раз
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
