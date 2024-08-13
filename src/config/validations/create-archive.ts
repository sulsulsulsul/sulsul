import { z } from 'zod';

export const createArchiveSchema = z.object({
  title: z.string(),
  companyName: z.string(),
  resume: z
    .string()
    .min(300, {
      message: '300자 이상 2000자 이내의 내용을 입력해주세요.',
    })
    .max(2000, {
      message: '300자 이상 2000자 이내의 내용을 입력해주세요.',
    }),
});

export type CreateArchiveFormData = z.infer<typeof createArchiveSchema>;
