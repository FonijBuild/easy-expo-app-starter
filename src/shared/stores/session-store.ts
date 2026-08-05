import { create } from 'zustand';
import { z } from 'zod';
import { createJsonStorage } from '@/shared/lib/storage';
import type { Session, UserProfile } from '@/shared/types';

const userSchema = z.object({
  id: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  displayName: z.string().nullable(),
});

const sessionSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: z.string(),
  onboardingCompleted: z.boolean(),
  user: userSchema,
});

const profileSchema = z.object({
  userId: z.string(),
  displayName: z.string(),
  bio: z.string(),
  locale: z.string(),
});

const sessionStorage = createJsonStorage<Session>(
  'easy-starter:session',
  sessionSchema,
  true,
);
const profileStorage = createJsonStorage<UserProfile>(
  'easy-starter:profile',
  profileSchema,
);
let hydrationPromise: Promise<void> | null = null;

type SessionState = {
  session: Session | null;
  profile: UserProfile | null;
  isHydrated: boolean;
  hydrate: () => Promise<void>;
  setSession: (session: Session) => Promise<void>;
  completeOnboarding: (profile: UserProfile) => Promise<void>;
  updateProfile: (profile: UserProfile) => Promise<void>;
  logout: () => Promise<void>;
};

export const useSessionStore = create<SessionState>((set, get) => ({
  session: null,
  profile: null,
  isHydrated: false,

  hydrate: async () => {
    if (hydrationPromise) return hydrationPromise;

    hydrationPromise = (async () => {
      let session: Session | null = null;
      let profile: UserProfile | null = null;

      try {
        [session, profile] = await Promise.all([
          sessionStorage.read(),
          profileStorage.read(),
        ]);

        if (session && Date.parse(session.expiresAt) <= Date.now()) {
          await Promise.all([sessionStorage.clear(), profileStorage.clear()]);
          session = null;
          profile = null;
        }
      } catch (error) {
        if (__DEV__) console.warn('Unable to restore the local session.', error);
      } finally {
        set({ session, profile: session ? profile : null, isHydrated: true });
      }
    })();

    return hydrationPromise;
  },

  setSession: async (session) => {
    await sessionStorage.write(session);
    set({ session });
  },

  completeOnboarding: async (profile) => {
    const current = get().session;
    if (!current) throw new Error('An authenticated session is required.');

    const session: Session = {
      ...current,
      onboardingCompleted: true,
      user: { ...current.user, displayName: profile.displayName },
    };

    await Promise.all([
      sessionStorage.write(session),
      profileStorage.write(profile),
    ]);
    set({ session, profile });
  },

  updateProfile: async (profile) => {
    const current = get().session;
    if (!current) throw new Error('An authenticated session is required.');

    const session: Session = {
      ...current,
      user: { ...current.user, displayName: profile.displayName },
    };

    await Promise.all([
      sessionStorage.write(session),
      profileStorage.write(profile),
    ]);
    set({ session, profile });
  },

  logout: async () => {
    await Promise.all([sessionStorage.clear(), profileStorage.clear()]);
    set({ session: null, profile: null });
  },
}));
