import { z } from 'zod';

export type MyFormData = z.infer<typeof myFormValidation>;

export const myFormValidation = z.object({
  nickname: z
    .string()
    .min(2, { message: '2~9자 사이로 입력해주세요.' })
    .max(9, { message: '2~9자 사이로 입력해주세요.' }),
  job: z.string(),
});
