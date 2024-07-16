'use client'

import { getArchiveListAction } from '@/entities/archives/actions'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const ArchiveListQueryOptions = queryOptions({
  queryKey: ['archives', 'list'],
  queryFn: () => {
    return getArchiveListAction()
  },
  refetchInterval({ state }) {
    if (state.data && state.data.length > 0) {
      if (
        state.data.filter((archive) => archive.status === 'READY').length > 0
      ) {
        return 1000 * 10
      }
    }
    return false
  },
})

export const useArchives = () => {
  const result = useQuery(ArchiveListQueryOptions)
  const { data, ...rest } = result
  return {
    ...rest,
    archives: data,
  }
}
