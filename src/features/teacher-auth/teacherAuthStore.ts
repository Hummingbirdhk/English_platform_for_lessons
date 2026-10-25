import { useSyncExternalStore } from 'react';
import { cloudClient, isCloudConfigured } from '../../shared/config/cloud';

type TeacherAuthStatus = 'anonymous' | 'authenticated' | 'checking' | 'code-sent';

type TeacherAuthSnapshot = {
  status: TeacherAuthStatus;
  email: string;
  error: string;
  role: 'teacher' | 'student' | null;
  studentId: string | null;
};

let snapshot: TeacherAuthSnapshot = {
  status: cloudClient.getSession() ? 'checking' : 'anonymous',
  email: cloudClient.getSession()?.user.email ?? '',
  error: '',
  role: null,
  studentId: null,
};

const listeners = new Set<() => void>();

function emit(next: TeacherAuthSnapshot) {
  snapshot = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return snapshot;
}

async function verifyTeacherAccess() {
  const session = cloudClient.getSession();
  if (!isCloudConfigured || !session) {
    emit({ status: 'anonymous', email: '', error: '', role: null, studentId: null });
    return;
  }

  try {
    const rows = await cloudClient.select<Array<{ role: string; student_id: string | null }>>(
      'app_users',
      `select=role,student_id&user_id=eq.${encodeURIComponent(session.user.id)}&limit=1`,
    );

    if (rows[0]?.role === 'teacher') {
      emit({
        role: 'teacher',
        studentId: null,
        status: 'authenticated',
        email: session.user.email ?? '',
        error: '',
      });
      return;
    }

    if (rows[0]?.role === 'student' && rows[0].student_id) {
      emit({
        status: 'authenticated',
        role: 'student',
        studentId: rows[0].student_id,
        email: session.user.email ?? '',
        error: '',
      });
      return;
    }
    await cloudClient.signOut();
    emit({
      status: 'anonymous',
      role: null,
      studentId: null,
      email: '',
      error: 'У этого аккаунта нет доступа преподавателя.',
    });
  } catch {
    emit({
      status: 'anonymous',
      role: null,
      studentId: null,
      email: '',
      error: 'Не удалось проверить доступ преподавателя.',
    });
  }
}

if (isCloudConfigured && cloudClient.getSession()) {
  void verifyTeacherAccess();
}

export function useTeacherAuth() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  async function requestCode(email: string) {
    emit({ status: 'checking', email, error: '', role: null, studentId: null });

    try {
      await cloudClient.requestAccessCode(email);
      emit({ status: 'code-sent', email, error: '', role: null, studentId: null });
      return true;
    } catch (error) {
      emit({
        status: 'anonymous',
      role: null,
      studentId: null,
        email,
        error: error instanceof Error ? error.message : 'Не удалось отправить код.',
      });
      return false;
    }
  }

  async function verifyCode(email: string, code: string) {
    emit({ status: 'checking', email, error: '', role: null, studentId: null });

    try {
      await cloudClient.verifyAccessCode(email, code);
      await verifyTeacherAccess();
      return snapshot.status === 'authenticated' && snapshot.role === 'teacher';
    } catch (error) {
      emit({
        status: 'code-sent',
        role: null,
        studentId: null,
        email,
        error: error instanceof Error ? error.message : 'Код не подошёл.',
      });
      return false;
    }
  }

  async function loginStudent(username: string, password: string) {
    const accounts: Record<string, string> = {
      zlata: 'zlata@students.example.com',
      artem: 'artem@students.example.com',
    };
    const email = accounts[username.trim().toLowerCase()];
    if (!email) {
      emit({
        status: 'anonymous',
        email: '',
        error: 'Неверный логин или пароль.',
        role: null,
        studentId: null,
      });
      return false;
    }
    emit({ status: 'checking', email, error: '', role: null, studentId: null });
    try {
      await cloudClient.signInWithPassword(email, password);
      await verifyTeacherAccess();
      if (snapshot.status === 'authenticated' && snapshot.role === 'student') return true;
      await cloudClient.signOut();
    } catch {
      // Credentials and authorization errors share the same public message.
    }
    emit({ status: 'anonymous', email: '', error: 'Неверный логин или пароль.', role: null, studentId: null });
    return false;
  }

  async function signOut() {
    await cloudClient.signOut();
    emit({ status: 'anonymous', email: '', error: '', role: null, studentId: null });
  }

  return {
    ...state,
    configured: isCloudConfigured,
    requestCode,
    loginStudent,
    verifyCode,
    signOut,
  };
}

export function getTeacherAuthSnapshot() {
  return snapshot;
}
