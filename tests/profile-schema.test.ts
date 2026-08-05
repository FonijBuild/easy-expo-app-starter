import { describe, expect, it } from 'vitest';
import { profileFormSchema } from '@/shared/model';

describe('profile form schema', () => {
  it('accepts a valid profile', () => {
    expect(
      profileFormSchema.safeParse({ displayName: 'Ada', bio: 'Builder' }).success,
    ).toBe(true);
  });

  it('rejects an empty display name', () => {
    expect(
      profileFormSchema.safeParse({ displayName: '', bio: '' }).success,
    ).toBe(false);
  });
});
