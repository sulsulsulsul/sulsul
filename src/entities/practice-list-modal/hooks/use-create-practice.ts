import { useMutation } from '@tanstack/react-query';

import { createPracticeAction } from '../actions';

export const useCreatePractice = (questionIds: number[]) => {
  return useMutation({
    mutationFn: () => createPracticeAction(questionIds),
    onSuccess: () => console.log('Successfully created Practice'),
    onError: () => console.log('Error in creating practice'),
  });
};
