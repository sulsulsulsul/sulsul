import { z } from 'zod'

export const createArchiveSchema = z.object({
  companyName: z.string().min(2, {
    message: '회사명은 2글자 이상 입력해주세요.',
  }),
  title: z.string().min(2, {
    message: '타이틀은 2글자 이상 입력해주세요.',
  }),
  resume: z
    .string()
    .min(300, {
      message: '300자 이상 2000자 이내의 내용을 입력해주세요.',
    })
    .max(2000, {
      message: '300자 이상 2000자 이내의 내용을 입력해주세요.',
    }),
})

export type CreateArchiveFormData = z.infer<typeof createArchiveSchema>
