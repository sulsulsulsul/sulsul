import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'

import { createPracticeAction } from '../actions'
import { updatePracticeAction } from '../actions/update-practice-action'

export const useUpdatePractice = () => {
  const result = useMutation({
    mutationFn: ({
      questionId,
      practiceStatus,
    }: {
      questionId: number
      practiceStatus: string
    }) =>
      updatePracticeAction({
        questionId: questionId,
        practiceStatus: practiceStatus,
      }),
    onSuccess: () => console.log('Succefully changed practice Status'),
    onError: () => console.log('Error in creating practice'),
  })
  const { ...rest } = result
  return {
    ...rest,
  }
}
