export type User = {
  id: string;
  email: string | null;
  phone: string | null;
  displayName: string | null;
};

export type Session = {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  onboardingCompleted: boolean;
  user: User;
};

export type UserProfile = {
  userId: string;
  displayName: string;
  bio: string;
  locale: string;
};
