import { describe, expect, it } from 'vitest';
import {
  emailLoginSchema,
  phoneSchema,
  resetPasswordSchema,
} from '@/features/auth/model/auth.schemas';

describe('authentication schemas', () => {
  it('accepts a valid email login payload', () => {
    const result = emailLoginSchema.safeParse({
      email: 'person@example.com',
      password: 'password123',
    });

    expect(result.success).toBe(true);
  });

  it('rejects malformed phone numbers', () => {
    expect(phoneSchema.safeParse({ phone: '12-abc' }).success).toBe(false);
  });

  it('requires matching reset passwords', () => {
    const result = resetPasswordSchema.safeParse({
      password: 'password123',
      confirmPassword: 'different123',
    });

    expect(result.success).toBe(false);
  });
});
