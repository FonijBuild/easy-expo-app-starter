import { z } from 'zod';

const schema = z
  .object({
    EXPO_PUBLIC_API_MODE: z.enum(['mock', 'remote']).default('mock'),
    EXPO_PUBLIC_API_URL: z.string().url().optional(),
    EXPO_PUBLIC_APP_NAME: z.string().min(1).optional(),
    EXPO_PUBLIC_APP_SLUG: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .optional(),
    EXPO_PUBLIC_APP_SCHEME: z
      .string()
      .regex(/^[a-z][a-z0-9+.-]*$/)
      .optional(),
    EXPO_PUBLIC_IOS_BUNDLE_ID: z
      .string()
      .regex(/^[A-Za-z0-9.-]+$/)
      .optional(),
    EXPO_PUBLIC_ANDROID_PACKAGE: z
      .string()
      .regex(/^[A-Za-z][A-Za-z0-9_]*(?:\.[A-Za-z][A-Za-z0-9_]*)+$/)
      .optional(),
  })
  .superRefine((value, context) => {
    if (value.EXPO_PUBLIC_API_MODE === 'remote' && !value.EXPO_PUBLIC_API_URL) {
      context.addIssue({
        code: 'custom',
        path: ['EXPO_PUBLIC_API_URL'],
        message: 'EXPO_PUBLIC_API_URL is required in remote mode.',
      });
    }
  });

const result = schema.safeParse(process.env);

if (!result.success) {
  console.error('Environment validation failed:');
  console.error(z.prettifyError(result.error));
  process.exit(1);
}

console.log('Environment configuration is valid.');
