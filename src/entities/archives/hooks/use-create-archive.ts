import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { CreateArchiveFormData } from '@/config/validations/create-archive';
import { createArchiveAction } from '@/entities/archives/actions';

export const useCreateArchive = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (params: CreateArchiveFormData) => {
      return createArchiveAction(params);
    },
    onSuccess: (id, page) => {
      queryClient.invalidateQueries({
        queryKey: ['archives', 'list', page],
      });
      router.push(`/archive/${id}`);
    },
    onError: () => {
      toast.error('요청 중 오류가 발생했습니다. 다시 시도해주세요.');
    },
  });
};
