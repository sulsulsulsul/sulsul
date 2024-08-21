import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createKeywordAction, CreateKeywordActionParams } from '../actions';

export const useCreateKeyword = () => {
  return useMutation({
    mutationFn: (params: CreateKeywordActionParams) => {
      return createKeywordAction(params);
    },
    onError: (error) => {
      console.log(error);
      toast.error('요청 중 오류가 발생했습니다. 다시 시도해주세요.');
    },
  });
};
