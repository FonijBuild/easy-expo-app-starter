import { z } from 'zod';

export const profileFormSchema = z.object({
  displayName: z.string().trim().min(2, 'errors.required').max(60, 'errors.nameLength'),
  bio: z.string().trim().max(240, 'errors.bioLength'),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
