import { z } from 'zod';

export const emailLoginSchema = z.object({
  email: z.string().email('errors.email'),
  password: z.string().min(8, 'errors.password'),
});

export const phoneSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9]{10,15}$/, 'errors.phone'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('errors.email'),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'errors.password'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'errors.passwordMatch',
  });

export type EmailLoginValues = z.infer<typeof emailLoginSchema>;
export type PhoneValues = z.infer<typeof phoneSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
