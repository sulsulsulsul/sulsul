import { useQuery } from '@tanstack/react-query'

import { getKeywordListAction } from '../actions'

export const useKeywords = (questionId: number) => {
  const result = useQuery({
    queryKey: ['keywords', questionId],
    queryFn: () => getKeywordListAction(questionId),
  })
  const { data, ...rest } = result
  return {
    ...rest,
    keywords: data,
  }
}
