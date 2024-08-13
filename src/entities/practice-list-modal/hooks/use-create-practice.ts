import { useMutation } from '@tanstack/react-query';

import { createPracticeAction } from '../actions';

export const useCreatePractice = () => {
  return useMutation({
    mutationFn: (questionIds: number[]) => createPracticeAction(questionIds),
  });
};
