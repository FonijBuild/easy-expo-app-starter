import { apiRequest } from '@/shared/api';
import type { Session } from '@/shared/types';
import type { AuthRepository, RequestOtpResult } from './auth.types';

export const remoteAuthRepository: AuthRepository = {
  loginWithEmail: (input) =>
    apiRequest<Session>('/auth/email/login', {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  requestOtp: (input) =>
    apiRequest<RequestOtpResult>('/auth/otp/request', {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  verifyOtp: (input) =>
    apiRequest<Session>('/auth/otp/verify', {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  requestPasswordReset: (input) =>
    apiRequest<void>('/auth/password/forgot', {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  resetPassword: (input) =>
    apiRequest<void>('/auth/password/reset', {
      method: 'POST',
      body: JSON.stringify(input),
    }),
};
