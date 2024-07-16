import { getArchiveDetailAction } from '@/entities/archives/actions'
import { useQuery } from '@tanstack/react-query'
export const useArchive = (id: number) => {
  const result = useQuery({
    queryKey: ['archive', { id }],
    queryFn: () => getArchiveDetailAction(id),
    refetchInterval: (query) => {
      if (query.state.data?.status === 'READY') {
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
