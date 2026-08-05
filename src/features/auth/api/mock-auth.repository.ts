import { ApiError } from '@/shared/api';
import { appConfig } from '@/shared/config';
import type { Session } from '@/shared/types';
import type { AuthRepository, OtpPurpose } from './auth.types';

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const challenges = new Map<
  string,
  { phone: string; purpose: OtpPurpose; expiresAt: number }
>();

function createSession(
  purpose: OtpPurpose | 'email',
  identity: { email?: string; phone?: string },
): Session {
  return {
    accessToken: `mock-access-${Date.now()}`,
    refreshToken: `mock-refresh-${Date.now()}`,
    expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
    onboardingCompleted: purpose !== 'register',
    user: {
      id: 'mock-user',
      email: identity.email ?? null,
      phone: identity.phone ?? null,
      displayName: purpose === 'register' ? null : 'Easy Starter User',
    },
  };
}

export const mockAuthRepository: AuthRepository = {
  async loginWithEmail({ email, password }) {
    await sleep(450);

    if (
      email.toLowerCase() !== appConfig.auth.mockEmail.toLowerCase() ||
      password !== appConfig.auth.mockPassword
    ) {
      throw new ApiError(
        'AUTH_INVALID_CREDENTIALS',
        'Invalid credentials.',
        401,
      );
    }

    return createSession('email', { email });
  },

  async requestOtp({ phone, purpose }) {
    await sleep(350);
    const challengeId = `mock-${purpose}-${Date.now()}`;
    challenges.set(challengeId, {
      phone,
      purpose,
      expiresAt: Date.now() + 120_000,
    });

    return {
      challengeId,
      expiresInSeconds: 120,
      resendAfterSeconds: 30,
    };
  },

  async verifyOtp({ challengeId, code, purpose }) {
    await sleep(450);
    const challenge = challenges.get(challengeId);

    if (
      !challenge ||
      challenge.purpose !== purpose ||
      challenge.expiresAt < Date.now() ||
      code !== appConfig.auth.mockOtp
    ) {
      throw new ApiError('OTP_INVALID', 'Invalid OTP.', 400);
    }

    challenges.delete(challengeId);
    return createSession(purpose, { phone: challenge.phone });
  },

  async requestPasswordReset() {
    await sleep(450);
  },

  async resetPassword({ token }) {
    await sleep(450);
    if (token !== appConfig.auth.mockResetToken) {
      throw new ApiError(
        'RESET_TOKEN_INVALID',
        'Invalid reset token.',
        400,
      );
    }
  },
};
