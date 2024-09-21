import { z } from 'zod';

export const writeAnswerSchema = z.object({
  answer: z.string().min(100, {
    message: '100자 이상 입력해주세요',
  }),
});

export type WriteAnswerSchemaFormData = z.infer<typeof writeAnswerSchema>;
