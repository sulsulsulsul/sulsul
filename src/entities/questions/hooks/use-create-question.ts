import { useMutation } from '@tanstack/react-query';

import {
  createQuestionAction,
  CreateQuestionParams,
} from '../actions/create-question-action';

export const useCreateQuestion = () => {
  return useMutation({
    mutationFn: (params: CreateQuestionParams) => {
      return createQuestionAction(params);
    },
  });
};
