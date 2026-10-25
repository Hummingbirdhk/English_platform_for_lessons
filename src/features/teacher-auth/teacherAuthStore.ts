import { useSyncExternalStore } from 'react';
import { cloudClient, isCloudConfigured } from '../../shared/config/cloud';

type TeacherAuthStatus = 'anonymous' | 'authenticated' | 'checking' | 'code-sent';

type TeacherAuthSnapshot = {
  status: TeacherAuthStatus;
  email: string;
  error: string;
};

let snapshot: TeacherAuthSnapshot = {
  status: cloudClient.getSession() ? 'checking' : 'anonymous',
  email: cloudClient.getSession()?.user.email ?? '',
  error: '',
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
    emit({ status: 'anonymous', email: '', error: '' });
    return;
  }

  try {
    const rows = await cloudClient.select<Array<{ role: string }>>(
      'app_users',
      `select=role&user_id=eq.${encodeURIComponent(session.user.id)}&limit=1`,
    );

    if (rows[0]?.role === 'teacher') {
      emit({
        status: 'authenticated',
        email: session.user.email ?? '',
        error: '',
      });
      return;
    }

    await cloudClient.signOut();
    emit({
      status: 'anonymous',
      email: '',
      error: 'У этого аккаунта нет доступа преподавателя.',
    });
  } catch {
    emit({
      status: 'anonymous',
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
    emit({ status: 'checking', email, error: '' });

    try {
      await cloudClient.requestAccessCode(email);
      emit({ status: 'code-sent', email, error: '' });
      return true;
    } catch (error) {
      emit({
        status: 'anonymous',
        email,
        error: error instanceof Error ? error.message : 'Не удалось отправить код.',
      });
      return false;
    }
  }

  async function verifyCode(email: string, code: string) {
    emit({ status: 'checking', email, error: '' });

    try {
      await cloudClient.verifyAccessCode(email, code);
      await verifyTeacherAccess();
      return snapshot.status === 'authenticated';
    } catch (error) {
      emit({
        status: 'code-sent',
        email,
        error: error instanceof Error ? error.message : 'Код не подошёл.',
      });
      return false;
    }
  }

  async function signOut() {
    await cloudClient.signOut();
    emit({ status: 'anonymous', email: '', error: '' });
  }

  return {
    ...state,
    configured: isCloudConfigured,
    requestCode,
    verifyCode,
    signOut,
  };
}

export function getTeacherAuthSnapshot() {
  return snapshot;
}
