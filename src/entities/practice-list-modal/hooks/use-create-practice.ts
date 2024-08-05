import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import { createPracticeAction } from '../actions'

export const useCreatePractice = (questionIds: number[]) => {
  const router = useRouter()
  const result = useMutation({
    mutationFn: () => createPracticeAction(questionIds),
    onSuccess: () => router.push('/practice/ing'),
    onError: () => console.log('Error in creating practice'),
  })
  const { ...rest } = result
  return {
    ...rest,
  }
}
