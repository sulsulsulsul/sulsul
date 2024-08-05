import { useQuery } from '@tanstack/react-query'

import { getArchiveDetailAction } from '@/entities/archives/actions'
export const useArchive = (id: number) => {
  const result = useQuery({
    queryKey: ['archive', id],
    queryFn: () => getArchiveDetailAction(id),
    refetchInterval: (query) => {
      if (query.state.data?.status !== 'FAIL') {
        return 3000
      }
      return false
    },
    enabled: !!id,
  })
  const { data, ...rest } = result
  return {
    ...rest,
    archive: data,
  }
}
