import { ApiError } from '@/shared/api';
export function authErrorKey(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.code === 'AUTH_INVALID_CREDENTIALS') return 'auth.errors.invalidCredentials';
    if (error.code.startsWith('OTP_')) return 'auth.errors.invalidOtp';
  }
  return 'auth.errors.generic';
}
