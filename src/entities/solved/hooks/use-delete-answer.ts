'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteAnswerAction } from '../actions/delete-answer-action';

interface DeleteAnswerProp {
  interviewId: number;
  answerId: number;
  accessToken: string;
  userId: number;
  setOpenDeleteModal: (isOpen: boolean) => void;
}
export const useDeleteAnswer = ({
  interviewId,
  answerId,
  accessToken,
  userId,
  setOpenDeleteModal,
}: DeleteAnswerProp) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return deleteAnswerAction({ interviewId, answerId, accessToken });
    },
    onError: () => {
      toast.error('요청 중 오류가 발생했습니다. 다시 시도해주세요.');
    },
    onSuccess: () => {
      toast.success('답변을 삭제했어요.');
      queryClient.invalidateQueries({
        queryKey: ['interview', interviewId, userId, accessToken],
      });
      setOpenDeleteModal(false);
    },
  });
};
