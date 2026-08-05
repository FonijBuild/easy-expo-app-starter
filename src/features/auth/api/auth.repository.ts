import { env } from '@/shared/config/env';
import type { AuthRepository } from './auth.types';
import { mockAuthRepository } from './mock-auth.repository';
import { remoteAuthRepository } from './remote-auth.repository';

export const authRepository: AuthRepository =
  env.EXPO_PUBLIC_API_MODE === 'remote'
    ? remoteAuthRepository
    : mockAuthRepository;
