import { useQuery } from '@tanstack/react-query'

import { getFeedbackDetailAction } from '../actions'

export const useFeedback = (questionId: number) => {
  const result = useQuery({
    queryKey: ['feedback', questionId],
    queryFn: () => getFeedbackDetailAction(questionId),
  })
  const { data, ...rest } = result
  return {
    ...rest,
    feedback: data,
  }
}
