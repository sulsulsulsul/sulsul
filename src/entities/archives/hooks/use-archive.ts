import { useQuery } from '@tanstack/react-query'

import { getArchiveDetailAction } from '@/entities/archives/actions'
export const useArchive = (id: number) => {
  const result = useQuery({
    queryKey: ['archive', { id }],
    queryFn: () => getArchiveDetailAction(id),
    refetchInterval: (query) => {
      if (
        query.state.data?.status === 'CREATING' ||
        query.state.data?.status === 'READY' ||
        query.state.data?.status === 'COMPLETE'
      ) {
        return 3000
      }
      return false
    },
  })
  const { data, ...rest } = result
  return {
    ...rest,
    archive: data,
  }
}
