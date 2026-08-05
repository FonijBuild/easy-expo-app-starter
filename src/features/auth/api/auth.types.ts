import type { Session } from '@/shared/types';
export type OtpPurpose = 'login' | 'register';
export type RequestOtpInput = { phone: string; purpose: OtpPurpose };
export type RequestOtpResult = { challengeId: string; expiresInSeconds: number; resendAfterSeconds: number };
export type AuthRepository = {
  loginWithEmail(input: { email: string; password: string }): Promise<Session>;
  requestOtp(input: RequestOtpInput): Promise<RequestOtpResult>;
  verifyOtp(input: { challengeId: string; code: string; purpose: OtpPurpose }): Promise<Session>;
  requestPasswordReset(input: { email: string }): Promise<void>;
  resetPassword(input: { token: string; password: string }): Promise<void>;
};
