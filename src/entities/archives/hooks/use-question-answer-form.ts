import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const questionAnswerFormSchema = z.object({
  answer: z
    .string()
    .min(1, '답변을 입력해주세요.')
    .max(500, '500자 이내로 입력해주세요.'),
})

export type QuestionAnswerFormValues = z.infer<typeof questionAnswerFormSchema>

export const useQuestionAnswerForm = () => {
  return useForm<QuestionAnswerFormValues>({
    resolver: zodResolver(questionAnswerFormSchema),
  })
}
