export type CloudUser = {
  id: string;
  email?: string;
};

export type CloudSession = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: CloudUser;
};

type AuthResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: {
    id: string;
    email?: string;
  };
};

const SESSION_STORAGE_KEY = 'english-platform:cloud-session';

function readStoredSession(): CloudSession | null {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as CloudSession;
  } catch {
    return null;
  }
}

function writeStoredSession(session: CloudSession | null) {
  if (typeof window === 'undefined') return;
  if (session) {
    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } else {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
  }
}

function mapAuthResponse(response: AuthResponse): CloudSession {
  return {
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
    expiresAt: Date.now() + response.expires_in * 1000,
    user: {
      id: response.user.id,
      email: response.user.email,
    },
  };
}

export function buildCloudClient(endpoint: string, publicToken: string) {
  const configured = Boolean(endpoint && publicToken);
  let session = readStoredSession();

  async function authRequest(path: string, body?: unknown) {
    if (!configured) throw new Error('Cloud client is not configured.');

    const response = await fetch(`${endpoint}/auth/v1/${path}`, {
      method: 'POST',
      headers: {
        apikey: publicToken,
        'Content-Type': 'application/json',
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as {
        msg?: string;
        error_description?: string;
        message?: string;
      } | null;
      throw new Error(
        payload?.msg ??
          payload?.error_description ??
          payload?.message ??
          `Authentication failed (${response.status}).`,
      );
    }

    return response;
  }

  async function refreshSession() {
    if (!session?.refreshToken) return null;

    const response = await authRequest('token?grant_type=refresh_token', {
      refresh_token: session.refreshToken,
    });
    const next = mapAuthResponse((await response.json()) as AuthResponse);
    session = next;
    writeStoredSession(next);
    return next;
  }

  async function getValidSession() {
    if (!session) return null;
    if (session.expiresAt - Date.now() > 60_000) return session;
    return refreshSession();
  }

  async function restRequest<T>(table: string, query: string, init: RequestInit = {}): Promise<T> {
    if (!configured) throw new Error('Cloud client is not configured.');

    const activeSession = await getValidSession();
    if (!activeSession) throw new Error('Authentication required.');

    const headers = new Headers(init.headers);
    headers.set('apikey', publicToken);
    headers.set('Authorization', `Bearer ${activeSession.accessToken}`);
    headers.set('Content-Type', 'application/json');

    const response = await fetch(`${endpoint}/rest/v1/${table}${query ? `?${query}` : ''}`, {
      ...init,
      headers,
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || `Cloud request failed (${response.status}).`);
    }

    if (response.status === 204) return undefined as T;
    const text = await response.text();
    return (text ? JSON.parse(text) : undefined) as T;
  }

  return {
    configured,
    getSession: () => session,
    async requestAccessCode(email: string) {
      await authRequest('otp', {
        email,
        should_create_user: false,
      });
    },
    async verifyAccessCode(email: string, token: string) {
      const response = await authRequest('verify', {
        email,
        token,
        type: 'email',
      });
      const next = mapAuthResponse((await response.json()) as AuthResponse);
      session = next;
      writeStoredSession(next);
      return next;
    },
    async signOut() {
      const activeSession = await getValidSession();
      if (configured && activeSession) {
        await fetch(`${endpoint}/auth/v1/logout`, {
          method: 'POST',
          headers: {
            apikey: publicToken,
            Authorization: `Bearer ${activeSession.accessToken}`,
          },
        }).catch(() => undefined);
      }
      session = null;
      writeStoredSession(null);
    },
    async select<T>(table: string, query: string) {
      return restRequest<T>(table, query, { method: 'GET' });
    },
    async upsert<T>(table: string, query: string, body: unknown) {
      return restRequest<T>(table, query, {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
        body: JSON.stringify(body),
      });
    },
    async insert<T>(table: string, body: unknown) {
      return restRequest<T>(table, '', {
        method: 'POST',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify(body),
      });
    },
    async remove(table: string, query: string) {
      return restRequest<void>(table, query, {
        method: 'DELETE',
        headers: { Prefer: 'return=minimal' },
      });
    },
  };
}

export type CloudClient = ReturnType<typeof buildCloudClient>;
