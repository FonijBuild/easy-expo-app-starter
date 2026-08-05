import { env } from '@/shared/config';
import { useSessionStore } from '@/shared/stores/session-store';

export class ApiError extends Error {
  constructor(
    readonly code: string,
    message: string,
    readonly status: number,
    readonly details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type RequestOptions = RequestInit & {
  authenticated?: boolean;
};

function createUrl(path: string) {
  if (!env.EXPO_PUBLIC_API_URL) {
    throw new Error('Remote API URL is not configured.');
  }

  return `${env.EXPO_PUBLIC_API_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

async function readPayload(response: Response): Promise<unknown> {
  if (response.status === 204) return null;

  const text = await response.text();
  if (!text) return null;

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) return text;

  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new ApiError(
      'INVALID_RESPONSE',
      'The server returned invalid JSON.',
      response.status,
    );
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (options.authenticated) {
    const token = useSessionStore.getState().session?.accessToken;
    if (token) headers.set('Authorization', `Bearer ${token}`);
  }

  let response: Response;
  try {
    response = await fetch(createUrl(path), { ...options, headers });
  } catch (cause) {
    throw new ApiError('NETWORK_ERROR', 'Unable to reach the server.', 0, cause);
  }

  const payload = await readPayload(response);

  if (!response.ok) {
    const body =
      typeof payload === 'object' && payload
        ? (payload as {
            code?: string;
            message?: string;
            details?: unknown;
          })
        : null;

    throw new ApiError(
      body?.code ?? 'REQUEST_FAILED',
      body?.message ?? 'Request failed.',
      response.status,
      body?.details,
    );
  }

  return payload as T;
}
