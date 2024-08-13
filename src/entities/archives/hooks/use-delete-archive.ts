import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteArchiveAction } from '@/entities/archives/actions';
import { ArchiveListItemDTO, ArchiveListsDTO } from '@/entities/types';

import { ArchiveListQueryOptions } from './use-archives';

export const useDeleteArchive = (page: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      return deleteArchiveAction(id);
    },
    onMutate: async (id) => {
      const queryKey = ['archives', 'list', page];

      await queryClient.cancelQueries({ queryKey });

      const snapshot = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (prev: ArchiveListsDTO | undefined) =>
        prev?.archives.filter((archive) => archive.archiveId !== id),
      );

      return {
        snapshot,
      };
    },
    onSuccess: () => {
      toast.success('성공적으로 삭제되었습니다.');
    },
    onError: (error, id, context) => {
      console.log(error);
      toast.error('삭제 중 오류가 발생했습니다.');
      if (context?.snapshot) {
        queryClient.setQueryData(['archives', 'list', page], context.snapshot);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['archives', 'list', page],
      });
    },
  });
};
