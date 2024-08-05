import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'

import { createPracticeAction, updateHintAction } from '../actions'
import { updatePracticeAction } from '../actions/update-practice-action'

export const useUpdateHint = (practiceId: number) => {
  const result = useMutation({
    mutationFn: () => updateHintAction(practiceId),
    onSuccess: () => console.log('Successfully updated hint'),
    onError: () => console.log('Error in creating practice'),
  })
  const { ...rest } = result
  return {
    ...rest,
  }
}
