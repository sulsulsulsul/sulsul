import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'

import { createPracticeAction } from '../actions'

export const useUpdateTime = (questionId: number[]) => {
  const router = useRouter()
  const result = useMutation({
    mutationFn: () => createPracticeAction(questionId),
    onSuccess: () => router.push('/practice/ing'),
    onError: () => console.log('Error in creating practice'),
  })
  const { ...rest } = result
  return {
    ...rest,
  }
}
