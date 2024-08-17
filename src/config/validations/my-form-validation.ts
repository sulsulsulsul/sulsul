import { z } from 'zod';

export type MyFormData = z.infer<typeof myFormValidation>;

export const myFormValidation = z.object({
  nickname: z
    .string()
    .min(2, { message: '닉네임은 2자 이상이어야 합니다.' })
    .max(6, { message: '닉네임은 6자 이하여야 합니다.' }),
});
