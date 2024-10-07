import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { putLikeAction } from '../actions/put-like-action';

export const usePutLike = () => {
  return useMutation({
    mutationFn: (donationNo: number) => {
      return putLikeAction(donationNo);
    },
    onError: (error) => {
      toast.error('좋아요 반영에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
