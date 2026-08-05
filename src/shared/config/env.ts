import { z } from 'zod';

const envSchema = z.object({
  EXPO_PUBLIC_API_MODE: z.enum(['mock', 'remote']).default('mock'),
  EXPO_PUBLIC_API_URL: z.string().url().optional(),
});

const result = envSchema.safeParse({
  EXPO_PUBLIC_API_MODE: process.env.EXPO_PUBLIC_API_MODE,
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
});

if (!result.success) {
  throw new Error(`Invalid public environment configuration: ${result.error.message}`);
}

if (result.data.EXPO_PUBLIC_API_MODE === 'remote' && !result.data.EXPO_PUBLIC_API_URL) {
  throw new Error('EXPO_PUBLIC_API_URL is required when EXPO_PUBLIC_API_MODE=remote.');
}

export const env = result.data;
