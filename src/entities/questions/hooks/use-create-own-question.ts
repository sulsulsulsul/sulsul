import { useMutation } from '@tanstack/react-query';

import {
  createOwnQuestionAction,
  CreateOwnQuestionParams,
} from '../actions/create-own-question-action';

export const useCreateOwnQuestion = () => {
  return useMutation({
    mutationFn: (params: CreateOwnQuestionParams) => {
      return createOwnQuestionAction(params);
    },
  });
};
