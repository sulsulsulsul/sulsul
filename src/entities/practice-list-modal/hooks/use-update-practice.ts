import { useMutation } from '@tanstack/react-query';

import { updatePracticeAction } from '../actions';

export const useUpdatePractice = () => {
  return useMutation({
    mutationFn: ({
      questionId,
      practiceStatus,
    }: {
      questionId: number;
      practiceStatus: string;
    }) =>
      updatePracticeAction({
        questionId: questionId,
        practiceStatus: practiceStatus,
      }),
    onSuccess: () => console.log('Succefully changed practice Status'),
    onError: () => console.log('Error in creating practice'),
  });
};
