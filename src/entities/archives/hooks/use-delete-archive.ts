import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteArchiveAction } from '@/entities/archives/actions'

import { ArchiveListQueryOptions } from './use-archives'

export const useDeleteArchive = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => {
      return deleteArchiveAction({ id })
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ArchiveListQueryOptions.queryKey,
      })

      const snapshot = queryClient.getQueryData(
        ArchiveListQueryOptions.queryKey,
      )

      queryClient.setQueryData(ArchiveListQueryOptions.queryKey, (prev) =>
        prev?.filter((archive) => archive.archiveId !== id),
      )

      return () => {
        queryClient.setQueryData(ArchiveListQueryOptions.queryKey, snapshot)
      }
    },
    onSuccess: () => {
      toast.success('성공적으로 삭제되었습니다.')
    },
    onError: (error, variables, rollback) => {
      toast.error('삭제 중 오류가 발생했습니다.')
      rollback?.()
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ArchiveListQueryOptions.queryKey,
      })
    },
  })
}
